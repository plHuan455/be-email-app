import { useTranslation } from '@@packages/localization/src';
import SearchStartWithIcon from '@components/molecules/Search';
import PageCrudData from '@components/organisms/PageCrudData';
import TableManagerDepartmentContainer from '@components/organisms/TableManagerDepartmentContainer';
import Layout from '@layouts/Layout';
import React, { useState } from 'react';

const ManagerDepartment = () => {
  const { t } = useTranslation();
  const [isShowAddDepartmentModal, setIsAddDepartmentModal] =
    useState<boolean>(false);

  return (
    <Layout.MainQueryClient
      headTitle={t('Department')}
      onClickAdd={() => {
        setIsAddDepartmentModal(true);
      }}>
      <TableManagerDepartmentContainer
        isShowAddDepartmentModal={isShowAddDepartmentModal}
        onCloseAddDepartmentModal={() => setIsAddDepartmentModal(false)}
      />
    </Layout.MainQueryClient>
  );
};

export default ManagerDepartment;
