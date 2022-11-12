import { Box } from '@mui/material';
import React, { useCallback, useState } from 'react';
import Email from '..';
import EmailActions from '../EmailActions';

import avatarImg from '@assets/images/avatars/avatar-2.jpg';
import { UserAvatar } from '@components/atoms/OptionalAvatar';
import { File } from '@components/atoms/AttachFiles';

interface Email {
  id: string;
  title: string;
  sendTo: Array<string>;
  mailContent: string;
  attachFiles: Array<File>;
  status: string;
  type: string;
}

const newEmailList: Email[] = [
  {
    id: '0',
    title: 'M&A Testa to Metanode',
    sendTo: [
      'me',
      'billgates@microsoft.com',
      'email1@mail.com',
      'email2@mail.com',
      'email3@mail.com',
      'email4@mail.com',
    ],
    mailContent:
      'Hi,Ingredia, Ingredia Nutrisha,<br> A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture<br><br> Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem.<br><br> Kind Regards<br> Mr Smith',
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
    sendTo: [
      'me',
      'billgates@microsoft.com',
      'email1@mail.com',
      'email2@mail.com',
      'email3@mail.com',
      'email4@mail.com',
    ],
    mailContent:
      'Hi,Ingredia, Ingredia Nutrisha,<br> A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture<br><br> Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem.<br><br> Kind Regards<br> Mr Smith',
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
];

const newSenderData: UserAvatar = {
  avatar: avatarImg,
  name: 'Elon Musk',
  mail: 'elon.musk@tesla.com',
  date: '2018-02-21 12:01:00',
};

const EmailReceive = () => {
  const [showHistory, setShowHistory] = useState<string | null>(null);

  const handleShowHistory = useCallback(
    (currEmail, value) => {
      if (showHistory !== currEmail.id) setShowHistory(value);
      else setShowHistory(null);
    },
    [showHistory],
  );

  return (
    <Box className="flex flex-wrap flex-col">
      <EmailActions />
      {newEmailList.map((email) => (
        <Email
          key={email.id}
          status={email.status}
          type={email.type}
          userInfo={newSenderData}
          emailData={email}
          onShowHistory={handleShowHistory}
          isShowHistory={showHistory === email.id}
        />
      ))}
    </Box>
  );
};

export default EmailReceive;
