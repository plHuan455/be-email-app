import { EditEmailTemplateContainer } from '@containers/SettingsContainer/EmailTemplateContainer';
import Layout from '@layouts/Layout';
import { Box } from '@mui/material';
import { rem } from '@utils/functions';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditEmailTemplatePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Layout.MainQueryClient
        headTitle="Update Email Template"
        onComback={() => {
          navigate(-1);
        }}>
        <Box sx={{ mb: rem(50) }}>
          <EditEmailTemplateContainer />
        </Box>
      </Layout.MainQueryClient>
    </>
  );
};

export default EditEmailTemplatePage;
