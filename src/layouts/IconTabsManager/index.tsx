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
import { RenderButtonIcon } from '@components/molecules/EmailActions';
import { RouteObject, useLocation, useNavigate } from 'react-router-dom';
import ManagerAccount from '@assets/icon/ManagerAccount';
import Department from '@assets/icon/Department';

export interface TabItem {
  title?: string;
  url?: string;
  logo?: string;
  icon?: React.ReactElement;
}

const TabsData: TabItem[] = [
  {
    logo: logo,
    url: '/',
  },
  {
    title: 'Department',
    icon: <Department />,
    url: '/manager/department',
  },
  {
    title: 'Settings',
    icon: <ManagerAccount />,
    url: '/manager/setting',
  },
];

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
    & .MuiSvgIcon-root,
    & svg {
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
      & svg {
        color: #7061e2;
      }
      & .MuiTouchRipple-root {
        opacity: 1;
        visibility: visible;
      }
    }
  }
`;

export default function IconTabsManager() {
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(TabsData[newValue - 1].url || '/');
  };

  const renderTabsData = () => {
    if (!TabsData) return [];

    return TabsData.map((val, index) => {
      return <Tab key={index} icon={val.icon} aria-label={val.title} />;
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
          cursor: 'pointer',
        }}>
        <Box component={'img'} src={logo} alt="logo" onClick={() => navigate('/')} />
      </Box>
      {renderTabsData()}
    </MyTabs>
  );
}
