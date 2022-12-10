import EmailStatusBar from '@layouts/EmailStatusBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EmailMainWrapper from '@layouts/EmailMainWrapper';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import EmailLayout from '@layouts/EmailLayout';

const Email = () => {
  return (
    <div className="w-full flex content-around">
      <EmailStatusBar />

      <EmailLayout>
        <Outlet />
      </EmailLayout>
      {/* <EmailMainWrapper /> */}
    </div>
  );
};

export default Email;
