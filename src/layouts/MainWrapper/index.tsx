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

const headerHeight = 80;

const useStyles = makeStyles()((theme) => ({
  body: {
    display: 'flex',
    height: '100%',
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
      <Box className={cx(classes.body)}>
        <Box className={cx(classes.sideBar)}>
          <SideBar />
        </Box>
        <Container className={cx(classes.content)}>
          {/* Breadcrumbs */}
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          {/* Main content */}
          <Outlet />
        </Container>
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
