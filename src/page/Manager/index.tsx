import EmailStatusBar from '@layouts/EmailStatusBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EmailMainWrapper from '@layouts/EmailMainWrapper';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from '@layouts/Layout';

const Manager = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const [show, setShow] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ title: string; body: string }>({
    title: '',
    body: '',
  });
  const [isTokenFound, setTokenFound] = useState<boolean>(false);
  const [getFcmToken, setFcmToken] = useState<string>('');

  return (
    <Layout.Content>
      {/* <Box
        sx={{
          flex: 1,
          height: '100vh',
          padding: '40px 28px 28px 28px',
          backgroundColor: '#EDEDF3',
          borderTopLeftRadius: '65px',
          overflow: 'scroll',
        }}> */}
      <Outlet />
      {/* </Box> */}
    </Layout.Content>
  );
};

export default Manager;
