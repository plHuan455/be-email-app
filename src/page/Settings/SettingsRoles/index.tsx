import { useTranslation } from '@@packages/localization/src';
import SearchStartWithIcon from '@components/molecules/Search';
import PageCrudData from '@components/organisms/PageCrudData';
import SettingRolesContainer from '@components/organisms/SettingRoleContainer';
import TableManagerDepartmentContainer from '@components/organisms/TableManagerDepartmentContainer';
import Layout from '@layouts/Layout';
import React, { useState } from 'react';
import CreateRoleFormModalContainer from '@components/organisms/SettingRoleContainer/CreateRoleFormModalContainer';

const SettingRoles = () => {
  const { t } = useTranslation();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    // <Layout.Content>
    <Layout.MainQueryClient
      isFull={false}
      headTitle={t('User roles')}
      onClickAdd={() => setIsShowModal(true)}>
      <SettingRolesContainer />
      <CreateRoleFormModalContainer
        title="Create role"
        isOpen={isShowModal}
        onClose={handleCloseModal}
      />
    </Layout.MainQueryClient>
    // </Layout.Content>
  );
};

export default SettingRoles;
