import { Box, Button } from '@mui/material';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import avatarImg from '@assets/images/avatars/avatar-2.jpg';
import { Email, UserInfo } from './Interface';
import EmailMess from '../EmailMess';
import {
  deleteEmail,
  EmailActions,
  EmailResponse,
  updateEmailWithQuery,
} from '@api/email';

import { isEmpty } from 'lodash';
import EmailMessEmpty from '../EmailMessEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';
import {
  addDeletedEmail,
  addSpamEmail,
  addUnreadEmail,
  setDeletedEmails,
  setEmailsList,
} from '@redux/Email/reducer';
import ModalBase from '@components/atoms/ModalBase';
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { number } from 'yup';
import { EmailUpdateQuery } from '@api/email/interface';
import EmailMessContainer from '@containers/EmailMessContainer';
import { emailData } from '@layouts/EmailStatusBar';
import useLocalStorage from '@hooks/useLocalStorage';

interface ModalForm {
  title: string;
  content?: ReactNode;
  onSubmit?: () => void;
  onClose?: () => void;
}

const saveEmailList = [
  {
    id: '0',
    title: 'M&A Testa to Metanode',
    sender: new UserInfo(avatarImg, 'Elon Musk', 'elon.musk@tesla.com'),
    sendTo: [
      new UserInfo(avatarImg, 'name', 'mail@gmail.com'),
      new UserInfo('', 'name1', 'mail1@gmail.com'),
      new UserInfo(avatarImg, 'name2', 'mail2@gmail.com'),
    ],
    mailContent: '<p>Test</p><br><br><p>Test line 2</p>',
    attachFiles: [
      {
        name: 'Metanode - White Paper v.1.5.2',
        type: 'pdf',
        url: 'meta.node/9YQC7us',
      },
      {
        name: 'Metanode - SDK Bundle',
        type: 'zip',
        url: 'meta.node/34ED7uc',
      },
    ],
    status: 'pending',
    type: 'receive',
    date: '2018-02-21 12:01:00',
  },
  {
    id: '1',
    title: 'M&A Testa to Metanode',
    sender: new UserInfo(avatarImg, 'Elon Musk', 'elon.musk@tesla.com'),
    sendTo: [
      new UserInfo(avatarImg, 'name', 'mail@gmail.com'),
      new UserInfo('', 'name1', 'mail1@gmail.com'),
      new UserInfo(avatarImg, 'name2', 'mail2@gmail.com'),
    ],
    mailContent: '<p>Test</p><br><br><p>Test line 2</p>',
    attachFiles: [
      {
        name: 'Metanode - White Paper v.1.5.2',
        type: 'pdf',
        url: 'meta.node/9YQC7us',
      },
      {
        name: 'Metanode - SDK Bundle',
        type: 'zip',
        url: 'meta.node/34ED7uc',
      },
    ],
    status: 'sending',
    type: 'send',
    date: '2018-02-21 12:01:00',
  },
  {
    id: '2',
    title: 'M&A Testa to Metanode',
    sender: new UserInfo(avatarImg, 'Elon Musk', 'elon.musk@tesla.com'),
    sendTo: [
      new UserInfo(avatarImg, 'name', 'mail@gmail.com'),
      new UserInfo('', 'name1', 'mail1@gmail.com'),
      new UserInfo(avatarImg, 'name2', 'mail2@gmail.com'),
    ],
    mailContent: '<p>Test</p><br><br><p>Test line 2</p>',
    attachFiles: [
      {
        name: 'Metanode - White Paper v.1.5.2',
        type: 'pdf',
        url: 'meta.node/9YQC7us',
      },
      {
        name: 'Metanode - SDK Bundle',
        type: 'zip',
        url: 'meta.node/34ED7uc',
      },
    ],
    status: 'pending',
    type: 'receive',
    date: '2018-02-21 12:01:00',
  },
  {
    id: '3',
    title: 'M&A Testa to Metanode',
    sender: new UserInfo(avatarImg, 'Elon Musk', 'elon.musk@tesla.com'),
    sendTo: [
      new UserInfo(avatarImg, 'name', 'mail@gmail.com'),
      new UserInfo('', 'name1', 'mail1@gmail.com'),
      new UserInfo(avatarImg, 'name2', 'mail2@gmail.com'),
    ],
    mailContent: '<p>Test</p><br><br><p>Test line 2</p>',
    attachFiles: [
      {
        name: 'Metanode - White Paper v.1.5.2',
        type: 'pdf',
        url: 'meta.node/9YQC7us',
      },
      {
        name: 'Metanode - SDK Bundle',
        type: 'zip',
        url: 'meta.node/34ED7uc',
      },
    ],
    status: 'declined',
    type: 'receive',
    date: '2018-02-21 12:01:00',
  },
];

interface Props {
  pageParams?: { page: number; limit: number };
  onEmailMessIntersecting?: (target: HTMLDivElement, emailId: EmailResponse) => void;
  onUnIntersecting?: (emailId: number) => void;
}

const Email: React.FC<Props> = ({
  pageParams,
  onEmailMessIntersecting,
  onUnIntersecting,
}) => {
  const lastEmailMessRef = useRef<HTMLDivElement>(null);

  const [showHistory, setShowHistory] = useState<number | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalForm>({
    title: 'Modal',
    content: <p>Modal Content</p>,
    onSubmit() {},
    onClose() {
      handleCloseModal();
    },
  });

  // useLocalstorage
  const [CURRENT_ROLE] = useLocalStorage('current_role', '');

  // useSearchParams
  const [searchParams] = useSearchParams();
  const tabSearchParams = searchParams.get('tab');

  const isShowActions = useMemo(() => {
    // Nếu là Admin thì xét tab
    if (CURRENT_ROLE.toLowerCase() === 'admin') {
      // Nếu ở tab all thì ẩn actions
      if (tabSearchParams === 'all') return false;
      // không thì cho hiện
      return true;
    }

    // Không phải admin thì cho show actions
    return true;
  }, [tabSearchParams, CURRENT_ROLE]);

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
          email: params.data,
          send_at: params.data.send_at,
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

  const handleSubmitStatusActions = async (
    index: number,
    toastOnSuccess: string,
    actionType: 'delete' | 'spam' | 'favorite' | 'unread',
  ) => {
    const cloneEmailsList = [...EmailsList];

    const emailId = cloneEmailsList[index].id;

    const res = await EmailActions({
      user_email_id: emailId,
      action: actionType,
    });

    if (res.message === 'success') {
      const deletedEmail = cloneEmailsList.splice(index, 1);

      dispatch(addDeletedEmail(deletedEmail));
      dispatch(setEmailsList(cloneEmailsList));

      handleCloseModal();

      toast.success(toastOnSuccess);
    } else {
      handleCloseModal();
      toast.error('Hệ thống xảy ra lỗi!');
    }
  };

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
        const cloneEmailsList = [...EmailsList];

        const reqData = { ...cloneEmailsList[index], status: status };

        cloneEmailsList.splice(index, 1, reqData);

        console.log('line 154', cloneEmailsList);

        dispatch(setEmailsList(cloneEmailsList));
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
      else setShowHistory(null);
    },
    [showHistory],
  );

  const convertedEmailList = useMemo(() => {
    if (pageParams) return EmailsList.slice(-1 * pageParams.page * pageParams.limit);
    return EmailsList;
  }, [pageParams, EmailsList]);

  const currRole = localStorage.getItem('current_role')?.toUpperCase();
  return (
    <Box className="w-full flex flex-wrap flex-col">
      {isLoading && <EmailMessEmpty isLoading={isLoading} />}
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
            const tags = hashtagsList.map((hashtag) => hashtag.value);
            updateHashtagMutate({ id: email.id, data: { ...email, tags } });
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
    </Box>
  );
};

export default Email;
