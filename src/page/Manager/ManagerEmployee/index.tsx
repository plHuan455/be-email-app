import { useTranslation } from '@@packages/localization/src';
import SearchStartWithIcon from '@components/molecules/Search';
import PageCrudData from '@components/organisms/PageCrudData';
import TableManagerEmployeeContainer from '@components/organisms/TableManagerEmployeeContainer';
import Layout from '@layouts/Layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ManagerEmployee = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Layout.MainQueryClient
      headTitle={t('Employee')}
      onClickAdd={() => navigate('add')}>
      <div className="px-6 flex flex-col flex-1 overflow-hidden">
        <SearchStartWithIcon />
        <TableManagerEmployeeContainer />
      </div>
    </Layout.MainQueryClient>
  );
};

export default ManagerEmployee;
