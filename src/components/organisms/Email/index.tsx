import { Box, Button } from '@mui/material';
import React, {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Email, UserInfo, UserReceiveInfo } from './Interface';
import {
  EmailResponse,
  HashtagType,
  updateEmailHashtag,
  updateEmailWithQuery,
} from '@api/email';

import { isEmpty } from 'lodash';
import EmailMessEmpty from '../EmailMessEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';
import { addSpamEmail, addUnreadEmail, setEmailsList } from '@redux/Email/reducer';
import ModalBase from '@components/atoms/ModalBase';
import { useParams, useSearchParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EmailUpdateQuery } from '@api/email/interface';
import EmailMessContainer from '@containers/EmailMessContainer';
import EmailReplyMessMain, {
  useEmailReplyMess,
} from '@containers/EmailReplyContainer/ReplyMess';
import EmailActionLayoutContainer, {
  useEmailActionLayout,
} from '@containers/EmailActionsLayoutContainer';
import { toast } from 'react-toastify';
import { addMailToBlackList } from '@api/blacklist';
import { ActionNameTypes } from '@components/molecules/EmailActions';
import { InputContactBlock } from '@components/molecules/Autocomplete';

interface ModalForm {
  title: string;
  content?: ReactNode;
  onSubmit?: () => void;
  onClose?: () => void;
}

interface Props {
  pageParams: { page: number; limit: number };
  onEmailMessIntersecting?: (target: HTMLDivElement, emailId: EmailResponse) => void;
  onUnIntersecting?: (emailId: number) => void;
}

const Email: React.FC<Props> = ({
  pageParams,
  onEmailMessIntersecting,
  onUnIntersecting,
}) => {
  const lastEmailMessRef = useRef<HTMLDivElement>(null);

  const {catalog} = useParams();

  const [showHistory, setShowHistory] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalForm>({
    title: 'Modal',
    content: <p>Modal Content</p>,
    onSubmit() {},
    onClose() {
      handleCloseModal();
    },
  });

  const { isShowLayout, handleCloseLayout, handleOpenLayout } = useEmailReplyMess();
  const { isShow, handleOnClose, handleOnOpen } = useEmailActionLayout();

  // useSearchParams
  const [searchParams] = useSearchParams();
  const tabSearchParams = searchParams.get('tab');

  // queryClient
  const queryClient = useQueryClient();

  const { EmailsList, isLoading } = useSelector((state: RootState) => state.email);
  const dispatch = useDispatch();

  // const { mutate: deleteEmailAction, isLoading: isDeletingEmail } = useMutation({
  //   mutationKey: ['email-delete'],
  //   mutationFn: deleteEmail,
  //   onSuccess: () => {
  //     setIsOpenModal(false);
  //     queryClient.invalidateQueries({
  //       queryKey: ['get-email-manager'],
  //     });
  //     queryClient.invalidateQueries({
  //       queryKey: ['get-emails-list'],
  //     });
  //   },
  // });

  const { mutate: updateHashtagMutate, isLoading: isUpdateHashtagLoading } =
    useMutation({
      mutationKey: ['email-update-hashtag'],
      mutationFn: (params: { id: number; data: EmailUpdateQuery }) =>
        updateEmailHashtag(params.id, {
          hashtags: (params.data?.hashtags ?? []).map((value) => value.hashtag),
        }),
    });
  const { mutate: updateImportantMutate, isLoading: isUpdateImportantLoading } =
    useMutation({
      mutationKey: ['email-update-is-important'],
      mutationFn: (params: { id: number; isImportant?: boolean; }) =>
        updateEmailWithQuery(params.id, {
          is_important: params.isImportant,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['get-emails-list'] });
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
        setIsOpenModal(false);
        queryClient.invalidateQueries({ queryKey: ['get-emails-list'] });
        queryClient.invalidateQueries({ queryKey: ['get-email-manager'] });
      },
    });

  const { mutate: updateEmailStatus, isLoading: isLoadingUpdateEmailStatus } =
    useMutation({
      mutationKey: ['email-update-status'],
      mutationFn: (params: {
        id: number;
        data?: EmailUpdateQuery;
        status?: string;
      }) =>
        updateEmailWithQuery(params.id, {
          email: { ...params.data },
          status: params.status,
          send_at: params.data?.send_at,
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

  useEffect(() => {
    if (!isEmpty(EmailsList)) {
      const EmailsListLength = EmailsList.length - 1;
      setShowHistory(EmailsList[EmailsListLength].id);
    }
  }, [EmailsList]);

  // useEffect(() => {
  //   if (lastEmailMessRef.current) {
  //     lastEmailMessRef.current.scrollIntoView();
  //   }
  // }, [EmailsList]);

  const checkIsReceiveEmail = useCallback(
    (id) => {
      return (
        EmailsList.find((mail) => mail.id === id)?.email.from !==
        localStorage.getItem('current_email')
      );
    },
    [EmailsList],
  );

  const receiversList: InputContactBlock[] = useMemo(() => {
    if (isEmpty(EmailsList)) return [];

    // Lấy ra Email cuối cùng trong email List
    const newestEmail = EmailsList[EmailsList.length - 1].email;

    // Lấy email của người dùng
    const CURRENT_EMAIL = localStorage.getItem('current_email');

    // Lọc bỏ mail của người dùng trong receiversList
    const receiverList = [
      newestEmail.from,
      ...(newestEmail.to ?? []),
      ...(newestEmail.cc ?? []),
      ...(newestEmail.bcc ?? []),
    ];

    const index = receiverList.indexOf(CURRENT_EMAIL ?? '');

    receiverList.splice(index, 1);

    return receiverList.map((receiver, index) => ({
      id: index.toString(),
      contact_name: receiver,
      field: 'cc',
      isSelected: true,
    }));
  }, [EmailsList]);

  const handleActionClick = (action: ActionNameTypes, emailId: number) => {
    const foundEmail = EmailsList.find((value) => value.id === emailId);
    if (
      action !== 'delete' &&
      action !== 'spam' &&
      action !== 'unread' &&
      action !== 'star'
    ) {
      handleOnOpen();
      return;
    }

    if (!foundEmail) return;

    switch (action) {
      case 'delete': {
        setModal((prevState) => ({
          ...prevState,
          title: 'Are you sure want to delete this email??',
          content: <p>If click "OK", you'll delete it .</p>,
          onSubmit: async () => {
            moveToTrashMutate({ id: emailId, isTrash: true });
          },
        }));
        setIsOpenModal(true);
        break;
      }
      case 'spam': {
        setModal((prevState) => ({
          ...prevState,
          title: 'Bạn có chắc báo cáo người dùng này với hành vi làm phiền?',
          content: <p>Nếu bấm có, Bạn sẽ thêm người dùng này vào danh sách chặn.</p>,
          onSubmit() {
            addBlacklist({ user_email: foundEmail.email.from });

            handleCloseModal();
          },
        }));
        setIsOpenModal(true);
        break;
      }
      case 'unread': {
        dispatch(addUnreadEmail(foundEmail));
        dispatch(setEmailsList(EmailsList.filter((email) => email.id !== emailId)));

        updateEmailStatus({
          id: foundEmail.id,
          status: 'unread',
        });
        break;
      }
      case 'star': {
        updateImportantMutate({ id: emailId, isImportant: catalog === 'important' ? false : !foundEmail.is_important });
        break;
      }

      default:
        break;
    }
  };

  const changeEmailStatus = useCallback(
    (status, id) => {
      return;
      if (
        status === 'delete' ||
        status === 'spam' ||
        status === 'unread' ||
        status === 'star'
      ) {
        switch (status) {
          case 'delete': {
            setModal((prevState) => ({
              ...prevState,
              title: 'Are you sure want to delete this email??',
              content: <p>If click "OK", you'll delete it .</p>,
              onSubmit: async () => {
                // deleteEmailAction(id);
              },
            }));
            setIsOpenModal(true);
            break;
          }
          case 'spam': {
            setModal((prevState) => ({
              ...prevState,
              title: 'Bạn có chắc báo cáo người dùng này với hành vi làm phiền?',
              content: (
                <p>Nếu bấm có, Bạn sẽ thêm người dùng này vào danh sách chặn.</p>
              ),
              onSubmit() {
                const cloneEmailsList = [...EmailsList];

                const foundIndex = cloneEmailsList.findIndex(
                  (email) => email.id === id,
                );

                const spamEmail = cloneEmailsList.splice(foundIndex, 1);

                addBlacklist({ user_email: spamEmail[0].email.from });

                handleCloseModal();
              },
            }));
            setIsOpenModal(true);
            break;
          }
          case 'unread': {
            const cloneEmailsList = [...EmailsList];

            const email = cloneEmailsList.find((email) => email.id === id);

            const unreadEmail = cloneEmailsList.splice(id, 1);

            dispatch(addUnreadEmail(unreadEmail));
            dispatch(setEmailsList(cloneEmailsList));

            updateEmailStatus({
              id: email?.id ?? 0,
              status: 'unread',
            });
            break;
          }
          case 'star': {
            const cloneEmailsList = [...EmailsList];

            const email = cloneEmailsList.find((email) => email.id === id);

            updateImportantMutate({ id: email?.id ?? 0, isImportant: !email?.is_important });

            break;
          }

          default:
            break;
        }
      } else {
        // const cloneEmailsList = [...EmailsList];

        // const reqData = { ...cloneEmailsList[index], status: status };

        // cloneEmailsList.splice(index, 1, reqData);

        // console.log('line 154', cloneEmailsList);

        // dispatch(setEmailsList(cloneEmailsList));
        handleOnOpen();
      }
    },
    [EmailsList],
  );

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const handleShowHistory = useCallback(
    (currEmail, value) => {
      if (showHistory !== currEmail.id) setShowHistory(value);
      else setShowHistory(0);
    },
    [showHistory],
  );

  const convertedEmailList = useMemo(() => {
    return EmailsList.slice(-1 * pageParams.page * pageParams.limit);
  }, [pageParams, EmailsList]);

  const currRole = localStorage.getItem('current_role')?.toUpperCase();

  // TODO REMOVE FAKE LOADING
  const fakeLoading = EmailsList.length > pageParams.page * pageParams.limit;

  return (
    <Box className="w-full flex flex-wrap flex-col">
      {/* TODO: UNCOMMENT THIS CODE WHEN HAVE API */}
      {/* {isLoading && <EmailMessEmpty isLoading={isLoading} />} */}

      {/* TODO: REMOVE THIS CODE WHEN HAVE API PAGE LIMIT*/}
      {fakeLoading && <EmailMessEmpty isLoading={fakeLoading} />}
      {convertedEmailList.map((email, index) => {
        const status = email.status.toLowerCase();
        const isEmployee = currRole?.startsWith('EMPLOYEE');
        const isReceiver = checkIsReceiveEmail(email.id);

        return (
          <EmailMessContainer
            ref={EmailsList.length - 1 === index ? lastEmailMessRef : undefined}
            key={email.id}
            type={isReceiver ? 'receive' : 'send'}
            userInfo={
              new UserInfo(
                ``,
                email.email?.writer_id?.toString() ?? '',
                email.email.from,
              )
            }
            emailData={{...email, is_important: catalog === 'important' ? true : email.is_important}}
            onShowHistory={handleShowHistory}
            isShowHeader={showHistory === email.id}
            hiddenActions={
              isEmployee
                ? {
                    replyAll: ['draft', 'trash', 'declined'].includes(status),
                    reply: ['draft', 'trash', 'declined'].includes(status),
                    forward: ['draft', 'trash', 'declined'].includes(status),
                    unread: !isReceiver || ['draft', 'trash'].includes(status),
                    spam: !isReceiver || ['draft', 'trash'].includes(status),
                  }
                : true
            }
            isShowActions={searchParams.get('tab') === 'me'}
            onChangeStatus={changeEmailStatus}
            onActionsClick={(action) => handleActionClick(action, email.id)}
            index={index}
            onUpdateHashtagClick={(hashtagsList) => {
              const hashtags: HashtagType[] = hashtagsList.map((hashtag) => ({
                hashtag: hashtag.value,
                user_id: Number(localStorage.getItem('current_id') ?? '0'),
                user_email: email.id,
              }));
              updateHashtagMutate({
                id: email.id,
                data: { hashtags },
              });
            }}
            onInterSecting={(entry) => {
              if (onEmailMessIntersecting)
                onEmailMessIntersecting(entry.target as HTMLDivElement, email);
            }}
            onUnInterSecting={() => {
              onUnIntersecting && onUnIntersecting(email.id);
            }}
          />
        );
      })}
      <ModalBase
        onClose={handleCloseModal}
        onSubmit={modal.onSubmit}
        isOpen={isOpenModal}
        title={modal.title}
        submitLabel="">
        <div className="">
          <div>{modal.content}</div>
          <div className="flex gap-2 my-2">
            <Button className="flex-1 button-create-mui" onClick={modal.onSubmit}>
              OK
            </Button>
            <Button
              className="flex-1 button-create-mui"
              onClick={modal.onClose}
              sx={{
                color: '#7D7E80',
                backgroundColor: '#E0E0EA',
                '&:hover': {
                  backgroundColor: '#E0E0EA',
                },
              }}>
              Cancel
            </Button>
          </div>
        </div>
      </ModalBase>
      <EmailReplyMessMain.Input onClickInput={handleOpenLayout} />
      <EmailReplyMessMain.LayoutModal
        isShow={isShowLayout}
        receiversList={receiversList}
        onClose={handleCloseLayout}
        onOpen={handleCloseLayout}
      />
      <EmailActionLayoutContainer isShow={isShow} onClose={handleOnClose} />
    </Box>
  );
};

export default memo(Email);
