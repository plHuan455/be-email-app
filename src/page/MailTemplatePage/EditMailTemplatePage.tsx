import EditEmailTemplateContainer from '@containers/EditEmailTemplateContainer';
import Layout from '@layouts/Layout';
import React from 'react';

const EditMailTemplatePage = () => {
  return (
    <>
      <Layout.MainQueryClient
          headTitle="Update Email Template"
        >
          <EditEmailTemplateContainer />
      </Layout.MainQueryClient>
    </>
  );
};

export default EditMailTemplatePage;
