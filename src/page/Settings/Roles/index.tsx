import { useTranslation } from '@@packages/localization/src';
import SettingRolesContainer from '@containers/SettingsContainer/SettingRoleContainer';
import CreateRoleFormModalContainer from '@containers/SettingsContainer/SettingRoleContainer/CreateRoleFormModalContainer';
import Layout from '@layouts/Layout';
import { useState } from 'react';

const SettingRoles = () => {
  const { t } = useTranslation();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    // <Layout.Content>
    <Layout.MainQueryClient
      isHaveHeader
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
