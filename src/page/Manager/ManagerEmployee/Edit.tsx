import { useTranslation } from '@@packages/localization/src';
import { EditEmployeeContainer } from '@containers/EmployeeContainer';
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
      <EditEmployeeContainer />
    </Layout.MainQueryClient>
  );
};

export default EditEmployeePage;
