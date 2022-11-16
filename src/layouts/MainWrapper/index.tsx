import Breadcrumbs from '@components/molecules/Breadcrumbs';
import useBreadcrumbs from '@hooks/useBreadCrumbs';
import Header from '@layouts/Header';
import SideBar from '@layouts/SideBar';
import { Box, Container, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@redux/configureStore';
import { getCity } from '@api/location';
import { setLocation } from '@redux/Global/reducer';
import IconTabs from '@layouts/IconTabs';
import EmailStatusBar from '@layouts/EmailStatusBar';
import AvatarWithPopup from '@components/atoms/AvatarWithPopup';

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
}

const settings: Setting[] = [
  {
    id: 0,
    label: 'Profile',
    path: '/profile',
  },
  {
    id: 1,
    label: 'Setting',
    path: '/setting',
  },
  {
    id: 2,
    label: 'Change Password',
    path: '/change-password',
  },
  {
    id: 3,
    label: 'Log out',
    path: '/log-out',
  },
];

function MainWrapper() {
  // Hooks
  const { classes, cx } = useStyles();
  const { breadcrumbs } = useBreadcrumbs();

  // States
  const [openMobileSideBar, setOpenMobileSideBar] = useState(false);

  const toggleMobileSideBar = (value: boolean) => {
    return () => setOpenMobileSideBar(value);
  };

  // const dispatch = useAppDispatch();

  useEffect(() => {
    // getCity()
    //   .then((response) => {
    //     dispatch(setLocation(response.data));
    //   })
    //   .catch((err) =>
    //     toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau ít phút!'),
    //   );
  }, []);

  return (
    <React.Fragment>
      {/* <Header
        toggleIcon={<MenuIcon />}
        onToggleMobileSidebar={toggleMobileSideBar(true)}
      /> */}
      <Box className={cx(classes.body)}>
        <Box className={`${cx(classes.sideBar)} flex flex-col justify-between`}>
          <IconTabs />
          <AvatarWithPopup
            popupStyles={{
              '& > .MuiPaper-root': {
                transform: 'translate(0,-100px) !important',
                padding: 0,
                borderRadius: '8px',
                '& > .MuiList-root': {
                  paddingBlock: 1,
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
    </React.Fragment>
  );
}

export default MainWrapper;
