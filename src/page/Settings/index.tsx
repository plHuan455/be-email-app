import { subMenuSettingManager, subMenuSettingUser } from '@constants/subMenus';
import SubSidebar from '@components/organisms/SubSidebar';
import Layout from '@layouts/Layout';
import { Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import useLocalStorage from '@hooks/useLocalStorage';

const SettingPage = () => {
  const [getCurrRole] = useLocalStorage('current_role', '');

  return (
    <Layout.Content>
      <Layout.ASide>
        <Box className="l-contactLayout_slideBar">
          <SubSidebar
            menus={
              getCurrRole.toLowerCase() === 'employee'
                ? subMenuSettingUser
                : subMenuSettingManager
            }
            title="Settings"
          />
        </Box>
      </Layout.ASide>
      <Outlet />
    </Layout.Content>
  );
};

export default SettingPage;
