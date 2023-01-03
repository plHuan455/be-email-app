import ContactSharingGroupsContainer from '@containers/ContactContainer/ContactSharingGroupsContainer';
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
  );
};

export default ContactSharingDepartmentsPage;
