import { subMenuSetting } from '@constants/subMenus';
import SubSidebar from '@components/organisms/SubSidebar';
import Layout from '@layouts/Layout';
import { Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

const SettingPage = () => {
  const navigate = useNavigate();

  return (
    <Layout.Content>
      <Layout.ASide>
        <Box className="l-contactLayout_slideBar">
          <SubSidebar menus={subMenuSetting} title="Settings" />
        </Box>
      </Layout.ASide>
      <Outlet />
    </Layout.Content>
  );
};

export default SettingPage;
