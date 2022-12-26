import { AddSignatureContainer } from '@containers/SignatureContainer';
import React from 'react';
import Layout from '@layouts/Layout';
import { useTranslation } from '@@packages/localization/src';

const EditSignaturePage = () => {
  const { t } = useTranslation();

  return (
    <Layout.MainQueryClient headTitle={t('Signatures - Update')}>
      <AddSignatureContainer />
    </Layout.MainQueryClient>
  );
};

export default EditSignaturePage;
