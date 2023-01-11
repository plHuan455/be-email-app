import {
  approveEmail,
  CreateEmailParam,
  deleteAllWithIdList,
  sendEmail,
  updateEmailWithQuery,
} from '@api/email';
import { EmailComposeEmailFieldNames, EmailComposeFields } from '@components/templates/EmailCompose2';
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
// import { deleteAllWithIdList } from '@api/email';
import { attempt, update } from 'lodash';
import { InputContactBlock } from '@components/molecules/Autocomplete';
import { UserReceiveInfo } from '@components/organisms/Email/Interface';
import { emailRegex } from '@constants/constants';
import { emailData } from '@layouts/EmailStatusBar';
import { AutoCompleteGroupValueTypes } from '@components/molecules/AutoCompleteGroup';

type SelectedEmailHashType = {
  [key in EmailComposeEmailFieldNames]: {[key: string]: true};
}

interface EmailComposeContextTypes {
  isEmailSending?: boolean;
  inputContactBlocks: InputContactBlock[];
  setInputContactBlocks: React.Dispatch<React.SetStateAction<InputContactBlock[]>>;
  method?: UseFormReturn<EmailComposeFields>;
  tabColor?: string;
  triggerClearData: boolean;
  selectedEmailHash: SelectedEmailHashType;
  onChangeSelectedEmailHash: (value: SelectedEmailHashType) => void;
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
  isEmailSending: false,
  inputContactBlocks: [],
  setInputContactBlocks: () => undefined,
  triggerClearData: false,
  selectedEmailHash: {to: {}, cc: {}, bcc: {}},
  onChangeSelectedEmailHash: () => {},
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
      to2:[],
      to:[],
      cc2: [],
      cc: [],
      bcc2: [],
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

  const [selectedEmailHash, setSelectedEmailHash] = useState<SelectedEmailHashType>({to: {}, cc: {}, bcc: {}});

  // MUTATIONS
  const { mutate: deleteEmailMutate } = useMutation({
    mutationKey: ['email-compose-delete-email'],
    mutationFn: (id: number) => updateEmailWithQuery(id, {is_trash: true}),
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
          return { id: res.data.id, cacheId: preState.cacheId };
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
            deleteEmailMutate(preState.id);
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
  // const convertContactField = (contactBlock: InputContactBlock[]) => {
  //   const to: string[] = [];
  //   const cc: string[] = [];
  //   const bcc: string[] = [];

  //   const field = { to, cc, bcc };

  //   contactBlock.forEach((contact) => {
  //     // Nếu là mail
  //     if (contact.subMenu) {
  //       contact.subMenu.forEach((employ) => {
  //         if (employ.field) {
  //           employ.isSelected && field[employ.field].push(employ.mail);
  //         }
  //       });
  //     } else {
  //       if (contact.field) {
  //         contact.isSelected && field[contact.field].push(contact.contact_name);
  //       }
  //     }
  //   });

  //   return field;
  // };

  const convertContactField = (fieldData: AutoCompleteGroupValueTypes[]) => {
    return fieldData.reduce<string[]>((preValue, value) => {
      if(!value.isGroup) return [...preValue, value.name];
      return [...preValue, ...value.data.map(email => email)]
    }, [])
  } 

  const getSelectedContact = (contactBlock: InputContactBlock[]) => {
    return (field: 'to' | 'cc' | 'bcc') => {
      return contactBlock.filter((contact) => {
        return (contact.subMenu ?? []).some(
          (employ) => employ.field === field && employ.isChecked,
        );
      });
    };
  };

  // HANDLE FUNCTIONS
  const checkEmailDataEmpty = (values: EmailComposeFields): boolean => {
    const { contactBlock } = values;
    // const { to, cc, bcc } = convertContactField(contactBlock);

    return (
      values.to2.length === 0 &&
      values.bcc2.length === 0 &&
      values.cc2.length === 0 &&
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
    // const { contactBlock } = values;
    // const { to, cc, bcc } = convertContactField(contactBlock);
    return {
      email: {
        to: convertContactField(values.to2),
        bcc: convertContactField(values.bcc2),
        cc: convertContactField(values.cc2),
        from: currentUserEmail ?? '',
        html_body: getHtmlStringFromEditorState(values.content),
        subject: values.subject,
        attachments: values.attachFiles.fileUrls.filter(value => value).map((value) => ({ filename: value ?? '' })),
      },
      hashtags: values.hashtags.map((value) => value.value),
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
    method.reset();
    method.setValue('to2', data.to ?? []);
    method.setValue('cc2', data.cc ?? []);
    method.setValue('bcc2', data.bcc ?? []);
    method.setValue('content', getEditorStateFormHtmlString(data.content));
    method.setValue('subject', data.subject ?? '');
    method.setValue('attachFiles', data.attachFiles ?? { files: [], fileUrls: [] });
    method.setValue('hashtags', data.hashtags ?? []);

    const cloneSelectedEmailHash:SelectedEmailHashType = {to: {}, cc: {}, bcc: {}};
    data.to?.forEach(value => {
      if(value.isGroup) {
        value.data.forEach(email => cloneSelectedEmailHash.to[email] = true)
      }
    })
    data.cc?.forEach(value => {
      if(value.isGroup) {
        value.data.forEach(email => cloneSelectedEmailHash.cc[email] = true)
      }
    })
    data.bcc?.forEach(value => {
      if(value.isGroup) {
        value.data.forEach(email => cloneSelectedEmailHash.bcc[email] = true)
      }
    })

    setSelectedEmailHash(cloneSelectedEmailHash);
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
    // const { contactBlock } = values;

    // const { to, cc, bcc } = convertContactField(contactBlock);
    // console.log(to, cc, bcc);
    const {to2: to, cc2: cc, bcc2: bcc} = values;

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
    const currValue = method.getValues();
    const currData = createApiData(currValue);
    const isEmailDataEmpty = checkEmailDataEmpty(currValue);
    const convertMinimizeEmailData = {
      ...currValue,
      to: currValue.to2,
      bcc: currValue.bcc2,
      cc: currValue.cc2,
      content: getHtmlStringFromEditorState(currValue.content),
    };

    const foundMinimizeEmail = minimizeEmailList.find(
      (value) => value.id === values.id && values.id !== undefined,
    );

    if (showMinimizeEmailId || !isEmailDataEmpty) {
      const newCacheId = Date.now();
      
      if(!foundMinimizeEmail && values.id !== showMinimizeEmailId?.id) {
        dispatch(addMinimizeEmail({...convertMinimizeEmailData,
          cacheId: showMinimizeEmailId?.cacheId ?? newCacheId,
          id: showMinimizeEmailId?.id
        }))
      }

      if (showMinimizeEmailId?.id) {
        updateDraftMutate({ id: showMinimizeEmailId.id, data: currData });
      } else {
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
    setShowMinimizeEmailId({ id: values.id, cacheId: foundMinimizeEmail ? foundMinimizeEmail.cacheId : Date.now() });
    navigate('/emails/compose');
  };

  const handleMaximizeEmailClick = (data: MinimizeEmailTypes) => {
    const values = method.getValues();
    const isEmailDataEmpty = checkEmailDataEmpty(method.getValues());
    const convertMinimizeEmailData = {
      ...values,
      to: values.to2,
      bcc: values.bcc2,
      cc: values.cc2,
      content: getHtmlStringFromEditorState(values.content),
    };
    const apiParamData = createApiData(values);

    if (isEmailDataEmpty && !showMinimizeEmailId) {
      createDataForForm(data);
      clearTimeout(storeDraftTimeOutFunc.current);
      setShowMinimizeEmailId({
        id: data.id,
        cacheId: data.cacheId,
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
            cacheId: showMinimizeEmailId.cacheId,
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
        cacheId: data.cacheId,
      });
      setTabColor(data.color);
      navigate('/emails/compose');
      return;
    }
  };

  const handleCloseClick = (data: MinimizeEmailTypes) => {
    dispatch(deleteMinimizeEmail({ cacheId: data.cacheId, id: data.id }));
  };

  const handleMinimizeEmailClick = () => {
    const values = method.getValues();
    const data = createApiData(values);
    const convertMinimizeEmailData = {
      ...values,
      to: values.to2,
      bcc: values.bcc2,
      cc: values.cc2,
      content: getHtmlStringFromEditorState(values.content),
    };
    
    if(showMinimizeEmailId?.id !== undefined) {
      updateDraftMutate({ id: showMinimizeEmailId.id, data });
      dispatch(
        addMinimizeEmail({
          ...convertMinimizeEmailData,
          id: showMinimizeEmailId.id,
          cacheId: showMinimizeEmailId.cacheId,
        }),
      );
    }
    else {
      const newCacheId = Date.now();
      storeDraftMutate({ data, cacheId: showMinimizeEmailId?.cacheId ?? newCacheId});
      dispatch(
        addMinimizeEmail({
          ...convertMinimizeEmailData,
          cacheId: showMinimizeEmailId?.cacheId ?? newCacheId,
          id: undefined,
        }),
      );
    }

    setShowMinimizeEmailId(undefined);
    setTabColor(undefined);
    setSelectedEmailHash({to: {}, cc: {}, bcc: {}})
    method.reset();
    clearTimeout(storeDraftTimeOutFunc.current);
  };

  const handleCloseEmail = () => {
    const values = method.getValues();
    const data = createApiData(values);
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

    showMinimizeEmailId && dispatch(
      deleteMinimizeEmail({ cacheId: showMinimizeEmailId.cacheId, id: showMinimizeEmailId.id })
    );

    setShowMinimizeEmailId(undefined);
    setTabColor(undefined)
    method.reset();
    clearTimeout(storeDraftTimeOutFunc.current);
    alertDialog.onClose();
    navigate('/emails');
  };

  const handleNewComposeClick = () => {
    const values = method.getValues();
    const convertMinimizeEmailData = {
      ...values,
      to: values.to2,
      cc: values.cc2,
      bcc: values.bcc2,
      content: getHtmlStringFromEditorState(values.content),
    };
    const data = createApiData(values);
    const isEmailDataEmpty = checkEmailDataEmpty(values);
    const isExistShow = isExistShowEmail();

    /** NOT HAVE DATA AND ISN'T CALL API STORE DRAFT  */
    if (isEmailDataEmpty && !isExistShow) {
      if (location.pathname === '/emails/compose') {
        handleTriggerClearData();
      }
      navigate('/emails/compose');
      return;
    }

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
        if (!isExistShowEmail() && isEmailDataEmpty) {
          deleteEmailMutate(showMinimizeEmailId.id);
          setShowMinimizeEmailId(undefined);
          return;
        }
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
      isEmailSending: isEmailComposeSubmitting,
      inputContactBlocks,
      setInputContactBlocks,
      method,
      tabColor,
      triggerClearData,
      selectedEmailHash,
      onChangeSelectedEmailHash: setSelectedEmailHash,
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
    selectedEmailHash,
    setSelectedEmailHash,
    handleMinimizeEmailClick,
    handleNewComposeClick,
    handleCloseEmail,
  ]);

  // useEffect(() => {
  //   const renderArray = (from: number, to: number) => {
  //     return Array(to - from + 1).fill(1).map((_, index) => index + from)
  //   }
  //   (async function deleteDraft(){
  //     const idList = renderArray(8, 136);
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
