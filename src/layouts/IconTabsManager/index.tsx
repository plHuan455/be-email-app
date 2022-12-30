import React, { useMemo } from 'react';
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
import { NavLink } from 'react-router-dom';

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
  // {
  //   title: 'Sign Test',
  //   icon: <ArticleIcon />,
  //   url: '/sign',
  // },
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

  const listTabManager = useMemo(() => {
    const userRole = localStorage.getItem('current_role');
    const department_id = localStorage.getItem('department_id');

    let departmentRoute = `/manager/department/${department_id}/employee`;
    if (userRole === 'admin') {
      departmentRoute = '/manager/department';
    }
    const arr: TabItem[] = [
      {
        title: 'Email',
        icon: <Icon rawColor="#999999" icon="email" />,
        url: '/emails',
      },
      {
        title: 'Contact',
        icon: (
          <PermContactCalendarIcon
            sx={{
              color: '#999999',
            }}
          />
        ),
        url: '/contact',
      },
      {
        title: 'Department',
        icon: <Department color="#999999" />,
        url: departmentRoute,
      },
      {
        title: 'Template',
        icon: (
          <ArticleIcon
            sx={{
              color: '#999999',
            }}
          />
        ),
        url: '/template',
      },
      {
        title: 'Blacklist',
        icon: (
          <PermContactCalendarIcon
            sx={{
              color: '#999999',
            }}
          />
        ),
        url: '/black-list/user',
      },
    ];

    return arr;
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
    // navigate(TabsData[newValue - 1].url || '/');
  };

  const renderTabsData = () => {
    if (!listTabManager) return [];

    return listTabManager.map((val, index) => {
      return (
        <Tooltip title={val.title} placement="right">
          <NavLink to={val.url}>
            {({ isActive }) => {
              if (isActive) setValue(index + 1);

              return (
                <Tab
                  className={`${isActive && 'Mui-selected'}`}
                  key={index}
                  icon={val.icon}
                  aria-label={val.title}
                  // onClick={() => navigate(val.url)}
                />
              );
            }}
          </NavLink>
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
