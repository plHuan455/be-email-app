import EmailStatusBar from '@layouts/EmailStatusBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EmailMainWrapper from '@layouts/EmailMainWrapper';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import EmailLayout from '@layouts/EmailLayout';
import Layout from '@layouts/Layout';

const Email = () => {
  return (
    <Layout.Content>
      <Layout.ASide>
        <EmailStatusBar />
      </Layout.ASide>
      <Layout.MainHaveActions>
        <Outlet />
      </Layout.MainHaveActions>
    </Layout.Content>
    // <div className="w-full flex content-around">
    //   <EmailStatusBar />

    //   <EmailLayout>
    //     <Outlet />
    //   </EmailLayout>
    //   {/* <EmailMainWrapper /> */}
    // </div>
  );
};

export default Email;
