import { useTranslation } from '@@packages/localization/src';
import Layout from '@layouts/Layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlackListSystemPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient
      headTitle={t('System Blacklist')}
      isHaveHeader
      onClickAdd={() => {}}>
      {/* <DepartmentContainer /> */}
    </Layout.MainQueryClient>
  );
};

export default BlackListSystemPage;
