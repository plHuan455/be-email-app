import ContactSharingPersonalsContainer from '@containers/ContactContainer/ContactSharingPersonalsContainer';
import Layout from '@layouts/Layout';
import React from 'react';

interface Props {
  headTitle?: string;
}

const ContactSharingPersonalsLayout: React.FC<Props> = ({ headTitle }) => {
  return (
    <Layout.MainQueryClient headTitle={headTitle} onClickAdd={() => {}}>
      <ContactSharingPersonalsContainer />
    </Layout.MainQueryClient>
  );
};

export default ContactSharingPersonalsLayout;
