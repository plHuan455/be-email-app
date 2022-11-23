import { Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

import avatarImg from '@assets/images/avatars/avatar-2.jpg';
import { Email, UserInfo } from './Interface';
import EmailMess from '../EmailMess';
import { getAllEmail } from '@api/email';

const Email = () => {
  const [showHistory, setShowHistory] = useState<string | null>(null);
  const [newEmailList, setNewEmailList] = useState<Email[]>([
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
  ]);

  useEffect(() => {
    (async () => {
      const res = await getAllEmail();
      console.log('Test res in line ~ 121 ~ file Email.tsx', res.data);
    })();
  }, []);

  const checkIsReceiveEmail = useCallback(
    (id) => {
      return newEmailList.find((mail) => mail.id === id)?.type === 'receive';
    },
    [newEmailList],
  );

  const changeEmailStatus = useCallback((status, index) => {
    setNewEmailList((preState) => {
      preState[index].status = status;
      return [...preState];
    });
  }, []);

  const handleShowHistory = useCallback(
    (currEmail, value) => {
      if (showHistory !== currEmail.id) setShowHistory(value);
      else setShowHistory(null);
    },
    [showHistory],
  );

  return (
    <Box className="flex flex-wrap flex-col">
      {newEmailList.map((email, index) => (
        <EmailMess
          key={email.id}
          status={email.status}
          type={email.type}
          userInfo={email.sender}
          emailData={email}
          onShowHistory={handleShowHistory}
          isShowHeader={showHistory === email.id}
          isShowActions={checkIsReceiveEmail(email.id)}
          onChangeStatus={changeEmailStatus}
          index={index}
        />
      ))}
    </Box>
  );
};

export default Email;
