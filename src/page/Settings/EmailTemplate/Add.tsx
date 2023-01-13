import AddEmailTemplateContainer from '@containers/SettingsContainer/EmailTemplateContainer/Add';
import Layout from '@layouts/Layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmailTemplatePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Layout.MainQueryClient
        headTitle="Add Email Template"
        onComback={() => {
          navigate(-1);
        }}>
        <AddEmailTemplateContainer />
      </Layout.MainQueryClient>
    </>
  );
};

export default AddEmailTemplatePage;
