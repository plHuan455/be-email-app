import { Box } from '@mui/material';
import React from 'react';

interface Props extends React.PropsWithChildren {}

const EmailLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        flex: 1,
        height: '100vh',
        backgroundColor: '#EDEDF3',
        borderTopLeftRadius: '65px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
      }}>
      {children}
    </Box>
  );
};

export default EmailLayout;
