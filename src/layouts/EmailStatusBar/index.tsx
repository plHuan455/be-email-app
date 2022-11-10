import EmailStatusHeader from '@components/molecules/EmailStatusHeader';
import { TabItem } from '@layouts/IconTabs';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

type Props = {
  value: any;
  handleChangeTab: any;
  arrayProps: any;
};

interface EmailTabs extends TabItem {
  notiNumber?: number;
}

const emailTabs: EmailTabs[] = [
  {
    title: '#pending',
    notiNumber: 5,
  },
  {
    title: '#approved',
    notiNumber: 2,
  },
  {
    title: '#cancel',
    notiNumber: 0,
  },
];

const MyTabs = styled(Tabs)`
  .MuiTabs-root {
    padding: 19px auto;
  }
  & .MuiTabs-indicator {
    display: none;
  }
  & .MuiButtonBase-root {
    min-width: 100%;
    & .MuiSvgIcon-root {
      position: relative;
      z-index: 1;
    }
    & .MuiTouchRipple-root {
      opacity: 0;
      visibility: hidden;
      transition: 0.4s;
      top: 50%;
      left: 50%;
      bottom: unset;
      right: unset;
      width: 40px;
      height: 40px;
      transform: translate(-50%, -50%);
      border-radius: 8px;
      background: #e9e4ff;
    }
    &.Mui-selected {
      & .MuiTouchRipple-root {
        opacity: 1;
        visibility: visible;
      }
    }
  }
`;

const EmailStatusBar = ({ value, arrayProps, handleChangeTab }: Props) => {
  const renderEmailTab = (title, notiNumber) => {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Typography component={'p'}>{title}</Typography>
        {notiNumber > 0 && <Typography component={'p'}>{notiNumber}</Typography>}
      </Box>
    );
  };

  return (
    <Box sx={{ height: '100%', width: '290px', padding: '24px' }}>
      <EmailStatusHeader
        title="Email"
        color="#827CFF"
        bgButtonColor="#554CFF"
        isComposeButton={true}
        isSearch={true}
      />
      <MyTabs
        orientation="vertical"
        value={value}
        onChange={handleChangeTab}
        aria-label="email status tabs">
        {emailTabs &&
          emailTabs.map((item, index) => {
            return (
              <Tab
                label={renderEmailTab(item.title, item.notiNumber)}
                {...arrayProps(index)}
              />
            );
          })}
      </MyTabs>
    </Box>
  );
};

export default EmailStatusBar;
