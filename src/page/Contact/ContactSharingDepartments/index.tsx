import ContactSharingGroupsContainer from '@containers/ContactContainer/ContactSharingGroupsContainer';
import ContactSharingGroupsLayout from '@layouts/ContactSharingGroups';
import Layout from '@layouts/Layout';
import { useNavigate } from 'react-router-dom';

const ContactSharingDepartmentsPage = () => {
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient
      headTitle="Contact Sharing Department"
      onClickAdd={() => navigate('add')}>
      <ContactSharingGroupsContainer />
    </Layout.MainQueryClient>
    // <>
    //   <ContactSharingGroupsLayout headTitle="Contact Sharing Department" />
    // </>
  );
};

export default ContactSharingDepartmentsPage;
