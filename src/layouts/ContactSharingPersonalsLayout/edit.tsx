import EditContactSharingGroupContainer from '@containers/ContactContainer/ContactSharingGroupsContainer/edit';
import EditContactSharingPersonalsContainer from '@containers/ContactContainer/ContactSharingPersonalsContainer/edit';
import Layout from '@layouts/Layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  headTitle?: string;
}

const EditContactSharingPersonalsLayout: React.FC<Props> = ({ headTitle }) => {
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient onComback={() => navigate(-1)} headTitle={headTitle}>
      <EditContactSharingPersonalsContainer />
    </Layout.MainQueryClient>
  );
};

export default EditContactSharingPersonalsLayout;
