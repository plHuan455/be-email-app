import { useTranslation } from '@@packages/localization/src';
import SearchStartWithIcon from '@components/molecules/Search';
import PageCrudData from '@components/organisms/PageCrudData';
import SettingRolesContainer from '@components/organisms/SettingRoleContainer';
import TableManagerDepartmentContainer from '@components/organisms/TableManagerDepartmentContainer';
import Layout from '@layouts/Layout';
import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CreateRoleFormModal, { CreateRoleFields } from '@components/organisms/SettingRoleContainer/CreateRoleFormModal';

const createSettingSchema = yup.object({
  name: yup.string().required(),
}).required();

const SettingRoles = () => {
  const { t } = useTranslation();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const method = useForm<CreateRoleFields>({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(createSettingSchema)
  })

  const handleCloseModal = () => {
    setIsShowModal(false);
    method.reset();
  }
  
  return (
    <Layout.Content>
      <Layout.MainQueryClient
        headTitle={t('User roles')}
        onClickAdd={() => setIsShowModal(true)}>
        <SettingRolesContainer />
        
        <CreateRoleFormModal
          title="Create role"
          method={method}
          isOpen={isShowModal}
          onClose={handleCloseModal}
          onSubmit={(values) => {console.log(values);}}
        />
      </Layout.MainQueryClient>
    </Layout.Content>
  );
};

export default SettingRoles;
