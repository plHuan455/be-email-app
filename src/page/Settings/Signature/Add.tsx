import { AddSignatureContainer } from '@containers/SettingsContainer/SignatureContainer';
import React from 'react';
import Layout from '@layouts/Layout';
import { useTranslation } from '@@packages/localization/src';

const AddSignaturePage = () => {
  const { t } = useTranslation();

  return (
    <Layout.MainQueryClient isHaveHeader headTitle={t('Signatures - Add')}>
      <AddSignatureContainer />
    </Layout.MainQueryClient>
  );
};

export default AddSignaturePage;
