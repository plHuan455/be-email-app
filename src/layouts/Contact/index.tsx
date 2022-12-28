import ContactSidebarContainer from '@containers/ContactSidebarContainer';
import Layout from '@layouts/Layout';
import { Box } from '@mui/system';
import { rem } from '@utils/functions';
import { Outlet, useLocation } from 'react-router-dom';

interface ContactLayoutProps {}

const ContactLayout: React.FC<ContactLayoutProps> = () => {
  const location = useLocation();
  console.log(location);
  return (
    <Layout.Content>
      <Layout.ASide>
        <Box className="l-contactLayout_slideBar">
          <ContactSidebarContainer />
        </Box>
      </Layout.ASide>
      <Outlet />
    </Layout.Content>
  );
};

export default ContactLayout;
