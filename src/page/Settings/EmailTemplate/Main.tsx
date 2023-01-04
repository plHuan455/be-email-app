import React, { useState } from 'react';
import Layout from '@layouts/Layout';
import { useTranslation } from '@@packages/localization/src';
import { useNavigate } from 'react-router-dom';
import { EmailTemplateContainer } from '@containers/SettingsContainer/EmailTemplateContainer';

const EmailTemplatePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Layout.MainQueryClient
      headTitle={t('Email template')}
      onClickAdd={() => {
        navigate('add');
      }}>
      <EmailTemplateContainer />
    </Layout.MainQueryClient>
  );
};

export default EmailTemplatePage;
