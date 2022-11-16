import EmailStatusHeader from '@components/molecules/EmailStatusHeader';
import ModalEmailList, {
  EmailList,
  StatusOptions,
} from '@components/molecules/ModalEmailList';
import { TabItem } from '@layouts/IconTabs';
import { Avatar, Box, ButtonBase, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import avt from '../../../src/assets/images/avatars/avatar-1.jpg';
import React, { useState } from 'react';
import {
  TitleOfInformationBlock,
  UserName,
} from '@components/molecules/InformationDetailBlock';
import './index.scss';
import { useGetEmail } from '@hooks/Email/useGetEmail';

type Props = {};

interface EmailItem {
  userAvt: string;
  userName: string;
  userEmail: string;
  totalEmail: number;
}

const importantEmail: EmailItem[] = [
  {
    userName: 'Maria Ozawa',
    userAvt: avt,
    userEmail: 'maria.ozawa@jav.com',
    totalEmail: 5,
  },
  {
    userName: 'Michael Owen',
    userAvt: avt,
    userEmail: 'owen.forever12345678@gmail.com',
    totalEmail: 15,
  },
  {
    userName: 'Brian Johnson',
    userAvt: avt,
    userEmail: 'brian.johnson@gmail.com',
    totalEmail: 0,
  },
  {
    userName: 'Elon Musk',
    userAvt: avt,
    userEmail: 'elon.musk@tesla.com',
    totalEmail: 0,
  },
  {
    userName: 'Bill Gates',
    userAvt: avt,
    userEmail: 'billgates@microsoft.com',
    totalEmail: 0,
  },
];

const aproveEmail: EmailItem[] = [
  {
    userName: 'Maria Ozawa',
    userAvt: avt,
    userEmail: 'maria.ozawa@jav.com',
    totalEmail: 1,
  },
  {
    userName: 'Michael Owen',
    userAvt: avt,
    userEmail: 'owen.forever12345678@gmail.com',
    totalEmail: 1,
  },
];

interface EmailTabs extends TabItem {
  status: StatusOptions;
  notiNumber?: number;
  emailData: EmailList[];
}
interface HashtagTabs {
  title: string;
  value: string;
  status: StatusOptions;
  emailData: EmailList[];
}

const emailData: EmailList[] = [
  {
    userId: 1,
    userAvt: avt,
    userName: 'Maria Ohio',
    userEmail: 'maria.ohio@gmailcom',
    title: 'A collection of textile',
    totalEmail: 12,
    sent: 5,
    received: 4,
  },
  {
    userId: 2,
    userAvt: avt,
    userName: 'Maria Ohio',
    userEmail: 'maria.ohio@gmailcom',
    title: 'A collection of textile',
    totalEmail: 12,
  },
  {
    userId: 3,
    userAvt: avt,
    userName: 'Maria Ohio',
    userEmail: 'maria.ohio@gmailcom',
    title: 'A collection of textile',
    totalEmail: 12,
  },
  {
    userId: 4,
    userAvt: avt,
    userName: 'Maria Ohio',
    userEmail: 'maria.ohio@gmailcom',
    title: 'A collection of textile',
    totalEmail: 12,
  },
];

const hashtagTabs: HashtagTabs[] = [
  {
    title: '#metanode',
    value: 'metanode',
    status: 'hashtag',
    emailData: emailData,
  },
  {
    title: '#sales',
    value: 'sales',
    status: 'hashtag',
    emailData: emailData,
  },
  {
    title: '#tesla',
    value: 'tesla',
    status: 'hashtag',
    emailData: emailData,
  },
  {
    title: '#yellow paper',
    value: 'yellowpaper',
    status: 'hashtag',
    emailData: emailData,
  },
];

// const hashtagTabs:

const EmailStatusBar = (props: Props) => {
  const emailTabs: EmailTabs[] = [
    {
      status: 'pending',
      title: '#pending',
      notiNumber: 5,
      emailData: emailData,
    },
    {
      status: 'approved',
      title: '#approved',
      notiNumber: 2,
      emailData: emailData,
    },
    {
      status: 'cancel',
      title: '#cancel',
      notiNumber: 0,
      emailData: emailData,
    },
  ];
  const renderEmailTab = (
    title: string,
    notiNumber: number,
    emailData: EmailList[],
    status: StatusOptions,
    key: number,
  ) => {
    const [modalStatus, setModalStatus] = useState(false);
    const email = useGetEmail('status', status);
    console.log('🚀 ~ file: index.tsx ~ line 183 ~ EmailStatusBar ~ email', email);
    return (
      <Box key={key}>
        <ButtonBase
          onClick={() => setModalStatus(true)}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '5px 10px',
          }}>
          <Typography component={'p'} sx={{ color: '#554CFF', fontWeight: 'bold' }}>
            {title}
          </Typography>
          {notiNumber > 0 && (
            <Typography
              component={'p'}
              sx={{
                backgroundColor: '#ABA8D4',
                width: '14px',
                height: '18px',
                fontSize: '10px',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}>
              {notiNumber}
            </Typography>
          )}
        </ButtonBase>
        <ModalEmailList
          title={title}
          status={status}
          emailData={emailData}
          isActive={modalStatus}
          handleChangeModalStatus={setModalStatus}
        />
      </Box>
    );
  };

  const renderHashtagTab = (
    title: string,
    status: StatusOptions,
    emailData: EmailList[],
    key: number,
  ) => {
    const [modalStatus, setModalStatus] = useState(false);

    return (
      <Box key={key}>
        <ButtonBase
          onClick={() => setModalStatus(true)}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '5px 10px',
          }}>
          <Typography component={'p'} sx={{ color: '#4BAAA2', fontWeight: 'bold' }}>
            {title}
          </Typography>
        </ButtonBase>
        <ModalEmailList
          title={title}
          status={status}
          emailData={emailData}
          isActive={modalStatus}
          handleChangeModalStatus={setModalStatus}
        />
      </Box>
    );
  };

  const renderEmailBlock = (title: string, emailData: EmailItem[]) => {
    return (
      <Box
        className="cover__email__block"
        sx={{ borderBottom: '1px solid #DBDBDB', padding: '20px 0' }}>
        {TitleOfInformationBlock(title, true)}
        {emailData &&
          emailData.map((item, index) => {
            return (
              <Box
                key={index}
                className="email__item"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: '.3s ease-in-out',
                  padding: '0 5px',
                  borderRadius: '8px',
                }}>
                <Box
                  sx={{
                    padding: '10px 0',
                  }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={avt}
                      alt="sender avt"
                      sx={{ width: '35px', height: '35px' }}
                    />
                    <Box sx={{ padding: '0 10px' }}>
                      {UserName('Elon Musk')}
                      <Typography
                        component={'p'}
                        sx={{ fontSize: '10px', color: '#999DA0' }}>
                        elon.musk@tesla.com
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {item.totalEmail && item.totalEmail > 0 ? (
                  <Typography
                    component={'p'}
                    sx={{
                      backgroundColor: '#DADCDD',
                      height: '18px',
                      fontSize: '10px',
                      borderRadius: '3px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 5px',
                      color: '#495057',
                    }}>
                    {item.totalEmail > 9 ? '9+' : item.totalEmail}
                  </Typography>
                ) : (
                  ''
                )}
              </Box>
            );
          })}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        height: '100%',
        minWidth: '290px',
        width: '15%',
        padding: '24px',
        overflowX: 'hidden',
        overflowY: 'scroll',
      }}>
      <EmailStatusHeader
        title="Email"
        color="#827CFF"
        bgButtonColor="#554CFF"
        isComposeButton={true}
        isSearch={true}
      />
      <Box
        sx={{
          paddingBottom: '10px',
          position: 'relative',
        }}>
        <Box sx={{ borderBottom: '1px solid #e5e7eb' }}>
          {emailTabs &&
            emailTabs.map((item, index) => {
              if (item.title && item.notiNumber != undefined && item.emailData) {
                return renderEmailTab(
                  item.title,
                  item.notiNumber,
                  item.emailData,
                  item.status,
                  index,
                );
              }
            })}
        </Box>
        {hashtagTabs &&
          hashtagTabs.map((item, index) => {
            return renderHashtagTab(item.title, item.status, item.emailData, index);
          })}
      </Box>
    </Box>
  );
};

export default EmailStatusBar;
