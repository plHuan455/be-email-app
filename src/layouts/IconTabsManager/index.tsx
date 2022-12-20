import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import logo from '../../assets/images/logo_without_text.png';
import { Box, Tooltip } from '@mui/material';
import Icon, { SVGIconProps } from '@components/atoms/Icon';
import { useNavigate } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Department from '@assets/icon/Department';
import ArticleIcon from '@mui/icons-material/Article';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { IS_EMPLOYEE_ROLE } from '@constants/localStore';

export interface TabItem {
  title?: string;
  url: string;
  logo?: string;
  icon?: React.ReactElement;
}

const TabsDataEmployee: TabItem[] = [
  {
    title: 'Email',
    icon: <Icon icon="email" />,
    url: '/emails',
  },
  {
    title: 'Contact',
    icon: <PermContactCalendarIcon />,
    url: '/contact',
  },
  {
    title: 'Template',
    icon: <ArticleIcon />,
    url: '/emails',
  },
];

const TabsDataManager: TabItem[] = [
  {
    title: 'Email',
    icon: <Icon icon="email" />,
    url: '/emails',
  },
  {
    title: 'Contact',
    icon: <PermContactCalendarIcon />,
    url: '/contact',
  },
  {
    title: 'Department',
    icon: <Department />,
    url: '/manager/department',
  },
  {
    title: 'Template',
    icon: <ArticleIcon />,
    url: '/emails',
  },
];

const TabsData: TabItem[] = IS_EMPLOYEE_ROLE ? TabsDataEmployee : TabsDataManager;

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
        fill: #7061e2;
        & path {
          fill: #7061e2;
        }
      }
      & .MuiTouchRipple-root {
        opacity: 1;
        visibility: visible;
      }
    }
  }
`;

export default function IconTabsManager() {
  const [value, setValue] = React.useState(1);

  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // navigate(TabsData[newValue - 1].url || '/');
  };

  const renderTabsData = () => {
    if (!TabsData) return [];

    return TabsData.map((val, index) => {
      return (
        <Tooltip title={val.title} placement="right">
          <Tab
            key={index}
            icon={val.icon}
            aria-label={val.title}
            onClick={() => navigate(val.url)}
          />
        </Tooltip>
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
          cursor: 'pointer',
        }}>
        <Box component={'img'} src={logo} alt="logo" onClick={() => navigate('/')} />
      </Box>
      {renderTabsData()}
    </MyTabs>
  );
}
