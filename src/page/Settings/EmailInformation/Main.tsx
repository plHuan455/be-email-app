import React, { useState } from 'react';
import Layout from '@layouts/Layout';
import { useTranslation } from '@@packages/localization/src';
import { useNavigate } from 'react-router-dom';
import EmailInformationContainer from '@containers/SettingsContainer/EmailInformationContainer';

const EmailInformationPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Layout.MainQueryClient
      headTitle={t('Email Information')}
      onClickAdd={() => {
        navigate('add');
      }}>
      <EmailInformationContainer />
    </Layout.MainQueryClient>
  );
};

export default EmailInformationPage;
