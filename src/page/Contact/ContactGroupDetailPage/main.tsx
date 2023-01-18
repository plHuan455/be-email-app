import ContactGroupDetailContainer from '@containers/ContactContainer/ContactGroupDetailContainer/main';
import { ContactSharingGroupsType } from '@containers/ContactContainer/ContactSharingGroupsContainer';
import Layout from '@layouts/Layout';
import { useNavigate } from 'react-router-dom';

const fakeAPIData: ContactSharingGroupsType = {
  group_name: 'Test Contact Group Detail',
  id: 1,
  members: [
    {
      avatar: '',
      first_name: 'giang',
      id: 1,
      last_name: 'do',
      mail: 'giang@giang.com',
    },
  ],
  share_by: 'giangz0009@gmail.com',
  share_with: ['giangemployee@notification.trade'],
};

interface ContactGroupsProps {}

const ContactGroupDetailPage: React.FC<ContactGroupsProps> = () => {
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient
      headTitle={fakeAPIData.group_name}
      onComback={() => navigate(-1)}
      //   onClickAdd={() => navigate('add')}
    >
      <ContactGroupDetailContainer data={fakeAPIData} />
    </Layout.MainQueryClient>
  );
};

export default ContactGroupDetailPage;
