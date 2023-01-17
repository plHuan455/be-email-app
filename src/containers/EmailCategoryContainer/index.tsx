import {
  approveEmail,
  EmailResponse,
  HashtagType,
  undoEmail,
  updateEmailHashtag,
  updateEmailWithQuery,
} from '@api/email';
import Email from '@components/organisms/Email';
import EmailsListActionsContainer from '@containers/EmailsListActionsContainer';
import { Box, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/configureStore';
import {
  addUnreadEmail,
  deleteEmailId,
  HashtagTabs,
  setCurrEmail,
  setEmailsList,
} from '@redux/Email/reducer';
import { rem } from '@utils/functions';
import React, {
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useScrollInfinity from '@hooks/useScrollInfinity';
import EmailMess from '@components/organisms/EmailMess';
import { UserInfo } from '@components/organisms/Email/Interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EmailUpdateQuery } from '@api/email/interface';
import { ActionNameTypes } from '@components/molecules/EmailActions';
import EmailMessEmpty from '@components/organisms/EmailMessEmpty';
import ModalBase from '@components/atoms/ModalBase';
import SettimeInput from '@components/molecules/SettimeInput';
import dayjs, { Dayjs } from 'dayjs';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
import AlertWithEmailAction from '@components/molecules/AlertWithEmailAction';
import { toast } from 'react-toastify';
import { addMailToBlackList } from '@api/blacklist';
import { EmailComposeContext } from '@containers/MainWrapperContainer';
import useWebsocket from '@hooks/useWebsocket';

const myEmail = localStorage.getItem('current_email');
const currRole = localStorage.getItem('current_role')?.toUpperCase();

const EmailCategoryContainer = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const tabSearchParams = searchParams.get('tab');
  const queryClient = useQueryClient();

useWebsocket({
  onOpen: () => {
    console.log('Websocket open');
  },
  onMessage: (data) => {
    console.log('Websocket message', data);
    queryClient.invalidateQueries({queryKey: ['get-emails-list']})
  },
  onClose: () => {
    console.log('Websocket close');
  },
})

  const containerRef = useRef<HTMLDivElement>(null);
  const defaultApproveIn = useRef(dayjs('Thu Apr 07 2022 00:15:00'));
  const isScrolledWhenEmailListChange = useRef<boolean>(true);
  const preEmailId = useRef<number>();
  const isFirstRender = useRef<boolean>(true);
  const intersectingEmailMessStack = useRef<
    { target: HTMLDivElement; emailData: EmailResponse }[]
  >([]);

  const { EmailsList } = useAppSelector((state) => state.email);
  const currEmail = useAppSelector((state) => state.email.currEmail);
  const [pageParams, setPageParams] = useState<{ page: number; limit: number }>({
    page: 1,
    limit: 6,
  });

  const [isEnableScrollTop, setIsEnableScrollTop] = useState<boolean>(true);
  const [isShowScrollBottom, setIsShowScrollButton] = useState<boolean>(false);
  const [showHistoryEmailId, setShowHistoryEmailId] = useState<number | undefined>(
    0,
  );
  const [OpenApproveModalEmail, setOpenApproveModalEmail] =
    useState<EmailResponse>();
  const [valueApproveIn, setValueApproveIn] = useState<Dayjs>(
    defaultApproveIn.current,
  );

  const alertDialog = useAlertDialog();

  const { onContinueClick } = useContext(EmailComposeContext);

  const { scrollToPrePosition } = useScrollInfinity({
    scrollContainer: containerRef.current,
    enabled:
      isEnableScrollTop && pageParams.page * pageParams.limit < EmailsList.length,
    thresholdTop: 400, // Cách top 400px
    onScrollTop: () => {
      setIsEnableScrollTop(false);
      setPageParams((preState) => ({ ...preState, page: preState.page + 1 }));
      setTimeout(() => setIsEnableScrollTop(true), 2000);
    },
    onScroll: (target) => {
      const { scrollHeight, scrollTop, clientHeight } = target as HTMLDivElement;
      setIsShowScrollButton(scrollTop + clientHeight + 100 < scrollHeight);
      handleChangeCurrEmail();
    },
  });

  const { mutate: updateHashtagMutate, isLoading: isUpdateHashtagLoading } =
    useMutation({
      mutationKey: ['email-update-hashtag'],
      mutationFn: (params: { id: number; data: EmailUpdateQuery }) =>
        updateEmailHashtag(params.id, {
          hashtags: (params.data?.hashtags ?? []).map((value) => value.hashtag),
        }),
    });

  const { mutate: approveEmailMutate, isLoading: isEmailApproving } = useMutation({
    mutationKey: ['Approve-email'],
    mutationFn: async (query: {
      user_email_id: number;
      status: 'PENDING' | 'approved' | 'DECLINED' | 'DRAFT';
      note: string;
      approve_after: number;
    }) => await approveEmail(query),
    onSuccess(_, params) {
      queryClient.invalidateQueries({ queryKey: ['get-email-manager'] });
      queryClient.invalidateQueries({ queryKey: ['get-emails-list'] });
      if (params.approve_after > 0) {
        toast.success(`Email will be approved after ${params.approve_after}`);
      } else {
        dispatch(deleteEmailId(params.user_email_id));
        toast.success('Email has been Approved');
      }
    },
    onError() {
      toast.error("Can't approve email");
    },
    onSettled() {
      alertDialog.onClose();
    },
  });

  const { mutate: declineEmailMutate, isLoading: isEmailDeclining } = useMutation({
    mutationKey: ['update-email'],
    mutationFn: (id: number) =>
      approveEmail({ user_email_id: id, status: 'declined' }),
    onSuccess: (_, param) => {
      queryClient.invalidateQueries({ queryKey: ['get-email-manager'] });
      queryClient.invalidateQueries({ queryKey: ['get-emails-list'] });
      dispatch(deleteEmailId(param));
      toast.success('Decline Successful!');
    },
    onError(err: any, params) {
      console.log(err);
      toast.error(
        `Can't ${params} email (${
          err.response?.status ? `CODE: ${err.response?.status}` : ''
        })`,
      );
    },
    onSettled() {
      alertDialog.onClose();
    },
  });

  const { mutate: undoEmailMutate } = useMutation({
    mutationKey: ['email-mess-undo-email'],
    mutationFn: undoEmail,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['get-emails-list'] });
      toast.success('Email have been undo');
    },
    onError() {
      toast.error("Can't undo email");
    },
  });

  const { mutate: moveToTrashMutate, isLoading: isMoveToTradingLoading } =
    useMutation({
      mutationKey: ['email-move-to-trash'],
      mutationFn: (params: { id: number; isTrash?: boolean }) =>
        updateEmailWithQuery(params.id, {
          is_trash: params.isTrash,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['get-emails-list'] });
        queryClient.invalidateQueries({ queryKey: ['get-email-manager'] });
      },
    });

  const { mutate: addBlacklist } = useMutation({
    mutationKey: ['add-black-list'],
    mutationFn: (params: { user_email: string }) => addMailToBlackList(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-emails-list'] });
      queryClient.invalidateQueries({ queryKey: ['get-email-manager'] });
      toast.success('Add Blacklist successfully!');
    },
  });

  const { mutate: unReadMutate, isLoading: isEmailUnreadLoading } = useMutation({
    mutationKey: ['email-update-status'],
    mutationFn: (params: { id: number; data?: EmailUpdateQuery }) =>
      updateEmailWithQuery(params.id, {
        email: { ...params.data },
        status: 'unread',
        send_at: params.data?.send_at,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-emails-list'] });
      queryClient.invalidateQueries({ queryKey: ['get-email-manager'] });
    },
  });

  const { mutate: updateImportantMutate, isLoading: isUpdateImportantLoading } =
    useMutation({
      mutationKey: ['email-update-is-important'],
      mutationFn: (params: { id: number; isImportant?: boolean }) =>
        updateEmailWithQuery(params.id, {
          is_important: params.isImportant,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['get-emails-list'] });
      },
    });

  const { mutate: storeDraftMutate } = useMutation({
    mutationKey: ['Approve-email'],
    mutationFn: async (id: number) =>
      await approveEmail({
        user_email_id: id,
        status: 'DRAFT',
        approve_after: valueApproveIn.hour() * 60 + valueApproveIn.minute(),
        note: '',
      }),
    onSuccess(_, params) {
      queryClient.invalidateQueries({ queryKey: ['get-email-manager'] });
      queryClient.invalidateQueries({ queryKey: ['get-emails-list'] });
      toast.success('Email has been cancel');
    },
    onError() {
      toast.error("Can't approve email");
    },
    onSettled() {
      alertDialog.onClose();
    },
  });

  const handleChangeCurrEmail = () => {
    const foundIntersecting = intersectingEmailMessStack.current.find((value) => {
      const rect = value.target.getBoundingClientRect();
      return (
        rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2
      );
    });

    if (foundIntersecting) {
      // console.log({preEmailId: preEmailId.current, foundIntersectingId: foundIntersecting.emailData.id});
      if (preEmailId.current !== foundIntersecting.emailData.id) {
        dispatch(setCurrEmail(foundIntersecting.emailData));
      }
      preEmailId.current = foundIntersecting.emailData.id;
    }
  };

  // update intersecting list when EmailList change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    intersectingEmailMessStack.current = intersectingEmailMessStack.current.map(
      (value) => {
        const foundEmail = EmailsList.find(
          (email) => email.id === value.emailData.id,
        );
        if (foundEmail !== undefined && foundEmail?.id === currEmail?.id) {
          dispatch(setCurrEmail(foundEmail));
        }
        return { ...value, emailData: foundEmail ?? value.emailData };
      },
    );
    handleChangeCurrEmail();
  }, [EmailsList]);

  // WHEN THE SCROLL CONTAINER CHANGES THE SCROLL HEIGHT => SCROLL TO PREVIOUS EMAIL MESS
  useEffect(() => {
    scrollToPrePosition();
  }, [pageParams]);

  // SCROLL BOTTOM TOP WHEN MOUNT
  useEffect(() => {
    // console.log({isScrolledWhenEmailListChange.current});
    const container = containerRef.current;
    if (
      container &&
      isScrolledWhenEmailListChange.current &&
      EmailsList.length !== 0
    ) {
      container.scrollTop = container.scrollHeight;
      isScrolledWhenEmailListChange.current = false;
    }
  }, [containerRef, EmailsList]);

  const convertedEmailList = useMemo(() => {
    return EmailsList.slice(-1 * pageParams.page * pageParams.limit);
  }, [pageParams, EmailsList]);

  const fakeLoading = EmailsList.length > pageParams.page * pageParams.limit;

  const checkIsReceiveEmail = (id) => {
    return EmailsList.find((mail) => mail.id === id)?.email.from !== myEmail;
  };

  const handleInterSecting = (target: HTMLDivElement, emailData: EmailResponse) => {
    intersectingEmailMessStack.current.push({ target, emailData });
    // console.log(target, emailData.email.subject);
  };

  const handleEmailMessUnIntersect = (emailId: number) => {
    const stackIndex = intersectingEmailMessStack.current.findIndex(
      (value) => value.emailData.id === emailId,
    );
    if (stackIndex !== -1) {
      intersectingEmailMessStack.current.splice(stackIndex, 1);
    }
  };

  const handleScrollBottom = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      containerRef.current.scrollTo({
        top: containerRef.current.scrollTop + 1000,
        behavior: 'smooth',
      });

      setTimeout(() => {
        if (containerRef.current)
          containerRef.current.scrollTop = container.scrollHeight;
      }, 300);
    }
  };

  const handleUpdateHashTagClick = (id: number, hashtagsList: HashtagTabs[]) => {
    const hashtags: HashtagType[] = hashtagsList.map((hashtag) => ({
      hashtag: hashtag.value,
      user_id: Number(localStorage.getItem('current_id') ?? '0'),
      user_email: id,
    }));
    updateHashtagMutate({
      id,
      data: { hashtags },
    });
  };

  const handleEmployerCancelClick = (value: EmailResponse) => {
    alertDialog.setAlertData(
      '',
      <AlertWithEmailAction
        title='Are you sure want to "cancel" this mail?'
        emailTitle={value.email.subject ?? 'Empty'}
        writer={
          value.email.from ?? value.email.cc[0] ?? value.email.bcc[0] ?? 'No one'
        }
      />,
      () => storeDraftMutate(value.id),
    );
  };

  const handleUndoEmail = (id: number) => {
    undoEmailMutate({ emailId: id });
  };

  const handleDeclineClick = (value: EmailResponse) => {
    alertDialog.setAlertData(
      '',
      <AlertWithEmailAction
        title='Are you sure want to "decline" this mail?'
        emailTitle={value.email.subject ?? 'Empty'}
        writer={
          value.email.from ?? value.email.cc[0] ?? value.email.bcc[0] ?? 'No one'
        }
      />,
      () => {
        // updateEmailStatus('declined')
        declineEmailMutate(value.id);
      },
    );
  };

  const handleApproveNowClick = () => {
    alertDialog.setAlertData(
      '',
      <AlertWithEmailAction
        title='Are you sure want to "approve now" this mail?'
        emailTitle={OpenApproveModalEmail?.email.subject ?? 'Empty'}
        writer={
          OpenApproveModalEmail?.email.from ??
          OpenApproveModalEmail?.email.cc[0] ??
          OpenApproveModalEmail?.email.bcc[0] ??
          'No one'
        }
      />,
      () => {
        if (OpenApproveModalEmail?.id !== undefined) {
          approveEmailMutate({
            user_email_id: OpenApproveModalEmail.id,
            note: '',
            approve_after: 0,
            status: 'approved',
          });
        }
        setOpenApproveModalEmail(undefined);
      },
    );
  };

  const handleApproveSettime = () => {
    alertDialog.setAlertData(
      '',
      <AlertWithEmailAction
        title='Are you sure want to "approve" this mail?'
        emailTitle={OpenApproveModalEmail?.email.subject ?? 'Empty'}
        writer={
          OpenApproveModalEmail?.email.from ??
          OpenApproveModalEmail?.email.cc[0] ??
          OpenApproveModalEmail?.email.bcc[0] ??
          'No one'
        }
      />,
      () => {
        if (OpenApproveModalEmail) {
          approveEmailMutate({
            user_email_id: OpenApproveModalEmail.id,
            note: '',
            approve_after: valueApproveIn.hour() * 60 + valueApproveIn.minute(),
            status: 'approved',
          });
        }
        setOpenApproveModalEmail(undefined);
      },
    );
  };

  const handleSendEmailClick = (id: number) => {
    approveEmailMutate({
      user_email_id: id,
      note: '',
      status: 'approved',
      approve_after: 0,
    });
  };

  const handleContinueEmailClick = (value: EmailResponse) => {
    const { email } = value;
    console.log(`[TODO] CONTINUE DRAFT EMAIL ADD FIELDS (TO, BCC, CC, ATTACH_FILE)`);
    onContinueClick({
      id: value.id,
      to: email.to?.map(value => ({isGroup: false, name: value, data: []})) ?? [],
      cc: email.cc?.map(value => ({isGroup: false, name: value, data: []})) ?? [],
      bcc: email.bcc?.map(value => ({isGroup: false, name: value, data: []})) ?? [],
      subject: email.subject,
      content: email.html_body,
      hashtags: (value.hashtags ?? []).map((hashtag) => ({
        name: hashtag.hashtag,
        value: `#${hashtag.hashtag}`,
      })),
      // attachFiles: {
      //   files: Array(email.attachs?.length ?? 0).fill(undefined),
      //   fileUrls: email.attachs?.map(value => value.path) ?? []
      // }
    });
  };

  const handleActionsClick = (action: ActionNameTypes, value: EmailResponse) => {
    switch (action) {
      case 'delete': {
        alertDialog.setAlertData(
          'Are you sure want to delete this email??',
          <p>If click "Agree", you'll delete it .</p>,
          () => {
            moveToTrashMutate({ id: value.id, isTrash: true });
            alertDialog.onClose();
          },
        );
        break;
      }
      case 'spam': {
        alertDialog.setAlertData(
          'Bạn có chắc báo cáo người dùng này với hành vi làm phiền?',
          <p>Nếu bấm có, Bạn sẽ thêm người dùng này vào danh sách chặn.</p>,
          () => {
            addBlacklist({ user_email: value.email.from });
            alertDialog.onClose();
          },
        );
        break;
      }
      case 'unread': {
        dispatch(addUnreadEmail(value));
        dispatch(setEmailsList(EmailsList.filter((email) => email.id !== value.id)));

        unReadMutate({
          id: value.id,
        });
        break;
      }
      case 'star': {
        updateImportantMutate({
          id: value.id,
          isImportant: !value.is_important,
        });
        break;
      }

      default: {
        const cloneEmailsList = [...EmailsList];
        const findIndex = cloneEmailsList.findIndex(
          (email) => email.id === value.id,
        );
        const reqData = { ...cloneEmailsList[findIndex], status: action };
        cloneEmailsList.splice(findIndex, 1, reqData);
        dispatch(setEmailsList(cloneEmailsList));
        break;
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          flex: 1,
          overflow: 'scroll',
          padding: '120px 28px 28px 28px',
        }}
        ref={containerRef}>
        <Box className="w-full flex flex-wrap flex-col">
          {fakeLoading && <EmailMessEmpty isLoading={fakeLoading} />}
          {convertedEmailList.map((value, index) => {
            const { is_trash } = value;
            const status = value.status.toLowerCase();
            const isEmployee = currRole?.toUpperCase().startsWith('EMPLOYEE');
            const isReceiver = checkIsReceiveEmail(value.id);
            const isAdminTabMe = tabSearchParams === 'me' && !isEmployee;
            return (
              <Box key={`email-category-email-mess-${value.id}`}>
                <EmailMess
                  emailData={value}
                  type={checkIsReceiveEmail(value.id) ? 'receive' : 'send'}
                  userInfo={new UserInfo(``, '', value.email.from)}
                  index={index}
                  isShowHeader={value.id === showHistoryEmailId}
                  hiddenActions={
                    isEmployee || isAdminTabMe
                      ? {
                          replyAll:
                            is_trash ||
                            ['pending', 'draft', 'trash', 'declined'].includes(
                              status,
                            ),
                          reply:
                            is_trash ||
                            ['pending', 'draft', 'trash', 'declined'].includes(
                              status,
                            ),
                          forward:
                            is_trash ||
                            ['pending', 'draft', 'trash', 'declined'].includes(
                              status,
                            ),
                          unread:
                            is_trash ||
                            !isReceiver ||
                            ['pending', 'draft', 'trash'].includes(status),
                          spam:
                            is_trash ||
                            !isReceiver ||
                            ['pending', 'draft', 'trash'].includes(status),
                        }
                      : true
                  }
                  onUpdateHashtagClick={(hashtags) =>
                    handleUpdateHashTagClick(value.id, hashtags)
                  }
                  onDecline={() => handleDeclineClick(value)}
                  onApprove={() => setOpenApproveModalEmail(value)}
                  onEmployeeCancel={() => handleEmployerCancelClick(value)}
                  onUndoEmail={() => handleUndoEmail(value.id)}
                  onApproveNow={handleApproveNowClick}
                  onSendEmail={() => handleSendEmailClick(value.id)}
                  onContinueClick={() => handleContinueEmailClick(value)}
                  onActionsClick={(action) => handleActionsClick(action, value)}
                  onShowHistory={() =>
                    setShowHistoryEmailId((preState) =>
                      preState === value.id ? undefined : value.id,
                    )
                  }
                  onInterSecting={(entry) =>
                    handleInterSecting(entry.target as HTMLDivElement, value)
                  }
                  onUnInterSecting={() => handleEmailMessUnIntersect(value.id)}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
      {isShowScrollBottom && (
        <Button
          sx={{
            position: 'absolute',
            bottom: rem(20),
            left: 'calc(50% + 20px)',
            backgroundColor: 'white',
            borderRadius: '100%',
            margin: 0,
            padding: 0,
            zIndex: 80,
            minWidth: 'auto',
            boxShadow:
              '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
            width: rem(40),
            height: rem(40),
            '&.MuiButton-root:hover': {
              backgroundColor: '#d5d5d5',
              boxShadow:
                '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
            },
          }}
          onClick={handleScrollBottom}>
          <KeyboardArrowDownIcon sx={{ color: 'black', fontSize: rem(28) }} />
        </Button>
      )}

      <AlertDialog
        titleLabel={alertDialog.title}
        descriptionLabel={alertDialog.description}
        isLoading={alertDialog.isLoading}
        isOpen={alertDialog.isOpen}
        onClose={alertDialog.onClose}
        onAgree={alertDialog.callback}
        onDisagree={alertDialog.onClose}
      />

      <ModalBase
        isOpen={OpenApproveModalEmail !== undefined}
        title="Set time to Approve"
        submitLabel=""
        onClose={() => {
          setOpenApproveModalEmail(undefined);
          setValueApproveIn(defaultApproveIn.current);
        }}>
        <SettimeInput
          value={valueApproveIn}
          setValueCalendar={(newValue: dayjs.Dayjs | null) =>
            newValue && setValueApproveIn(newValue)
          }
        />
        <Box className="flex gap-2">
          <Button onClick={handleApproveNowClick} color="error">
            Approve Now
          </Button>
          <Button onClick={handleApproveSettime}>Approve</Button>
        </Box>
      </ModalBase>
    </>
  );
};

export default memo(EmailCategoryContainer);
