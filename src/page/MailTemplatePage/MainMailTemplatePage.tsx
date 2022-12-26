import React, { useState } from 'react';
import Layout from '@layouts/Layout';
import { useTranslation } from '@@packages/localization/src';
import MailTemplateContainer from '@containers/MailTemplateContainer';
import { useNavigate } from 'react-router-dom';

const MainMailTemplatePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Layout.MainQueryClient
      headTitle={t('Signature Management')}
      onClickAdd={() => {
        navigate('/template/add');
      }}>
      <MailTemplateContainer />
    </Layout.MainQueryClient>
  );
};

export default MainMailTemplatePage;
