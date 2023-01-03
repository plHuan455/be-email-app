import { useTranslation } from '@@packages/localization/src';
import { EditDepartmentContainer } from '@containers/DepartmentContainer';
import Layout from '@layouts/Layout';
import React from 'react';

const EditDepartmentPage = () => {
  const { t } = useTranslation();

  return (
    <Layout.MainQueryClient isHaveHeader headTitle={t('Department / Edit')}>
      <EditDepartmentContainer />
    </Layout.MainQueryClient>
  );
};

export default EditDepartmentPage;
