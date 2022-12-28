import ContactSharingLayout from '@layouts/ContactSharing';
import Layout from '@layouts/Layout';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ContactSharingProps {}

const ContactSharing: React.FC<ContactSharingProps> = () => {
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient
      headTitle="Contact Sharing"
      onClickAdd={() => navigate('add')}>
      <ContactSharingLayout />
    </Layout.MainQueryClient>
  );
};

export default ContactSharing;
