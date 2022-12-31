import AddEmailTemplateContainer from '@containers/AddEmailTemplateContainer';
import React from 'react';
import Layout from '@layouts/Layout';

const AddMailTemplatePage = () => {
  return (
    <>
      <Layout.MainQueryClient
        headTitle="Add Email Template"
      >
        <AddEmailTemplateContainer />
      </Layout.MainQueryClient>
    </>
  );
};

export default AddMailTemplatePage;
