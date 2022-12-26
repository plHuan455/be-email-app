import { approveEmail, CreateEmailParam, deleteEmail, sendEmail, updateEmailWithQuery } from "@api/email";
import { EmailComposeFields } from "@components/templates/EmailCompose2";
import MainWrapper from "@layouts/MainWrapper"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import { createContext, useEffect, useMemo, useRef, useState } from "react"
import { useForm, UseFormReturn } from "react-hook-form";
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { getEditorStateFormHtmlString, getHtmlStringFromEditorState } from "@utils/functions";
import { useAppDispatch, useAppSelector } from "@redux/configureStore";
import { addMinimizeEmail, deleteMinimizeEmail, updateMinimizeEmail, updateMinimizeEmailId } from "@redux/Email/reducer";
import MinimizeEmailList, { MinimizeEmailTypes } from "@components/templates/MinimizeEmailList";
import AlertDialog, { useAlertDialog } from "@components/molecules/AlertDialog";
import { deleteAllWithIdList } from "@api/email";
import { attempt, update } from "lodash";

interface EmailComposeContextTypes {
  method?: UseFormReturn<EmailComposeFields>,
  tabColor?: string;
  triggerClearData: boolean;
  onSendEmail: (values: (EmailComposeFields & { sendAt: Dayjs | null | undefined })) => void;
  onNewComposeClick: () => void;
  onMinimizeEmailClick: () => void;
  onMaximizeEmailClick: () => void;
}

export const EmailComposeContext = createContext<EmailComposeContextTypes>({
  triggerClearData: false,
  onSendEmail: () => { },
  onNewComposeClick: () => { },
  onMinimizeEmailClick: () => { },
  onMaximizeEmailClick: () => { },
});


interface MainWrapperContainerProps { }

const MainWrapperContainer: React.FC<MainWrapperContainerProps> = () => {
  const dispatch = useAppDispatch();
  const currentUserEmail = localStorage.getItem('current_email');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const alertDialog = useAlertDialog();

  const storeDraftTimeOutFunc = useRef<NodeJS.Timeout>();
  const triggerTimeOutRef = useRef<NodeJS.Timeout>();

  const minimizeEmailList = useAppSelector(state => state.email.minimizeEmailList);

  const method = useForm<EmailComposeFields>({
    defaultValues: {
      to: [],
      cc: [],
      bcc: [],
      subject: '',
      content: getEditorStateFormHtmlString(),
      attachFiles: { fileUrls: [], files: [] },
      hashtags: [],
      from: currentUserEmail ?? ''
    },
  });

  // STORE DRAFT WHEN VALUES CHANGE
  method.watch(() => handleStoreDraft())

  const [showMinimizeEmailId, setShowMinimizeEmailId] = useState<{ id?: number; cacheId?: number }>();
  const [tabColor, setTabColor] = useState<string>();
  const [triggerClearData, setTriggerClearData] = useState<boolean>(false);

  // MUTATIONS
  const { mutate: deleteEmailMutate } = useMutation({
    mutationKey: ['email-compose-delete-email'],
    mutationFn: deleteEmail,
  });
  const { mutate: storeDraftMutate, isLoading: isStoreDraftLoading } = useMutation({
    mutationKey: ['main-wrapper-container-store-draft', showMinimizeEmailId],
    mutationFn: async (params: { data: CreateEmailParam, cacheId?: number, }) => {
      const res = await sendEmail(params.data);
      const draft = await approveEmail({
        user_email_id: res.data.id,
        status: 'DRAFT',
        approve_after: 0,
      });
      return res;
    },
    onSuccess(res, params) {
      if (params.cacheId === undefined) return;
      dispatch(updateMinimizeEmailId({ id: res.data.id, cacheId: params.cacheId }));
      setShowMinimizeEmailId(preState => {
        if (preState?.cacheId === params.cacheId && preState?.cacheId !== undefined) {
          return { id: res.data.id }
        }
        return preState
      })
      queryClient.invalidateQueries({ queryKey: ['get-all-email-status'] });
    },
  });

  const { mutate: updateDraftMutate, isLoading: isUpdateDraftLoading } = useMutation({
    mutationKey: ['main-wrapper-container-update-draft'],
    mutationFn: (params: { id: number; data: CreateEmailParam }) => {
      return updateEmailWithQuery(params.id, params.data);
    },
  })

  const { mutate: submitEmailComposeMutate, isLoading: isEmailComposeSubmitting } =
    useMutation({
      mutationKey: ['email-compose-submit'],
      mutationFn: sendEmail,
      onSuccess: (res) => {
        navigate(`/emails/catalog/pending/${res.data.user_id}`);
        queryClient.invalidateQueries({ queryKey: ['get-all-email-status'] });
        setShowMinimizeEmailId(undefined);
        method.reset();
        clearTimeout(storeDraftTimeOutFunc.current);
        toast.success('Email has been sent')
      },
      onError() {
        toast.error('Cannot send email');
      }
    }
  );

  // HANDLE FUNCTIONS
  const checkEmailDataEmpty = (values: EmailComposeFields): boolean => {
    return (
      values.to.length === 0 &&
      values.bcc.length === 0 &&
      values.cc.length === 0 &&
      !values.subject &&
      values.attachFiles.fileUrls.length === 0 &&
      values.attachFiles.files.length === 0 &&
      (values.content === '' || getHtmlStringFromEditorState(values.content) === '<p></p>\n')
    )
  }
  const createApiData = (values: EmailComposeFields & { sendAt?: Dayjs | null | undefined }) => {
    return {
      email: {
        to: values.to.reduce((curr: string[], next) => {
          const mails = next.employeesList.map((employee) => employee.mail);
          return [...curr, ...mails];
        }, []),
        bcc: values.bcc.map(value => value.mail),
        cc: values.cc.map(value => value.mail),
        from: currentUserEmail ?? '',
        text_html: getHtmlStringFromEditorState(values.content),
        subject: values.subject
      },
      send_at: values.sendAt?.toISOString() ?? dayjs().toISOString(),
    }
  }
  const isExistShowEmail = () => {
    if (!showMinimizeEmailId) return false;
    return minimizeEmailList.some(value =>
      (value.id === showMinimizeEmailId.id && value.id !== undefined) ||
      (value.cacheId === showMinimizeEmailId.cacheId && value.cacheId !== undefined)
    );
  }
  const createDataForForm = (data: MinimizeEmailTypes) => {
    method.reset();
    method.setValue('to', data.to ?? []);
    method.setValue('cc', data.cc ?? []);
    method.setValue('bcc', data.bcc ?? []);
    method.setValue('content', getEditorStateFormHtmlString(data.content));
    method.setValue('subject', data.subject ?? '');
    method.setValue('attachFiles', data.attachFiles ?? {files: [], fileUrls: []});
    method.setValue('hashtags', data.hashtags ?? []);
  }
  const handleTriggerClearData = () => {
    clearTimeout(triggerTimeOutRef.current);
    setTriggerClearData(true);
    triggerTimeOutRef.current = setTimeout(() => {
      setTriggerClearData(false);
    }, 200)
  }


  const handleSendEmail = (values: EmailComposeFields & { sendAt?: Dayjs | null }) => {
    if (
      values.to.length === 0 &&
      values.cc.length === 0 &&
      values.bcc.length === 0
    ) {
      alertDialog.setAlertData("Can't send email", "Can't send email without receiver", () => {
        alertDialog.onClose();
      });
      return;
    }
    submitEmailComposeMutate(createApiData(values))
  }

  const handleMaximizeEmailClick = (data: MinimizeEmailTypes) => {
    const values = method.getValues();
    const isEmailDataEmpty = checkEmailDataEmpty(method.getValues());
    const convertMinimizeEmailData = { ...values, content: getHtmlStringFromEditorState(values.content) };
    const apiParamData = createApiData(values);

    if(isEmailDataEmpty && !showMinimizeEmailId) {
      createDataForForm(data);
      clearTimeout(storeDraftTimeOutFunc.current);
      setShowMinimizeEmailId({ id: data.id, cacheId: data.id ? undefined : data.cacheId });
      setTabColor(data.color);
      navigate('/emails/compose');
      return;
    }

    // MINIMIZE ABLE
    if(isExistShowEmail() || minimizeEmailList.length < 2) {
      const newCacheId = Date.now();
      if(showMinimizeEmailId?.id !== undefined) {
        dispatch(addMinimizeEmail({...convertMinimizeEmailData, id: showMinimizeEmailId.id, cacheId: undefined}));
        updateDraftMutate({id: showMinimizeEmailId.id, data: apiParamData});
      }
      else {
        dispatch(addMinimizeEmail({...convertMinimizeEmailData, cacheId: showMinimizeEmailId?.cacheId ?? newCacheId, id: undefined}));
        storeDraftMutate({cacheId: showMinimizeEmailId?.cacheId ?? newCacheId, data: apiParamData});
      }
      createDataForForm(data);
      clearTimeout(storeDraftTimeOutFunc.current);
      setShowMinimizeEmailId({ id: data.id, cacheId: data.id ? undefined : data.cacheId });
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
              id: showMinimizeEmailId.id
            })
          } else {
            storeDraftMutate({
              data: apiParamData,
              cacheId: showMinimizeEmailId?.cacheId ?? Date.now(),
            });
          }
          createDataForForm(data);
          clearTimeout(storeDraftTimeOutFunc.current);
          setShowMinimizeEmailId({ id: data.id, cacheId: data.id ? undefined : data.cacheId });
          setTabColor(data.color);
          alertDialog.onClose();
          navigate('/emails/compose');
        }
      )
    
  }

  const handleCloseClick = (data: MinimizeEmailTypes) => {
    dispatch(deleteMinimizeEmail({ cacheId: data.cacheId, id: data.id }));
  }


  const handleMinimizeEmailClick = () => {
    const values = method.getValues();
    const data = createApiData(values)
    const convertMinimizeEmailData = { ...values, content: getHtmlStringFromEditorState(values.content) };

    if (!isExistShowEmail() && minimizeEmailList.length >= 2) {
      toast.error('Only a maximum of 2 emails can be hidden, please delete some to hide the email.');
      clearTimeout(storeDraftTimeOutFunc.current);
      return
    }

    // New Email
    if (showMinimizeEmailId === undefined) {
      const newCacheId = Date.now();
      storeDraftMutate({ data, cacheId: newCacheId });
      dispatch(addMinimizeEmail({ ...convertMinimizeEmailData, cacheId: newCacheId, id: undefined }))
      setShowMinimizeEmailId(undefined);
      setTabColor(undefined);
      method.reset();
      clearTimeout(storeDraftTimeOutFunc.current);
      return;
    }

    // Email is in minimize email list
    // Stored to draft
    if (showMinimizeEmailId.id !== undefined) {
      updateDraftMutate({ id: showMinimizeEmailId.id, data });
      setShowMinimizeEmailId(undefined);
      dispatch(addMinimizeEmail({ ...convertMinimizeEmailData, id: showMinimizeEmailId.id, cacheId: undefined }));
      setTabColor(undefined);
      method.reset();
      clearTimeout(storeDraftTimeOutFunc.current);
      return;
    }

    // Waiting for update id
    if (showMinimizeEmailId.cacheId !== undefined) {
      storeDraftMutate({ cacheId: showMinimizeEmailId.cacheId, data });
      dispatch(addMinimizeEmail({ ...convertMinimizeEmailData, cacheId: showMinimizeEmailId.cacheId, id: undefined }));
      setShowMinimizeEmailId(undefined);
      setTabColor(undefined)
      method.reset();
      clearTimeout(storeDraftTimeOutFunc.current);
      return;
    }

    // Curr Email isn't in minimize email list

  }

  const handleNewComposeClick = () => {
    const values = method.getValues();
    const convertMinimizeEmailData = { ...values, content: getHtmlStringFromEditorState(values.content) };
    const data = createApiData(values);
    const isEmailDataEmpty = checkEmailDataEmpty(values);

    /** NOT HAVE DATA AND ISN'T CALL API STORE DRAFT  */
    if(isEmailDataEmpty && !showMinimizeEmailId) {
      if(location.pathname === '/emails/compose') {
        handleTriggerClearData();
      }
      navigate('/emails/compose');
      return;
    }

    /** MINIMIZE EMAIL ABLE */
    if(isExistShowEmail() || minimizeEmailList.length < 2) {
      const newCacheId = Date.now();
      if(showMinimizeEmailId?.id !== undefined) {
        dispatch(addMinimizeEmail({...convertMinimizeEmailData, id: showMinimizeEmailId.id, cacheId: undefined}));
        updateDraftMutate({data, id: showMinimizeEmailId.id});
      } else {
        dispatch(addMinimizeEmail({...convertMinimizeEmailData, cacheId: showMinimizeEmailId?.cacheId ?? newCacheId, id: undefined}));
        storeDraftMutate({data, cacheId: showMinimizeEmailId?.cacheId ?? newCacheId});
      }
      
      setShowMinimizeEmailId(undefined)
      setTabColor(undefined);
      method.reset();
      clearTimeout(storeDraftTimeOutFunc.current);
      navigate('/emails/compose');
      return;
    }

    // CAN'T NOT MINIMIZE
    if(location.pathname !== '/emails/compose'){
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
            id: showMinimizeEmailId.id
          })
        } else {
          storeDraftMutate({
            data,
            cacheId: showMinimizeEmailId?.cacheId ?? Date.now(),
          });
        }
        setShowMinimizeEmailId(undefined);
        method.reset();
        clearTimeout(storeDraftTimeOutFunc.current);
        alertDialog.onClose()
        navigate('/emails/compose');
      }
    )
    return;
  }

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
          data: emailData
        })
        return;
      }

      // Waiting for update id
      if (showMinimizeEmailId.cacheId !== undefined) {
        storeDraftMutate({
          data: emailData,
          cacheId: showMinimizeEmailId.cacheId,
        });
      }
    }, 2000)
  }

  const emailContextValue = useMemo(() => {
    return {
      method,
      tabColor,
      triggerClearData,
      onSendEmail: handleSendEmail,
      onNewComposeClick: handleNewComposeClick,
      onMinimizeEmailClick: handleMinimizeEmailClick,
      onMaximizeEmailClick: () => {
      }
    }
  }, [method, tabColor, triggerClearData, handleMinimizeEmailClick, handleNewComposeClick])

  // useEffect(() => {
  //   const renderArray = (from: number, to: number) => {
  //     return Array(to - from + 1).fill(1).map((_, index) => index + from)
  //   }
  //   (async function deleteDraft(){
  //     const idList = renderArray(302, 319);
  //     await deleteAllWithIdList(idList);
  //   })()
  // }, [])

  const convertMinimizeEmailList = useMemo(() => {
    if (!showMinimizeEmailId) return minimizeEmailList
    return minimizeEmailList.filter(value => {
      if (value.id === undefined) return value.cacheId !== showMinimizeEmailId.cacheId;

      return value.id !== showMinimizeEmailId.id
    })
  }, [minimizeEmailList, showMinimizeEmailId])

  return (
    <EmailComposeContext.Provider value={emailContextValue}>
      <MainWrapper>
        <Outlet />
      </MainWrapper>
      <MinimizeEmailList
        data={convertMinimizeEmailList}
        onMaximizeClick={handleMaximizeEmailClick}
        onCloseClick={handleCloseClick}
      />
      <AlertDialog
        titleLabel={alertDialog.title}
        descriptionLabel={alertDialog.description}
        isOpen={alertDialog.isOpen}
        onClose={alertDialog.onClose}
        onAgree={alertDialog.callback}
        onDisagree={alertDialog.onClose}
      />
    </EmailComposeContext.Provider>
  )
}

export default MainWrapperContainer