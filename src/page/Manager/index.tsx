import SubSidebar from '@components/organisms/SubSidebar';
import { subMenuDepartment, subMenuDepartmentManager } from '@constants/subMenus';
import useLocalStorage from '@hooks/useLocalStorage';
import Layout from '@layouts/Layout';
import { Outlet } from 'react-router-dom';

const Manager = () => {
  const [currentRole] = useLocalStorage('current_role', '');

  return (
    <Layout.Content>
      <Layout.ASide>
        <SubSidebar
          menus={
            currentRole.toLowerCase() === 'employee'
              ? subMenuDepartment
              : subMenuDepartment
          }
          title="Department"
        />
      </Layout.ASide>
      <Outlet />
    </Layout.Content>
  );
};

export default Manager;
