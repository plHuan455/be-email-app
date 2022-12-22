import Email from '@components/organisms/Email';
import EmailsListActionsContainer from '@containers/EmailsListActionsContainer';
import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import useEmailCompose from '../../zustand/useEmailCompose';

const EmailContainer = () => {
  const isCompose = useEmailCompose((state) => state.isCompose);

  return (
    <Box
      sx={{
        flex: 1,
        height: '100vh',
        backgroundColor: '#EDEDF3',
        borderTopLeftRadius: '65px',
        overflow: 'scroll',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <EmailsListActionsContainer />

      <Box
        sx={{
          flex: 1,
          overflow: 'scroll',
          padding: '120px 28px 28px 28px',
        }}>
        <Email />
      </Box>
      {/* {isCompose ? <EmailCompose /> : <Email />} */}
    </Box>
  );
};

export default EmailContainer;
