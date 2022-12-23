import EmailMessEmpty from '@components/organisms/EmailMessEmpty';
import EmailsListActionsContainer from '@containers/EmailsListActionsContainer';
import EmailLayout from '@layouts/EmailLayout';
import InformationBarEmpty from '@layouts/InformationBarEmpty';
import { Box } from '@mui/material';
import React from 'react';

const EmailEmptyContainer = () => {
  return (
    <>
      {/* <Box
        sx={{
          flex: 1,
          height: '100%',
          overflow: 'scroll',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <EmailsListActionsContainer /> */}

      <Box
        sx={{
          flex: 1,
          overflow: 'scroll',
          padding: '120px 28px 28px 28px',
        }}>
        <EmailMessEmpty />
      </Box>
      {/* </Box>
      <InformationBarEmpty
        isLoading={false}
        title="Information"
        isBorderBottom={true}
        sender={1}
      /> */}
    </>
  );
};

export default EmailEmptyContainer;
