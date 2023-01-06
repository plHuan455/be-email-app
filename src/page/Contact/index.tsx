import { subMenuContact } from '@constants/subMenus';
import SubSidebar from '@components/organisms/SubSidebar';
import Layout from '@layouts/Layout';
import { Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import ContactSharingGroupsContainer from '@containers/ContactContainer/ContactSharingGroupsContainer';

const ContactPageParent = () => {
  const navigate = useNavigate();

  return (
    <Layout.Content>
      <Layout.ASide>
        <Box className="l-contactLayout_slideBar">
          <SubSidebar menus={subMenuContact} title="Contact" />
        </Box>
      </Layout.ASide>
      <Outlet />
      {/* <ContactSharingGroupsContainer /> */}
    </Layout.Content>
  );
};

export default ContactPageParent;
