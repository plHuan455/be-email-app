import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
// import EmailIcon from '@mui/icons-material/Email';
// import ChatIcon from '@mui/icons-material/Chat';
// import PeopleIcon from '@mui/icons-material/People';
// import DialpadIcon from '@mui/icons-material/Dialpad';
// import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import logo from '../../assets/images/logo_without_text.png';
import { Box } from '@mui/material';
import { SVGIconProps } from '@components/atoms/Icon';
import { sideBarRouter } from '@page/MainRoute';
import { RenderButtonIcon } from '@components/molecules/EmailActions';

export interface TabItem {
  title?: string;
  url?: string;
  logo?: string;
  icon?: React.ReactElement;
}

// const TabsData: TabItem[] = [
//   {
//     logo: logo,
//     url: '/',
//   },
//   {
//     title: 'Email',
//     icon: <EmailIcon />,
//   },
//   {
//     title: 'Chats',
//     icon: <ChatIcon />,
//   },
//   {
//     title: 'Contact',
//     icon: <PeopleIcon />,
//   },
//   {
//     title: 'Call',
//     icon: <DialpadIcon />,
//   },
//   {
//     title: 'Book Mark',
//     icon: <DonutSmallIcon />,
//   },
// ];

const iconsList: {
  [key: string]: SVGIconProps['icon'];
} = {
  '/emails': 'email',
  '/chats': 'chat',
  '/contact': 'people',
  '/call': 'dialpad',
  '/bookmark': 'donut',
};

const MyTabs = styled(Tabs)`
  .MuiTabs-root {
    padding: 19px auto;
  }
  & .MuiTabs-indicator {
    display: none;
  }
  & .MuiButtonBase-root {
    padding-block: 24px;
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

export default function IconTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderTabsData = () => {
    if (!sideBarRouter) return [];

    return sideBarRouter.map((val, index) => {
      return (
        <Tab
          key={index}
          icon={
            <RenderButtonIcon
              item={val.path ? iconsList[val.path] : 'approved'}
              color="#7061E2"
            />
          }
          aria-label={val.path ? String(val.path.split('/').pop()).capitalize() : ''}
        />
      );
    });
  };

  return (
    <MyTabs
      value={value}
      orientation="vertical"
      onChange={handleChange}
      aria-label="icon tabs example">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 0',
        }}>
        <Box component={'img'} src={logo} alt="logo" />
      </Box>
      {renderTabsData()}
    </MyTabs>
  );
}
