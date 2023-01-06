import { useTranslation } from '@@packages/localization/src';
import { AddPositionContainer } from '@containers/PositionContainer';
import Layout from '@layouts/Layout';
import React, { useEffect } from 'react';

const EditPositionPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log('mounting ...');

    return () => {};
  }, []);

  return (
    <Layout.MainQueryClient isHaveHeader headTitle={t('Position / Edit')}>
      <AddPositionContainer />
    </Layout.MainQueryClient>
  );
};

export default EditPositionPage;
