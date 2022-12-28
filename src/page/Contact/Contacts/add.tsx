import AddContactLayout from '@layouts/Contact/add';
import Layout from '@layouts/Layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddContactsPage = () => {
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient headTitle="Add Contact" onComback={() => navigate(-1)}>
      <AddContactLayout />
    </Layout.MainQueryClient>
  );
};

export default AddContactsPage;
