import { useTranslation } from '@@packages/localization/src';
import UserBlacklistContainer from '@containers/BlacklistContainer/UserBlackListContainer';
import Layout from '@layouts/Layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlackListUserPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return <UserBlacklistContainer />;
};

export default BlackListUserPage;
