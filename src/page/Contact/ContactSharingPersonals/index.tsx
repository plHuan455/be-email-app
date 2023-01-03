import ContactSharingPersonalsContainer from '@containers/ContactContainer/ContactSharingPersonalsContainer';
import Layout from '@layouts/Layout';
import React from 'react';

const ContactSharingPersonalsPage = () => {
  return (
    <Layout.MainQueryClient
      headTitle="Contact Sharing Personal"
      onClickAdd={() => {}}>
      <ContactSharingPersonalsContainer />
    </Layout.MainQueryClient>
  );
};

export default ContactSharingPersonalsPage;
