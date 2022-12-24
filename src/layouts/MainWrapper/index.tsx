import Breadcrumbs from '@components/molecules/Breadcrumbs';
import useBreadcrumbs from '@hooks/useBreadCrumbs';
import Header from '@layouts/Header';
import SideBar from '@layouts/SideBar';
import { Box, Container, Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useMemo, useState } from 'react';
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
import {
  removeMinimizeEmail,
  resetEmailState,
  setHashtags,
  setShowMinimizeEmail,
} from '@redux/Email/reducer';
import { fetchToken, onMessageListener } from '../../messaging_init_in_sw';
import { deleteDeviceKey } from '@api/deviceKey';
import { unShiftNotificationList } from '@redux/Notify/reducer';
import { IS_EMPLOYEE_ROLE } from '@constants/localStore';
import { useQuery } from '@tanstack/react-query';
import { getHashtags } from '@api/email';

const sideBarWidth = 75;
const emailStatusWidth = 290;

const DEVICE_KEY_ID: number = JSON.parse(
  localStorage.getItem('device_key_id') || '0',
);

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

function MainWrapper() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const minimizeEmails = useAppSelector((state) => state.email.minimizeMailList);
  const showMinimizeEmailId = useAppSelector(
    (state) => state.email.showMinimizeEmailId,
  );

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });

  // GET HASHTAGS
  console.log(`[TODO]: Change this when hashtag api is done`);
  const { data: hashtagData, isLoading: isHashtagLoading } = useQuery({
    queryKey: ['email-compose-get-hashtag'],
    queryFn: getHashtags,
    onSuccess(res) {
      if (res?.data) {
        dispatch(
          setHashtags(
            res.data.map((value) => ({
              notiNumber: 0,
              status: 'hashtag',
              title: value.name,
              value: value.name,
            })),
          ),
        );
      }
    },
  });

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    auth.signout(() => {
      toast.success('Bái bai!');
    });
    deleteDeviceKey(DEVICE_KEY_ID);
  };

  const handleChangePage = (url: string) => () => {
    navigate(url);
  };

  const handleMaximizeEmailClick = (data: MinimizeEmailTypes) => {
    dispatch(setShowMinimizeEmail(data.id));
    navigate('/emails/compose');
  };
  const handleCloseEmailClick = (data: MinimizeEmailTypes) => {
    if (data.id !== undefined) {
      dispatch(removeMinimizeEmail(data.id));
    }
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

  const convertedMinimizeEmailList = useMemo(() => {
    return minimizeEmails.filter((value) => value.id !== showMinimizeEmailId);
  }, [minimizeEmails, showMinimizeEmailId]);

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
          <Outlet />
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
      <MinimizeEmailList
        data={convertedMinimizeEmailList}
        onMaximizeClick={handleMaximizeEmailClick}
        onCloseClick={handleCloseEmailClick}
      />
    </React.Fragment>
  );
}

export default MainWrapper;
