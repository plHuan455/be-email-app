import React, { useCallback, useMemo } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import logo from '../../assets/images/logo_without_text.png';
import { Box, Tooltip } from '@mui/material';
import Icon, { SVGIconProps } from '@components/atoms/Icon';
import { useLocation, useNavigate } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Department from '@assets/icon/Department';
import ArticleIcon from '@mui/icons-material/Article';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { IS_EMPLOYEE_ROLE } from '@constants/localStore';
import { NavLink } from 'react-router-dom';
import { sideBarRoutes } from '@page/RefactorRoute';

export interface SidebarItem {
  title: string;
  url: string;
  icon: React.ReactElement;
}

const iconSidebarMapping: {
  [key: string]: SVGIconProps['icon'];
} = {
  '/emails': 'email',
  '/contact': 'email',
  '/department': 'email',
  '/setting': 'email',
};

const titleSidebarMapping: {
  [key: string]: string;
} = {
  '/emails': 'Email',
  '/contact': 'Contact',
  '/department': 'Department',
  '/setting': 'Setting',
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
    &.active {
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

export default function MainSidebar() {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();

  // react hooks
  const sideBarItems = useMemo(() => {
    if (sideBarRoutes.length < 1) return [];

    const l = sideBarRoutes.map((i) => {
      if (!i.path) return;

      let path: string = '';
      switch (i.path) {
        case '/contact':
          path = '/contact/contacts';
          break;
        case '/department':
          path = '/department/department';
          break;
        case '/setting':
          path = '/setting/user-role';
          break;

        default:
          path = i.path;
          break;
      }

      const lItem: SidebarItem = {
        title: titleSidebarMapping[i.path],
        icon: <Icon rawColor="#999999" icon={iconSidebarMapping[i.path]} />,
        url: path,
      };
      return lItem;
    });

    return l;
  }, [sideBarRoutes]);

  //functions
  const renderSidebarMenu = useCallback(() => {
    if (!sideBarItems) return [];

    return sideBarItems.map((val, index) => {
      if (!val) return null;
      return (
        <Tooltip title={val.title} placement="right">
          <NavLink to={val.url}>
            <Tab
              className={location.pathname.includes(val.url) ? 'active' : ''}
              key={index}
              icon={val.icon}
              aria-label={val.title}
            />
          </NavLink>
        </Tooltip>
      );
    });
  }, [location]);

  return (
    <MyTabs orientation="vertical" aria-label="icon tabs example">
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
      {renderSidebarMenu()}
    </MyTabs>
  );
}
