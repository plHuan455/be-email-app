import ContactGroupLayout from '@layouts/ContactGroup';
import Layout from '@layouts/Layout';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ContactGroupsProps {}

const ContactGroups: React.FC<ContactGroupsProps> = () => {
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient
      headTitle="Contact Groups"
      onClickAdd={() => navigate('add')}>
      <ContactGroupLayout />
    </Layout.MainQueryClient>
  );
};

export default ContactGroups;
