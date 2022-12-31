import ContactSharingGroupsContainer from '@containers/ContactContainer/ContactSharingGroupsContainer';
import ContactSidebarContainer from '@containers/ContactSidebarContainer';
import Layout from '@layouts/Layout';
import { Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

const ContactPageParent = () => {
  const navigate = useNavigate();

  return (
    <Layout.Content>
      <Layout.ASide>
        <Box className="l-contactLayout_slideBar">
          <ContactSidebarContainer />
        </Box>
      </Layout.ASide>
      <Outlet />
    </Layout.Content>
    // <Layout.MainQueryClient
    //   headTitle="Contact Sharing Groups"
    //   onClickAdd={() => navigate('add')}>
    //   <ContactSharingGroupsContainer />
    // </Layout.MainQueryClient>
    // <>
    //   <ContactSharingGroupsLayout headTitle="Contact Sharing Groups" />
    // </>
  );
};

export default ContactPageParent;
