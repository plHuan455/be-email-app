import { useTranslation } from '@@packages/localization/src';
import { SignatureContainer } from '@containers/SettingsContainer/SignatureContainer';
import Layout from '@layouts/Layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignaturePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient
      isHaveHeader
      headTitle={t('Signatures')}
      onClickAdd={() => {
        navigate('add');
      }}>
      <SignatureContainer />
    </Layout.MainQueryClient>
  );
};

export default SignaturePage;
