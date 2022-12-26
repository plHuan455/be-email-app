import EmailStatusBar from '@layouts/EmailStatusBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EmailMainWrapper from '@layouts/EmailMainWrapper';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from '@layouts/Layout';
import SettingLeftContainer from '@containers/SettingLeftSideBarContainer';

const Manager = () => {
  return (
    <Layout.Content>
      <Layout.ASide>
        <SettingLeftContainer />
      </Layout.ASide>
      <Outlet />
    </Layout.Content>
  );
};

export default Manager;
