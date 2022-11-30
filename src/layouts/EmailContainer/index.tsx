import Email from '@components/organisms/Email';
import EmailCompose from '@components/organisms/EmailCompose';
import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import useEmailCompose from '../../zustand/useEmailCompose';

const EmailContainer = () => {
  const isCompose = useEmailCompose((state) => state.isCompose);

  return (
    <Box
      sx={{
        width: '70%',
        height: '100vh',
        padding: '80px 28px 28px 28px',
        backgroundColor: '#EDEDF3',
        borderTopLeftRadius: '65px',
        overflow: 'scroll',
      }}>
      <Outlet />
      {/* {isCompose ? <EmailCompose /> : <Email />} */}
    </Box>
  );
};

export default EmailContainer;
