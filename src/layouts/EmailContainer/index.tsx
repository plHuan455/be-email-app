import Email from '@components/organisms/Email';
import EmailCompose from '@components/organisms/EmailCompose';
import { Box } from '@mui/material';
import React from 'react';
import useEmail from '../../zustand/useEmail';

const EmailContainer = () => {
  const isCompose = useEmail((state) => state.isCompose);

  return (
    <Box
      sx={{
        width: '70%',
        height: '100vh',
        padding: '88px 28px 28px 28px',
        backgroundColor: '#EDEDF3',
        borderTopLeftRadius: '65px',
        overflow: 'scroll',
      }}>
      {isCompose ? <EmailCompose /> : <Email />}
    </Box>
  );
};

export default EmailContainer;
