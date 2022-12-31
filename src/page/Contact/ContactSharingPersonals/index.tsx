import ContactSharingPersonalsContainer from '@containers/ContactContainer/ContactSharingPersonalsContainer';
import ContactSharingPersonalsLayout from '@layouts/ContactSharingPersonalsLayout';
import Layout from '@layouts/Layout';
import React from 'react';

const ContactSharingPersonalsPage = () => {
  return (
    <Layout.MainQueryClient
      headTitle="Contact Sharing Personal"
      onClickAdd={() => {}}>
      <ContactSharingPersonalsContainer />
    </Layout.MainQueryClient>
    // <>
    //   <ContactSharingPersonalsLayout headTitle="Contact Sharing Personal" />
    // </>
  );
};

export default ContactSharingPersonalsPage;
