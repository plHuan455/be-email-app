import { useTranslation } from '@@packages/localization/src';
import { AddDepartmentContainer } from '@containers/DepartmentContainer';
import Layout from '@layouts/Layout';
import React from 'react';

const AddDepartmentPage = () => {
  const { t } = useTranslation();

  return (
    <Layout.MainQueryClient isHaveHeader headTitle={t('Signatures - Add')}>
      <AddDepartmentContainer />
    </Layout.MainQueryClient>
  );
};

export default AddDepartmentPage;
