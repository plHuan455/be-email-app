import EmailStatusBar from '@layouts/EmailStatusBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EmailMainWrapper from '@layouts/EmailMainWrapper';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import EmailLayout from '@layouts/EmailLayout';
import Layout from '@layouts/Layout';
import { useDispatch } from 'react-redux';
import { clearEmailsList } from '@redux/Email/reducer';

const Email = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearEmailsList());
  }, []);

  return (
    <Layout.Content>
      <Layout.ASide>
        <EmailStatusBar />
      </Layout.ASide>
      <Layout.MainHaveActions isHaveHeader={false}>
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
