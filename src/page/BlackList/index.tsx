import Layout from '@layouts/Layout';
import { Outlet } from 'react-router-dom';
import BlackListSubNav from './SubNav';

const BlackListPage = () => {
  return (
    <Layout.Content>
      <Layout.ASide>
        <BlackListSubNav />
      </Layout.ASide>
      <Outlet />
    </Layout.Content>
  );
};

export default BlackListPage;
