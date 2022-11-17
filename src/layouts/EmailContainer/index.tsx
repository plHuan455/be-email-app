import Email from '@components/organisms/Email';
import EmailCompose from '@components/organisms/EmailCompose';
import { Box } from '@mui/material';
import React from 'react';
import useEmailCompose from '../../zustand/useEmailCompose';

const EmailContainer = () => {
  const isCompose = useEmailCompose((state) => state.isCompose);

  return (
    <Box
      sx={{
        width: '70%',
        height: '100vh',
        padding: '28px',
        backgroundColor: '#EDEDF3',
        borderTopLeftRadius: '65px',
        overflow: 'scroll',
      }}>
      {isCompose ? <EmailCompose /> : <Email />}
      {/* <EmailActions /> */}
      {/* <Sender />
  <Email status={'pending'} />
  <Email status={'approved'} />
  <Email status={'sent'} />
  <Email status={'seen'} />
  <Email status={'declined'} />
  <Email status={'sending'} /> */}
    </Box>
  );
};

export default EmailContainer;
