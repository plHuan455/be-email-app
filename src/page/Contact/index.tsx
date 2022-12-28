import ContactContainer from '@containers/ContactContainer';
import ContactSharingGroupsLayout from '@layouts/ContactSharingGroups';
import Layout from '@layouts/Layout';
import { useNavigate } from 'react-router-dom';

interface ContactPageProps {}

const ContactSharingGroupPage: React.FC<ContactPageProps> = () => {
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient headTitle="Contacts" onClickAdd={() => navigate('add')}>
      <ContactSharingGroupsLayout />
    </Layout.MainQueryClient>
  );
};

export default ContactSharingGroupPage;
