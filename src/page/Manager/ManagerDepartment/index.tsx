import { useTranslation } from '@@packages/localization/src';
import SearchStartWithIcon from '@components/molecules/Search';
import PageCrudData from '@components/organisms/PageCrudData';
import TableManagerDepartmentContainer from '@components/organisms/TableManagerDepartmentContainer';
import Layout from '@layouts/Layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ManagerDepartment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Layout.Content>
      <Layout.MainQueryClient
        headTitle={t('Employee')}
        onClickAdd={() => navigate('add')}>
        <TableManagerDepartmentContainer />
      </Layout.MainQueryClient>
    </Layout.Content>
  );
};

export default ManagerDepartment;
