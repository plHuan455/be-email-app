import EmailStatusHeader from '@components/molecules/EmailStatusHeader';
import ModalEmailList, {
  EmailList,
  statusOptions,
} from '@components/molecules/ModalEmailList';
import { TabItem } from '@layouts/IconTabs';
import { Box, ButtonBase, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import avt from '../../../src/assets/images/avatars/avatar-1.jpg';
import React, { useState } from 'react';

type Props = {
  // value: any;
  // handleChangeTab: any;
  // arrayProps: any;
};

interface EmailTabs extends TabItem {
  status: statusOptions;
  notiNumber?: number;
  emailData: EmailList[];
}
interface HashtagTabs {
  title: string;
  value: string;
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

const hashtagTabs: HashtagTabs[] = [
  {
    title: '#metanode',
    value: 'metanode',
  },
  {
    title: '#sales',
    value: 'sales',
  },
  {
    title: '#tesla',
    value: 'tesla',
  },
  {
    title: '#yellow paper',
    value: 'yellowpaper',
  },
];

// const hashtagTabs:

const EmailStatusBar = (props: Props) => {
  const [modalStatus, setmodalStatus] = useState(false);
  const handleChangeModalStatus = (status: boolean) => {
    setmodalStatus(status);
  };

  const renderEmailTab = (
    title: string,
    notiNumber: number,
    emailData: EmailList[],
    status: statusOptions,
  ) => {
    const [modalStatus, setModalStatus] = useState(false);
    return (
      <Box>
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

  const renderHashtagTab = (title, value) => {
    return (
      <ButtonBase
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
    );
  };

  return (
    <Box
      sx={{
        height: '100%',
        minWidth: '290px',
        maxWidth: '290px',
        padding: '24px',
        overflowX: 'hidden',
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
          borderBottom: '1px solid #DBDBDB',
          paddingBottom: '10px',
          position: 'relative',
        }}>
        {emailTabs &&
          emailTabs.map((item) => {
            if (item.title && item.notiNumber != undefined && item.emailData) {
              return renderEmailTab(
                item.title,
                item.notiNumber,
                item.emailData,
                item.status,
              );
            }
          })}
      </Box>
      {hashtagTabs &&
        hashtagTabs.map((item) => {
          return renderHashtagTab(item.title, item.value);
        })}
    </Box>
  );
};

export default EmailStatusBar;
