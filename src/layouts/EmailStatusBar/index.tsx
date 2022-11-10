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

interface hashtag {
  title: string;
  value: string;
}

const hashtagTabs: hashtag[] = [
  {
    title: 'metanode',
    value: 'metanode',
  },
  {
    title: 'sales',
    value: 'sales',
  },
  {
    title: 'tesla',
    value: 'tesla',
  },
  {
    title: 'yellow paper',
    value: 'yellowpaper',
  },
];

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

const tabData = [emailTabs, hashtagTabs];

const MyTabs = styled(Tabs)`
  .MuiTabs-root {
    padding: 19px auto;
  }
  & .MuiTabs-indicator {
    display: none;
  }
  & .MuiBox-root {
    width: 100%;
    justify-content: space-between;
  }
  & .MuiButtonBase-root {
    min-width: 100%;
    border-radius: 8px;
    padding: 0 10px;
    min-height: 32px;
    flex-direction: row;

    & p {
      font-weight: bold;
      color: #554cff;
    }
    & .MuiSvgIcon-root {
      position: relative;
      z-index: 1;
    }
    &.Mui-selected {
      background-color: #e4e2ff;
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
            }}>
            {notiNumber}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{ height: '100%', minWidth: '290px', maxWidth: '290px', padding: '24px' }}>
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
        {tabData &&
          tabData.map((item) => {
            return (
              <Box>
                {item.map((ele, index) => {
                  console.log('ele', ele);
                  return (
                    <Tab
                      label={renderEmailTab(ele.title, ele.notiNumber)}
                      {...arrayProps(index)}
                    />
                  );
                })}
              </Box>
            );
          })}
      </MyTabs>
    </Box>
  );
};

export default EmailStatusBar;
