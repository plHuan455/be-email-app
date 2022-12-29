import EditContactSharingGroupsLayout from '@layouts/ContactSharingGroups/edit';
import EditContactSharingPersonalsLayout from '@layouts/ContactSharingPersonalsLayout/edit';
import Layout from '@layouts/Layout';

interface ContactPageProps {}

const EditContactSharingPersonalsPage: React.FC<ContactPageProps> = () => {
  return (
    <>
      <EditContactSharingPersonalsLayout headTitle="Edit Contact Sharing Department" />
    </>
  );
};

export default EditContactSharingPersonalsPage;
