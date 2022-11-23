import { useTranslation } from '@@packages/localization/src';
import SearchStartWithIcon from '@components/molecules/Search';
import PageCrudData from '@components/organisms/PageCrudData';
import SettingRolesContainer from '@components/organisms/SettingRoleContainer';
import TableManagerDepartmentContainer from '@components/organisms/TableManagerDepartmentContainer';
import Layout from '@layouts/Layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SettingRoles = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Layout.Content>
      <Layout.MainQueryClient
        headTitle={t('User roles')}
        onClickAdd={() => navigate('add')}>
        <SettingRolesContainer />
      </Layout.MainQueryClient>
    </Layout.Content>
  );
};

export default SettingRoles;
