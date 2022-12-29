import ContactSharingGroupsLayout from '@layouts/ContactSharingGroups';
import Layout from '@layouts/Layout';

interface ContactPageProps {}

const ContactSharingDepartmentsPage: React.FC<ContactPageProps> = () => {
  return (
    <>
      <ContactSharingGroupsLayout headTitle="Contact Sharing Department" />
    </>
  );
};

export default ContactSharingDepartmentsPage;
