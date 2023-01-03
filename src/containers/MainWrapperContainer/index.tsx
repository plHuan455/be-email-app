import {
  approveEmail,
  CreateEmailParam,
  deleteEmail,
  sendEmail,
  updateEmailWithQuery,
} from '@api/email';
import { EmailComposeFields } from '@components/templates/EmailCompose2';
import MainWrapper from '@layouts/MainWrapper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getEditorStateFormHtmlString,
  getHtmlStringFromEditorState,
} from '@utils/functions';
import { useAppDispatch, useAppSelector } from '@redux/configureStore';
import {
  addMinimizeEmail,
  deleteMinimizeEmail,
  updateMinimizeEmail,
  updateMinimizeEmailId,
} from '@redux/Email/reducer';
import MinimizeEmailList, {
  MinimizeEmailTypes,
} from '@components/templates/MinimizeEmailList';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
import { deleteAllWithIdList } from '@api/email';
import { attempt, update } from 'lodash';
import { InputContactBlock } from '@components/molecules/AutoCompleteReceive';
import { UserReceiveInfo } from '@components/organisms/Email/Interface';
import { emailRegex } from '@constants/constants';
import { emailData } from '@layouts/EmailStatusBar';

interface EmailComposeContextTypes {
  inputContactBlocks: InputContactBlock[];
  setInputContactBlocks: React.Dispatch<React.SetStateAction<InputContactBlock[]>>;
  method?: UseFormReturn<EmailComposeFields>;
  tabColor?: string;
  triggerClearData: boolean;
  onSendEmail: (
    values: EmailComposeFields & { sendAt: Dayjs | null | undefined },
  ) => void;
  onNewComposeClick: () => void;
  onMinimizeEmailClick: () => void;
  onMaximizeEmailClick: () => void;
  onCloseEmail: () => void;
  onContinueClick: (values: MinimizeEmailTypes) => void;
}

export const EmailComposeContext = createContext<EmailComposeContextTypes>({
  inputContactBlocks: [],
  setInputContactBlocks: () => undefined,
  triggerClearData: false,
  onSendEmail: () => {},
  onNewComposeClick: () => {},
  onMinimizeEmailClick: () => {},
  onMaximizeEmailClick: () => {},
  onCloseEmail: () => {},
  onContinueClick: () => {},
});

interface MainWrapperContainerProps {}

const MainWrapperContainer: React.FC<MainWrapperContainerProps> = () => {
  const dispatch = useAppDispatch();
  const currentUserEmail = localStorage.getItem('current_email');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const alertDialog = useAlertDialog();

  const storeDraftTimeOutFunc = useRef<NodeJS.Timeout>();
  const triggerTimeOutRef = useRef<NodeJS.Timeout>();

  const minimizeEmailList = useAppSelector((state) => state.email.minimizeEmailList);

  const method = useForm<EmailComposeFields>({
    defaultValues: {
      contactBlock: [],
      to: [],
      cc: [],
      bcc: [],
      subject: '',
      content: getEditorStateFormHtmlString(),
      attachFiles: { fileUrls: [], files: [] },
      hashtags: [],
      from: currentUserEmail ?? '',
    },
  });

  // STORE DRAFT WHEN VALUES CHANGE
  method.watch(() => handleStoreDraft());

  const [showMinimizeEmailId, setShowMinimizeEmailId] = useState<{
    id?: number;
    cacheId?: number;
  }>();
  const [tabColor, setTabColor] = useState<string>();
  const [triggerClearData, setTriggerClearData] = useState<boolean>(false);
  const [inputContactBlocks, setInputContactBlocks] = useState<InputContactBlock[]>(
    [],
  );

  // MUTATIONS
  const { mutate: deleteEmailMutate } = useMutation({
    mutationKey: ['email-compose-delete-email'],
    mutationFn: deleteEmail,
  });
  const { mutate: storeDraftMutate, isLoading: isStoreDraftLoading } = useMutation({
    mutationKey: ['main-wrapper-container-store-draft', showMinimizeEmailId],
    mutationFn: async (params: { data: CreateEmailParam; cacheId?: number }) => {
      const res = await sendEmail({ ...params.data, action: 'draft' });
      return res;
    },
    onSuccess(res, params) {
      if (params.cacheId === undefined) return;
      dispatch(updateMinimizeEmailId({ id: res.data.id, cacheId: params.cacheId }));
      setShowMinimizeEmailId((preState) => {
        if (
          preState?.cacheId === params.cacheId &&
          preState?.cacheId !== undefined
        ) {
          return { id: res.data.id };
        }
        return preState;
      });
      queryClient.invalidateQueries({ queryKey: ['get-all-email-status'] });
    },
  });

  const { mutate: updateDraftMutate, isLoading: isUpdateDraftLoading } = useMutation(
    {
      mutationKey: ['main-wrapper-container-update-draft'],
      mutationFn: (params: { id: number; data: CreateEmailParam }) => {
        return updateEmailWithQuery(params.id, params.data);
      },
    },
  );

  const { mutate: submitEmailComposeMutate, isLoading: isEmailComposeSubmitting } =
    useMutation({
      mutationKey: ['email-compose-submit'],
      mutationFn: sendEmail,
      onSuccess: (res) => {
        navigate(`/emails/catalog/pending/${res.data.email.writer_id}`);
        queryClient.invalidateQueries({ queryKey: ['get-all-email-status'] });
        setShowMinimizeEmailId((preState) => {
          if (preState?.id !== undefined) {
            deleteEmailMutate(String(preState.id));
            dispatch(deleteMinimizeEmail({ id: preState.id }));
          }
          return undefined;
        });
        method.reset();
        setTabColor(undefined);
        clearTimeout(storeDraftTimeOutFunc.current);
        toast.success('Email has been sent');
      },
      onError() {
        toast.error('Cannot send email');
      },
    });

  // HANDLE FUNCTIONS
  const convertContactField = (contactBlock: InputContactBlock[]) => {
    const to: string[] = [];
    const cc: string[] = [];
    const bcc: string[] = [];

    const field = { to, cc, bcc };

    contactBlock.forEach((contact) => {
      contact.employeesList.forEach((employ) => {
        if (employ.field) {
          employ.isChecked && field[employ.field].push(employ.mail);
        }
      });
    });

    return field;
  };

  const getSelectedContact = (contactBlock: InputContactBlock[]) => {
    return (field: 'to' | 'cc' | 'bcc') => {
      return contactBlock.filter((contact) => {
        return contact.employeesList.some(
          (employ) => employ.field === field && employ.isChecked,
        );
      });
    };
  };

  // HANDLE FUNCTIONS
  const checkEmailDataEmpty = (values: EmailComposeFields): boolean => {
    const { contactBlock } = values;
    const { to, cc, bcc } = convertContactField(contactBlock);

    return (
      to.length === 0 &&
      bcc.length === 0 &&
      cc.length === 0 &&
      !values.subject &&
      values.attachFiles.fileUrls.length === 0 &&
      values.attachFiles.files.length === 0 &&
      (values.content === '' ||
        getHtmlStringFromEditorState(values.content) === '<p></p>\n')
    );
  };
  const createApiData = (
    values: EmailComposeFields & { sendAt?: Dayjs | null | undefined },
    isDraft?: Boolean,
  ): CreateEmailParam => {
    const { contactBlock } = values;
    const { to, cc, bcc } = convertContactField(contactBlock);
    return {
      email: {
        to,
        bcc,
        cc,
        from: currentUserEmail ?? '',
        text_html: getHtmlStringFromEditorState(values.content),
        subject: values.subject,
        attachs: values.attachFiles.fileUrls.map((value) => ({ path: value })),
      },
      // hashtags: values.hashtags.map((value) => value.value),
      send_at: values.sendAt?.toISOString() ?? dayjs().toISOString(),
    };
  };
  const isExistShowEmail = () => {
    if (!showMinimizeEmailId) return false;
    return minimizeEmailList.some(
      (value) =>
        (value.id === showMinimizeEmailId.id && value.id !== undefined) ||
        (value.cacheId === showMinimizeEmailId.cacheId &&
          value.cacheId !== undefined),
    );
  };
  const createDataForForm = (data: MinimizeEmailTypes) => {
    const filter = getSelectedContact(data.contactBlock ?? []);
    setInputContactBlocks((cur) => {
      return (data.contactBlock ?? []).map((contact) => ({
        ...contact,
        employeesList: contact.employeesList.map(
          (employ) =>
            new UserReceiveInfo(
              employ.avatar,
              employ.name,
              employ.mail,
              employ.isChecked,
              employ.field,
            ),
        ),
      }));
    });

    const to = filter('to');
    const cc = filter('cc');
    const bcc = filter('bcc');

    method.reset();
    method.setValue('contactBlock', data.contactBlock ?? []);
    method.setValue('to', to ?? []);
    method.setValue('cc', cc ?? []);
    method.setValue('bcc', bcc ?? []);
    method.setValue('content', getEditorStateFormHtmlString(data.content));
    method.setValue('subject', data.subject ?? '');
    method.setValue('attachFiles', data.attachFiles ?? { files: [], fileUrls: [] });
    method.setValue('hashtags', data.hashtags ?? []);
  };
  const handleTriggerClearData = () => {
    clearTimeout(triggerTimeOutRef.current);
    setTriggerClearData(true);
    triggerTimeOutRef.current = setTimeout(() => {
      setTriggerClearData(false);
    }, 200);
  };

  const handleSendEmail = (
    values: EmailComposeFields & { sendAt?: Dayjs | null },
  ) => {
    const { contactBlock } = values;
    const { to, cc, bcc } = convertContactField(contactBlock);
    if (to.length === 0 && cc.length === 0 && bcc.length === 0) {
      alertDialog.setAlertData(
        "Can't send email",
        "Can't send email without receiver",
        () => {
          alertDialog.onClose();
        },
      );
      return;
    }
    submitEmailComposeMutate(createApiData(values));
  };

  const handleContinueClick = (values: MinimizeEmailTypes) => {
    console.log(values);
    const currValue = method.getValues();
    const currData = createApiData(currValue);
    const isEmailDataEmpty = checkEmailDataEmpty(currValue);

    const foundMinimizeEmail = minimizeEmailList.find(
      (value) => value.id === values.id && values.id !== undefined,
    );

    if (showMinimizeEmailId || !isEmailDataEmpty) {
      if (showMinimizeEmailId?.id) {
        updateDraftMutate({ id: showMinimizeEmailId.id, data: currData });
      } else {
        const newCacheId = Date.now();
        storeDraftMutate({
          cacheId: showMinimizeEmailId?.cacheId ?? newCacheId,
          data: currData,
        });
      }
    }

    createDataForForm({
      subject: values.subject,
      content: values.content,
      hashtags: values.hashtags,
    });
    clearTimeout(storeDraftTimeOutFunc.current);
    setTabColor(foundMinimizeEmail?.color);
    setShowMinimizeEmailId({ id: values.id });
    navigate('/emails/compose');
  };

  const handleMaximizeEmailClick = (data: MinimizeEmailTypes) => {
    const values = method.getValues();
    const isEmailDataEmpty = checkEmailDataEmpty(method.getValues());
    const convertMinimizeEmailData = {
      ...values,
      content: getHtmlStringFromEditorState(values.content),
    };
    const apiParamData = createApiData(values);

    if (isEmailDataEmpty && !showMinimizeEmailId) {
      createDataForForm(data);
      clearTimeout(storeDraftTimeOutFunc.current);
      setShowMinimizeEmailId({
        id: data.id,
        cacheId: data.id ? undefined : data.cacheId,
      });
      setTabColor(data.color);
      navigate('/emails/compose');
      return;
    }

    // MINIMIZE ABLE
    if (isExistShowEmail() || minimizeEmailList.length < 2) {
      const newCacheId = Date.now();
      if (showMinimizeEmailId?.id !== undefined) {
        dispatch(
          addMinimizeEmail({
            ...convertMinimizeEmailData,
            id: showMinimizeEmailId.id,
            cacheId: undefined,
          }),
        );
        updateDraftMutate({ id: showMinimizeEmailId.id, data: apiParamData });
      } else {
        dispatch(
          addMinimizeEmail({
            ...convertMinimizeEmailData,
            cacheId: showMinimizeEmailId?.cacheId ?? newCacheId,
            id: undefined,
          }),
        );
        storeDraftMutate({
          cacheId: showMinimizeEmailId?.cacheId ?? newCacheId,
          data: apiParamData,
        });
      }
      createDataForForm(data);
      clearTimeout(storeDraftTimeOutFunc.current);
      setShowMinimizeEmailId({
        id: data.id,
        cacheId: data.id ? undefined : data.cacheId,
      });
      setTabColor(data.color);
      navigate('/emails/compose');
      return;
    }
    // CAN'T MINIMIZE EMAIL
    alertDialog.setAlertData(
      'Keep the current email',
      'Your current email will be saved to draft',
      () => {
        if (showMinimizeEmailId?.id) {
          updateDraftMutate({
            data: apiParamData,
            id: showMinimizeEmailId.id,
          });
        } else {
          storeDraftMutate({
            data: apiParamData,
            cacheId: showMinimizeEmailId?.cacheId ?? Date.now(),
          });
        }
        createDataForForm(data);
        clearTimeout(storeDraftTimeOutFunc.current);
        setShowMinimizeEmailId({
          id: data.id,
          cacheId: data.id ? undefined : data.cacheId,
        });
        setTabColor(data.color);
        alertDialog.onClose();
        navigate('/emails/compose');
      },
    );
  };

  const handleCloseClick = (data: MinimizeEmailTypes) => {
    dispatch(deleteMinimizeEmail({ cacheId: data.cacheId, id: data.id }));
  };

  const handleMinimizeEmailClick = () => {
    const values = method.getValues();
    const data = createApiData(values);
    const convertMinimizeEmailData = {
      ...values,
      content: getHtmlStringFromEditorState(values.content),
    };

    if (!isExistShowEmail() && minimizeEmailList.length >= 2) {
      toast.error(
        'Only a maximum of 2 emails can be hidden, please delete some to hide the email.',
      );
      clearTimeout(storeDraftTimeOutFunc.current);
      return;
    }

    // New Email
    if (showMinimizeEmailId === undefined) {
      const newCacheId = Date.now();
      storeDraftMutate({ data, cacheId: newCacheId });
      dispatch(
        addMinimizeEmail({
          ...convertMinimizeEmailData,
          cacheId: newCacheId,
          id: undefined,
        }),
      );
      setShowMinimizeEmailId(undefined);
      setTabColor(undefined);
      // method.setValue('contactBlock', inputContactBlocks)
      method.reset();
      setInputContactBlocks((cur) => {
        return cur
          .filter((contact) => {
            return !contact.contact_name.match(emailRegex);
          })
          .map((contact) => ({
            ...contact,
            employeesList: contact.employeesList.map(
              (employ) =>
                new UserReceiveInfo(
                  employ.avatar,
                  employ.name,
                  employ.mail,
                  false,
                  undefined,
                ),
            ),
          }));
      });
      clearTimeout(storeDraftTimeOutFunc.current);
      return;
    }

    // Email is in minimize email list
    // Stored to draft
    if (showMinimizeEmailId.id !== undefined) {
      updateDraftMutate({ id: showMinimizeEmailId.id, data });
      setShowMinimizeEmailId(undefined);
      dispatch(
        addMinimizeEmail({
          ...convertMinimizeEmailData,
          id: showMinimizeEmailId.id,
          cacheId: undefined,
        }),
      );
      setTabColor(undefined);
      // method.setValue('contactBlock', inputContactBlocks)
      method.reset();
      setInputContactBlocks((cur) => {
        return cur
          .filter((contact) => {
            return !contact.contact_name.match(emailRegex);
          })
          .map((contact) => ({
            ...contact,
            employeesList: contact.employeesList.map(
              (employ) =>
                new UserReceiveInfo(
                  employ.avatar,
                  employ.name,
                  employ.mail,
                  false,
                  undefined,
                ),
            ),
          }));
      });
      clearTimeout(storeDraftTimeOutFunc.current);
      return;
    }

    // Waiting for update id
    if (showMinimizeEmailId.cacheId !== undefined) {
      storeDraftMutate({ cacheId: showMinimizeEmailId.cacheId, data });
      dispatch(
        addMinimizeEmail({
          ...convertMinimizeEmailData,
          cacheId: showMinimizeEmailId.cacheId,
          id: undefined,
        }),
      );
      setShowMinimizeEmailId(undefined);
      setTabColor(undefined);
      // method.setValue('contactBlock', inputContactBlocks)
      method.reset();
      setInputContactBlocks((cur) => {
        return cur
          .filter((contact) => {
            return !contact.contact_name.match(emailRegex);
          })
          .map((contact) => ({
            ...contact,
            employeesList: contact.employeesList.map(
              (employ) =>
                new UserReceiveInfo(
                  employ.avatar,
                  employ.name,
                  employ.mail,
                  false,
                  undefined,
                ),
            ),
          }));
      });
      clearTimeout(storeDraftTimeOutFunc.current);
      return;
    }

    // Curr Email isn't in minimize email list
  };

  const handleCloseEmail = () => {
    const values = method.getValues();
    const data = createApiData(values);
    const isEmailDataEmpty = checkEmailDataEmpty(values);
    const isExistShow = isExistShowEmail();

    if (isEmailDataEmpty && !isExistShow) {
      navigate('/emails');
      return;
    }

    if (isExistShow) {
      setShowMinimizeEmailId(undefined);
      setTabColor(undefined);
      dispatch(
        deleteMinimizeEmail({
          cacheId: showMinimizeEmailId?.cacheId,
          id: showMinimizeEmailId?.id,
        }),
      );
      method.reset();
      clearTimeout(storeDraftTimeOutFunc.current);
      navigate('/emails');
      return;
    }

    alertDialog.setAlertData(
      'Store email',
      'Do you want to save the current email?',
      () => {
        if (showMinimizeEmailId?.id) {
          updateDraftMutate({
            data,
            id: showMinimizeEmailId.id,
          });
        } else {
          storeDraftMutate({
            data,
            cacheId: showMinimizeEmailId?.cacheId ?? Date.now(),
          });
        }
        setShowMinimizeEmailId(undefined);
        method.reset();
        clearTimeout(storeDraftTimeOutFunc.current);
        alertDialog.onClose();
        navigate('/emails');
      },
    );
  };

  const handleNewComposeClick = () => {
    const values = method.getValues();
    const convertMinimizeEmailData = {
      ...values,
      content: getHtmlStringFromEditorState(values.content),
    };
    const data = createApiData(values);
    const isEmailDataEmpty = checkEmailDataEmpty(values);

    /** NOT HAVE DATA AND ISN'T CALL API STORE DRAFT  */
    if (isEmailDataEmpty && !showMinimizeEmailId) {
      if (location.pathname === '/emails/compose') {
        handleTriggerClearData();
      }
      navigate('/emails/compose');
      return;
    }

    /** MINIMIZE EMAIL ABLE */
    if (isExistShowEmail() || minimizeEmailList.length < 2) {
      const newCacheId = Date.now();
      if (showMinimizeEmailId?.id !== undefined) {
        dispatch(
          addMinimizeEmail({
            ...convertMinimizeEmailData,
            id: showMinimizeEmailId.id,
            cacheId: undefined,
          }),
        );
        updateDraftMutate({ data, id: showMinimizeEmailId.id });
      } else {
        dispatch(
          addMinimizeEmail({
            ...convertMinimizeEmailData,
            cacheId: showMinimizeEmailId?.cacheId ?? newCacheId,
            id: undefined,
          }),
        );
        storeDraftMutate({
          data,
          cacheId: showMinimizeEmailId?.cacheId ?? newCacheId,
        });
      }

      setShowMinimizeEmailId(undefined);
      setTabColor(undefined);
      method.reset();
      clearTimeout(storeDraftTimeOutFunc.current);
      navigate('/emails/compose');
      return;
    }

    // CAN'T NOT MINIMIZE
    if (location.pathname !== '/emails/compose') {
      navigate('/emails/compose');
      return;
    }

    alertDialog.setAlertData(
      'Store email',
      'Your current email will store to draft',
      () => {
        if (showMinimizeEmailId?.id) {
          updateDraftMutate({
            data,
            id: showMinimizeEmailId.id,
          });
        } else {
          storeDraftMutate({
            data,
            cacheId: showMinimizeEmailId?.cacheId ?? Date.now(),
          });
        }
        setShowMinimizeEmailId(undefined);
        method.reset();
        clearTimeout(storeDraftTimeOutFunc.current);
        alertDialog.onClose();
        navigate('/emails/compose');
      },
      () => {
        if (showMinimizeEmailId?.id) {
          deleteEmailMutate(String(showMinimizeEmailId.id));
        }
      },
    );
    return;
  };

  // Auto call this func after 3s
  const handleStoreDraft = () => {
    if (storeDraftTimeOutFunc.current) {
      clearTimeout(storeDraftTimeOutFunc.current);
    }

    storeDraftTimeOutFunc.current = setTimeout(() => {
      const values = method.getValues();
      const isEmailDataEmpty = checkEmailDataEmpty(values);
      const emailData = createApiData(values);

      // New Email
      if (showMinimizeEmailId === undefined) {
        if (isEmailDataEmpty) return;

        const newCacheId = Date.now();
        setShowMinimizeEmailId({ cacheId: newCacheId });
        storeDraftMutate({
          data: emailData,
          cacheId: newCacheId,
        });
        return;
      }

      // Stored to draft
      if (showMinimizeEmailId.id !== undefined) {
        updateDraftMutate({
          id: showMinimizeEmailId.id,
          data: emailData,
        });
        return;
      }

      // Waiting for update id
      if (showMinimizeEmailId.cacheId !== undefined) {
        storeDraftMutate({
          data: emailData,
          cacheId: showMinimizeEmailId.cacheId,
        });
      }
    }, 2000);
  };

  const emailContextValue = useMemo(() => {
    return {
      inputContactBlocks,
      setInputContactBlocks,
      method,
      tabColor,
      triggerClearData,
      onSendEmail: handleSendEmail,
      onNewComposeClick: handleNewComposeClick,
      onMinimizeEmailClick: handleMinimizeEmailClick,
      onMaximizeEmailClick: () => {},
      onCloseEmail: handleCloseEmail,
      onContinueClick: handleContinueClick,
    };
  }, [
    method,
    tabColor,
    triggerClearData,
    handleMinimizeEmailClick,
    handleNewComposeClick,
    handleCloseEmail,
  ]);

  // useEffect(() => {
  //   const renderArray = (from: number, to: number) => {
  //     return Array(to - from + 1).fill(1).map((_, index) => index + from)
  //   }
  //   (async function deleteDraft(){
  //     const idList = renderArray(89, 145);
  //     await deleteAllWithIdList(idList);
  //   })()
  // }, [])

  // const convertMinimizeEmailList = useMemo(() => {
  //   if (!showMinimizeEmailId) return minimizeEmailList
  //   return minimizeEmailList.filter(value => {
  //     if (value.id === undefined) return value.cacheId !== showMinimizeEmailId.cacheId;

  //     return value.id !== showMinimizeEmailId.id
  //   })
  // }, [minimizeEmailList, showMinimizeEmailId])

  return (
    <EmailComposeContext.Provider value={emailContextValue}>
      <MainWrapper>
        <Outlet />
      </MainWrapper>
      <MinimizeEmailList
        data={minimizeEmailList}
        showMinimizeEmailId={showMinimizeEmailId}
        onMaximizeClick={handleMaximizeEmailClick}
        onCloseClick={handleCloseClick}
      />
      <AlertDialog
        titleLabel={alertDialog.title}
        descriptionLabel={alertDialog.description}
        isOpen={alertDialog.isOpen}
        onClose={() => {
          alertDialog.onClose();
          if (alertDialog.onCloseCallBack) {
            alertDialog.onCloseCallBack();
          }
        }}
        onAgree={alertDialog.callback}
        onDisagree={alertDialog.onClose}
      />
    </EmailComposeContext.Provider>
  );
};

export default MainWrapperContainer;
