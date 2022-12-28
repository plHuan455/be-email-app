import ContactsContainer from '@containers/ContactContainer/Contacts';
import Layout from '@layouts/Layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContactsPage = () => {
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient headTitle="Contacts" onClickAdd={() => navigate('add')}>
      <ContactsContainer />
    </Layout.MainQueryClient>
  );
};

export default ContactsPage;
