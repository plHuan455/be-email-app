import EditContactSharingPersonalsContainer from '@containers/ContactContainer/ContactSharingPersonalsContainer/edit';
import Layout from '@layouts/Layout';
import { useNavigate } from 'react-router-dom';

interface ContactPageProps {}

const EditContactSharingPersonalsPage: React.FC<ContactPageProps> = () => {
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient
      onComback={() => navigate(-1)}
      headTitle="Edit Contact Sharing Department">
      <EditContactSharingPersonalsContainer />
    </Layout.MainQueryClient>
  );
};

export default EditContactSharingPersonalsPage;
