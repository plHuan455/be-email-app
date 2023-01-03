import { useTranslation } from '@@packages/localization/src';
import { AddEmployeeContainer } from '@containers/EmployeeContainer';
import Layout from '@layouts/Layout';
import React from 'react';

const AddEmployeePage = () => {
  const { t } = useTranslation();

  return (
    <Layout.MainQueryClient isHaveHeader headTitle={t('Employee / Add')}>
      <AddEmployeeContainer />
    </Layout.MainQueryClient>
  );
};

export default AddEmployeePage;
