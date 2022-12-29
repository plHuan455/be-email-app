import ContactSharingGroupsLayout from '@layouts/ContactSharingGroups';
import Layout from '@layouts/Layout';

interface ContactPageProps {}

const ContactSharingGroupPage: React.FC<ContactPageProps> = () => {
  return (
    <>
      <ContactSharingGroupsLayout headTitle="Contact Sharing Group" />
    </>
  );
};

export default ContactSharingGroupPage;
