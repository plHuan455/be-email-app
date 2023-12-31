import EditContactGroupContainer from '@containers/ContactContainer/ContactGroup/edit';

import Layout from '@layouts/Layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditContactGroupPage = () => {
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient
      headTitle="Edit Contact Group"
      onComback={() => navigate(-1)}>
      <EditContactGroupContainer />
    </Layout.MainQueryClient>
  );
};

export default EditContactGroupPage;
