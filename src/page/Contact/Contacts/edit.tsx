import EditContactContainer from '@containers/ContactContainer/Contacts/edit';
import AddContactLayout from '@layouts/Contact/add';
import EditContactLayout from '@layouts/Contact/edit';
import Layout from '@layouts/Layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditContactPage = () => {
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient headTitle="Edit Contact" onComback={() => navigate(-1)}>
      <EditContactContainer />
    </Layout.MainQueryClient>
  );
};

export default EditContactPage;
