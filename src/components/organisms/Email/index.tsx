import { Box, Button } from '@mui/material';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';

import avatarImg from '@assets/images/avatars/avatar-2.jpg';
import { Email, UserInfo } from './Interface';
import EmailMess from '../EmailMess';
import { getAllEmail } from '@api/email';

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

const Email = () => {
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
  // const [newEmailList, setNewEmailList] = useState<Email[]>([]);

  const { EmailsList, deletedEmailsList } = useSelector(
    (state: RootState) => state.email,
  );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // (async () => {
  //   //   const res = await getAllEmail();
  //   //   console.log('Test res in line ~ 121 ~ file Email.tsx', res.data);
  //   // }
  //   // )();
  //   setNewEmailList(EmailsList);
  // }, []);

  useEffect(() => {
    if (!isEmpty(EmailsList) && !showHistory) setShowHistory(EmailsList[0].id);
  }, [EmailsList]);

  const checkIsReceiveEmail = useCallback(
    (id) => {
      return (
        EmailsList.find((mail) => mail.id === id)?.from !==
        localStorage.getItem('current_email')
      );
    },
    [EmailsList],
  );

  const changeEmailStatus = useCallback(
    (status, index) => {
      if (status === 'delete' || status === 'spam' || status === 'unread') {
        if (status === 'delete') {
          setModal((prevState) => ({
            ...prevState,
            title: 'Bạn có chắc muốn xóa Email này chứ?',
            content: (
              <p>Nếu bấm có, Email này sẽ bị xóa khỏi danh sách email của bạn.</p>
            ),
            onSubmit() {
              const cloneEmailsList = [...EmailsList];

              const deletedEmail = cloneEmailsList.splice(index, 1);

              dispatch(addDeletedEmail(deletedEmail));
              dispatch(setEmailsList(cloneEmailsList));

              handleCloseModal();
            },
          }));
          setIsOpenModal(true);
        }
        if (status === 'spam') {
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
        }
        if (status === 'unread') {
          setModal((prevState) => ({
            ...prevState,
            title: 'Bạn có chắc muốn bỏ qua Email này chứ?',
            content: (
              <p>Nếu bấm có, Email này sẽ được thêm vào danh sách xem sau.</p>
            ),
            onSubmit() {
              const cloneEmailsList = [...EmailsList];

              const unreadEmail = cloneEmailsList.splice(index, 1);

              dispatch(addUnreadEmail(unreadEmail));
              dispatch(setEmailsList(cloneEmailsList));

              handleCloseModal();
            },
          }));
          setIsOpenModal(true);
        }
      } else {
        const cloneEmailsList = [...EmailsList];

        const reqData = { ...cloneEmailsList[index], status: status };

        cloneEmailsList.splice(index, 1, reqData);

        console.log('line 154', cloneEmailsList);

        dispatch(setEmailsList(cloneEmailsList));
      }
      // cloneEmailsList[index].status = 'status';
      // dispatch(setEmailsList(cloneEmailsList));
      // setNewEmailList((preState) => {
      //   preState[index].status = status;
      //   return [...preState];
      // });
    },
    [EmailsList],
  );

  console.log(`line 221`, EmailsList);

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

  // console.log(`line 162`, newEmailList);

  return (
    <Box className="flex flex-wrap flex-col">
      {isEmpty(EmailsList) ? (
        <EmailMessEmpty />
      ) : (
        EmailsList.map((email, index) => (
          <EmailMess
            key={email.id}
            status={email.status}
            type={checkIsReceiveEmail(email.id) ? 'receive' : 'send'}
            userInfo={new UserInfo('', email.writer_name, email.from)}
            emailData={email}
            onShowHistory={handleShowHistory}
            isShowHeader={showHistory === email.id}
            isShowActions={checkIsReceiveEmail(email.id)}
            onChangeStatus={changeEmailStatus}
            index={index}
          />
        ))
      )}
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
