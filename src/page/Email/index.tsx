import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '@layouts/Layout';
import { useDispatch } from 'react-redux';
import { clearEmailsList } from '@redux/Email/reducer';
import EmailStatusBarContainer from '@containers/EmailStatusBarContainer';

const Email = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearEmailsList());
  }, []);

  return (
    <Layout.Content>
      <Layout.ASide>
        <EmailStatusBarContainer />
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
