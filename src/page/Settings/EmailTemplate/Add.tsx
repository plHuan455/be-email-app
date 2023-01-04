import AddEmailTemplateContainer from '@containers/SettingsContainer/EmailTemplateContainer/Add';
import Layout from '@layouts/Layout';
import React from 'react';

const AddEmailTemplatePage = () => {
  return (
    <>
      <Layout.MainQueryClient
        headTitle="Add Email Template"
      >
        <AddEmailTemplateContainer />
      </Layout.MainQueryClient>
    </>)
};

export default AddEmailTemplatePage;
