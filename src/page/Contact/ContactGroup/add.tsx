import AddContactGroupContainer from '@containers/ContactContainer/ContactGroup/add';
import { AddContactGroupLayout } from '@layouts/ContactGroup/add';
import Layout from '@layouts/Layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddContactGroup = () => {
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient
      headTitle="Add Contact Group"
      onComback={() => navigate(-1)}>
      <AddContactGroupContainer />
    </Layout.MainQueryClient>
  );
};

export default AddContactGroup;
