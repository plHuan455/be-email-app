import ContactSharingGroupsContainer from '@containers/ContactContainer/ContactSharingGroupsContainer';
import Layout from '@layouts/Layout';
import { useNavigate } from 'react-router-dom';

const ContactSharingGroupsPage = () => {
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient
      headTitle="Contact Sharing Groups"
      onClickAdd={() => navigate('add')}>
      <ContactSharingGroupsContainer />
    </Layout.MainQueryClient>
  );
};

export default ContactSharingGroupsPage;
