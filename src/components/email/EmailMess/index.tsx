import { Box } from '@mui/material';
import React, { useCallback, useState } from 'react';
import avatarImg from '@assets/images/avatars/avatar-2.jpg';
import { UserInfo } from '@components/atoms/OptionalAvatar';
import { ReceiverData } from '@components/atoms/AutoCompleteReceive';
import Email, { AttachFile } from '..';

export interface Email {
  id: string;
  title: string;
  sender: UserInfo;
  sendTo: Array<ReceiverData>;
  mailContent: string;
  attachFiles: AttachFile[];
  status: string;
  type: string;
}

const EmailMess = () => {
  const [showHistory, setShowHistory] = useState<string | null>(null);
  const [newEmailList, setNewEmailList] = useState<Email[]>([
    {
      id: '0',
      title: 'M&A Testa to Metanode',
      sender: {
        avatar: avatarImg,
        name: 'Elon Musk',
        mail: 'elon.musk@tesla.com',
        date: '2018-02-21 12:01:00',
      },
      sendTo: [
        { avatar: avatarImg, mail: 'giangz0009@gmail.com', abbreviations: 'GI' },
        { avatar: '', mail: 'mail1@gmail.com', abbreviations: 'T2' },
        { avatar: avatarImg, mail: 'mail2@gmail.com', abbreviations: 'T3' },
      ],
      mailContent:
        '{"blocks":[{"key":"67ic5","text":"asdasdasdasdasdasd","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":9,"length":9,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"8mieu","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"82c34","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"frjqt","text":"😛👼","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
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
    },
    {
      id: '1',
      title: 'M&A Testa to Metanode',
      sender: {
        avatar: avatarImg,
        name: 'Elon Musk',
        mail: 'elon.musk@tesla.com',
        date: '2018-02-21 12:01:00',
      },
      sendTo: [
        { avatar: avatarImg, mail: 'giangz0009@gmail.com', abbreviations: 'GI' },
        { avatar: '', mail: 'mail1@gmail.com', abbreviations: 'T2' },
        { avatar: avatarImg, mail: 'mail2@gmail.com', abbreviations: 'T3' },
      ],
      mailContent:
        '{"blocks":[{"key":"67ic5","text":"asdasdasdasdasdasd","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":9,"length":9,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"8mieu","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"82c34","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"frjqt","text":"😛👼","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
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
    },
    {
      id: '2',
      title: 'M&A Testa to Metanode',
      sender: {
        avatar: avatarImg,
        name: 'Elon Musk',
        mail: 'elon.musk@tesla.com',
        date: '2018-02-21 12:01:00',
      },
      sendTo: [
        { avatar: avatarImg, mail: 'giangz0009@gmail.com', abbreviations: 'GI' },
        { avatar: '', mail: 'mail1@gmail.com', abbreviations: 'T2' },
        { avatar: avatarImg, mail: 'mail2@gmail.com', abbreviations: 'T3' },
      ],
      mailContent:
        '{"blocks":[{"key":"67ic5","text":"asdasdasdasdasdasd","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":9,"length":9,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"8mieu","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"82c34","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"frjqt","text":"😛👼","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
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
    },
  ]);

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
        <Email
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

export default EmailMess;
