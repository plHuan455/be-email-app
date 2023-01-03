import EditEmailTemplateContainer from '@containers/EditEmailTemplateContainer';
import Layout from '@layouts/Layout';
import { Box } from '@mui/material';
import { rem } from '@utils/functions';
import React from 'react';

const EditMailTemplatePage = () => {
  return (
    <>
      <Layout.MainQueryClient
          headTitle="Update Email Template"
        >
          <Box sx={{mb: rem(50)}}>
            <EditEmailTemplateContainer />
          </Box>
      </Layout.MainQueryClient>
    </>
  );
};

export default EditMailTemplatePage;
