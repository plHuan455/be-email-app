import ContactSharingGroupsLayout from '@layouts/ContactSharingGroups';
import Layout from '@layouts/Layout';
import { useNavigate } from 'react-router-dom';

interface ContactSharingProps {}

const ContactSharing: React.FC<ContactSharingProps> = () => {
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient
      headTitle="Contact Sharing"
      onClickAdd={() => navigate('add')}>
      <ContactSharingGroupsLayout />
    </Layout.MainQueryClient>
  );
};

export default ContactSharing;
