import SubSidebar from '@components/organisms/SubSidebar';
import { subMenuDepartment } from '@constants/subMenus';
import Layout from '@layouts/Layout';
import { Outlet } from 'react-router-dom';

const Manager = () => {
  return (
    <Layout.Content>
      <Layout.ASide>
        <SubSidebar menus={subMenuDepartment} title="Department" />
      </Layout.ASide>
      <Outlet />
    </Layout.Content>
  );
};

export default Manager;
