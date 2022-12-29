import EditContactSharingGroupContainer from '@containers/ContactContainer/ContactSharingGroupsContainer/edit';
import Layout from '@layouts/Layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  headTitle?: string;
}

const EditContactSharingGroupsLayout: React.FC<Props> = ({ headTitle }) => {
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient onComback={() => navigate(-1)} headTitle={headTitle}>
      <EditContactSharingGroupContainer />
    </Layout.MainQueryClient>
  );
};

export default EditContactSharingGroupsLayout;
