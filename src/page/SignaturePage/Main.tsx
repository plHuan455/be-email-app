import { useTranslation } from '@@packages/localization/src';
import { SignatureContainer } from '@containers/SignatureContainer';
import Layout from '@layouts/Layout';
import SignatureLayout from '@layouts/Signature';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignaturePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient
      headTitle={t('Signatures')}
      onClickAdd={() => {
        navigate('add');
      }}>
      <SignatureContainer />
    </Layout.MainQueryClient>
  );
};

export default SignaturePage;
