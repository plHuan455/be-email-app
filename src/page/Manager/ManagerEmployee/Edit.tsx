import { useTranslation } from '@@packages/localization/src';
import { EditPositionContainer } from '@containers/PositionContainer';
import Layout from '@layouts/Layout';
import React, { useEffect } from 'react';

const EditEmployeePage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log('mounting ...');

    return () => {};
  }, []);

  return (
    <Layout.MainQueryClient isHaveHeader headTitle={t('Employee / Edit')}>
      <EditPositionContainer />
    </Layout.MainQueryClient>
  );
};

export default EditEmployeePage;
