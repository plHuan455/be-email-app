import Breadcrumbs from '@components/molecules/Breadcrumbs';
import useBreadcrumbs from '@hooks/useBreadCrumbs';
import Header from '@layouts/Header';
import SideBar from '@layouts/SideBar';
import { Box, Container, Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@redux/configureStore';
import AvatarWithPopup from '@components/atoms/AvatarWithPopup';
import { useAuth } from '@context/AppContext';
import IconTabsManager from '@layouts/IconTabsManager';
import MinimizeEmailList, {
  MinimizeEmailTypes,
} from '@components/templates/MinimizeEmailList';
import { Email } from '@components/organisms/Email/Interface';
import { setHashtags } from '@redux/Email/reducer';
import { fetchToken, onMessageListener } from '../../messaging_init_in_sw';
import { deleteDeviceKey } from '@api/deviceKey';
import { unShiftNotificationList } from '@redux/Notify/reducer';
import { IS_EMPLOYEE_ROLE } from '@constants/localStore';
import { useQuery } from '@tanstack/react-query';
import { getHashtags } from '@api/email';
import useLocalStorage from '@hooks/useLocalStorage';

const sideBarWidth = 75;
const emailStatusWidth = 290;

const useStyles = makeStyles()((theme) => ({
  body: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
  },
  sideBar: {
    display: 'block',
    backgroundColor: theme.palette.background.paper,
    overflowY: 'auto',
    minWidth: 72,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
}));

interface Setting {
  id: number;
  label: string;
  path: string;
  handleClick?: () => void;
}

function MainWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload.data.title,
        body: payload.data.body,
      });
      setShow(true);
      dispatch(unShiftNotificationList(payload.data));
    })
    .catch((err) => console.log('failed', err));

  // Hooks
  const { classes, cx } = useStyles();
  const { breadcrumbs } = useBreadcrumbs();
  const auth = useAuth();
  const navigate = useNavigate();
  // States
  const [openMobileSideBar, setOpenMobileSideBar] = useState(false);

  const toggleMobileSideBar = (value: boolean) => {
    return () => setOpenMobileSideBar(value);
  };

  const handleLogout = useCallback(() => {
    auth.signout(() => {
      deleteDeviceKey();
      localStorage.removeItem('device_key_id');
      localStorage.removeItem('token');
      localStorage.removeItem('device_token');
    });
    toast.success('Bái bai!');
  }, [auth.signout]);

  const handleChangePage = (url: string) => () => {
    navigate(url);
  };

  const settingsEmployee: Setting[] = [
    {
      id: 0,
      label: 'Profile',
      path: '/profile',
      handleClick: handleChangePage('/profile'),
    },
    {
      id: 1,
      label: 'Signature',
      path: '/signature',
      handleClick: handleChangePage('/signature'),
    },
    {
      id: 2,
      label: 'Change Password',
      path: '/change-password',
      handleClick: handleChangePage('/change-password'),
    },
    {
      id: 3,
      label: 'Log out',
      path: '/log-out',
      handleClick: handleLogout,
    },
  ];

  const settingManager: Setting[] = [
    {
      id: 0,
      label: 'Profile',
      path: '/manager/profile',
      handleClick: handleChangePage('/manager/profile'),
    },
    {
      id: 1,
      label: 'Setting',
      path: '/setting',
      handleClick: handleChangePage('/manager/profile'),
    },
    {
      id: 2,
      label: 'Change Password',
      path: '/change-password',
      handleClick: handleChangePage('/manager/change-password'),
    },
    {
      id: 3,
      label: 'Log out',
      path: '/log-out',
      handleClick: handleLogout,
    },
  ];

  const settings: Setting[] = settingManager;

  return (
    <React.Fragment>
      {/* <Header
        toggleIcon={<MenuIcon />}
        onToggleMobileSidebar={toggleMobileSideBar(true)}
      /> */}
      <Box className={cx(classes.body)}>
        <Box className={`${cx(classes.sideBar)} flex flex-col justify-between`}>
          {/* {isInManagerPage ? <IconTabsManager /> : <IconTabs />} */}
          <IconTabsManager />
          <AvatarWithPopup
            popupStyles={{
              '& > .MuiPaper-root': {
                transform: 'translate(0,-100px) !important',
                padding: 0,
                borderRadius: '8px',
                '& > .MuiList-root': {
                  paddingBlock: 1,
                  '& .MuiButtonBase-root': {
                    justifyContent: 'space-between',
                    flex: 1,
                  },
                },
              },
            }}
            className="flex items-center justify-center mb-3"
            settings={settings}
          />
        </Box>
        <Box
          sx={{
            width: '100%',
          }}
          className={cx(classes.content)}>
          {/* Breadcrumbs */}
          {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
          {/* Main content */}
          {children}
        </Box>
      </Box>
      <Drawer
        open={openMobileSideBar}
        onClose={toggleMobileSideBar(false)}
        PaperProps={{ sx: { borderRadius: 0, padding: 0 } }}>
        <Header
          toggleIcon={<CloseIcon />}
          onToggleMobileSidebar={toggleMobileSideBar(false)}
        />
        <SideBar />
      </Drawer>
    </React.Fragment>
  );
}

export default MainWrapper;
