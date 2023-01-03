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
  deleteEmail,
  EmailResponse,
  HashtagType,
  updateEmailWithQuery,
} from '@api/email';

import { isEmpty } from 'lodash';
import EmailMessEmpty from '../EmailMessEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';
import { addSpamEmail, addUnreadEmail, setEmailsList } from '@redux/Email/reducer';
import ModalBase from '@components/atoms/ModalBase';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EmailUpdateQuery } from '@api/email/interface';
import EmailMessContainer from '@containers/EmailMessContainer';
import EmailReplyMessMain, {
  useEmailReplyMess,
} from '@containers/EmailReplyContainer/ReplyMess';
import EmailActionLayoutContainer, {
  useEmailActionLayout,
} from '@containers/EmailActionsLayoutContainer';
import { InputContactBlock } from '@components/molecules/AutoCompleteReceive';

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

  const { mutate: deleteEmailAction, isLoading: isDeletingEmail } = useMutation({
    mutationKey: ['email-delete'],
    mutationFn: deleteEmail,
    onSuccess: () => {
      setIsOpenModal(false);
      queryClient.invalidateQueries({
        queryKey: ['get-email-manager'],
      });
      queryClient.invalidateQueries({
        queryKey: ['get-emails-list'],
      });
    },
  });

  const { mutate: updateHashtagMutate, isLoading: isUpdateHashtagLoading } =
    useMutation({
      mutationKey: ['email-update-hashtag'],
      mutationFn: (params: { id: number; data: EmailUpdateQuery }) =>
        updateEmailWithQuery(params.id, {
          hashtags: params.data.hashtags,
        }),
    });
  const { mutate: updateImportantMutate, isLoading: isUpdateImportantLoading } =
    useMutation({
      mutationKey: ['email-update-is-important'],
      mutationFn: (params: { id: number; data: EmailUpdateQuery }) =>
        updateEmailWithQuery(params.id, {
          email: { ...params.data, is_favorite: !params.data.is_favorite },
          send_at: params.data.send_at,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['get-emails-list'] });
      },
    });
  const { mutate: updateEmailStatus, isLoading: isLoadingUpdateEmailStatus } =
    useMutation({
      mutationKey: ['email-update-status'],
      mutationFn: (params: { id: number; data: EmailUpdateQuery }) =>
        updateEmailWithQuery(params.id, {
          email: { ...params.data },
          send_at: params.data.send_at,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['get-emails-list'] });
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

    const newestEmail = EmailsList[EmailsList.length - 1].email;

    const CURRENT_EMAIL = localStorage.getItem('current_email');

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
      employeesList: [new UserReceiveInfo('', receiver, receiver, true, 'cc')],
    }));
  }, [EmailsList]);

  const changeEmailStatus = useCallback(
    (status, index) => {
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
                const cloneEmailsList = [...EmailsList];

                deleteEmailAction(cloneEmailsList[index].id.toString());
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

                const spamEmail = cloneEmailsList.splice(index, 1);

                dispatch(addSpamEmail(spamEmail));
                dispatch(setEmailsList(cloneEmailsList));

                handleCloseModal();
              },
            }));
            setIsOpenModal(true);
            break;
          }
          case 'unread': {
            const cloneEmailsList = [...EmailsList];

            const email = cloneEmailsList[index];

            const unreadEmail = cloneEmailsList.splice(index, 1);

            dispatch(addUnreadEmail(unreadEmail));
            dispatch(setEmailsList(cloneEmailsList));

            updateEmailStatus({
              id: email.id,
              data: { ...email, status: 'unread' },
            });
            break;
          }
          case 'star': {
            const cloneEmailsList = [...EmailsList];

            const email = cloneEmailsList[index];

            updateImportantMutate({ id: email.id, data: { ...email } });

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
  const fakeLoading = EmailsList.length >= pageParams.page * pageParams.limit;

  return (
    <Box className="w-full flex flex-wrap flex-col">
      {/* TODO: UNCOMMENT THIS CODE WHEN HAVE API */}
      {/* {isLoading && <EmailMessEmpty isLoading={isLoading} />} */}

      {/* TODO: REMOVE THIS CODE WHEN HAVE API PAGE LIMIT*/}
      {fakeLoading && <EmailMessEmpty isLoading={fakeLoading} />}
      {convertedEmailList.map((email, index) => (
        <EmailMessContainer
          ref={EmailsList.length - 1 === index ? lastEmailMessRef : undefined}
          key={email.id}
          type={checkIsReceiveEmail(email.id) ? 'receive' : 'send'}
          userInfo={
            new UserInfo(
              ``,
              email.email?.writer_id?.toString() ?? '',
              email.email.from,
            )
          }
          emailData={email}
          onShowHistory={handleShowHistory}
          isShowHeader={showHistory === email.id}
          isShowActions={
            searchParams.get('tab') === 'me' && !currRole?.startsWith('EMPLOYEE')
              ? false
              : true
          }
          onChangeStatus={changeEmailStatus}
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
      ))}
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
