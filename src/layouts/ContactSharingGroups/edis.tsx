import EditContactSharingGroupContainer from '@containers/ContactContainer/ContactSharingGroupsContainer/edit';
import Layout from '@layouts/Layout';
import React from 'react';

interface Props {
  headTitle?: string;
}

const EditContactSharingGroupsLayout: React.FC<Props> = ({ headTitle }) => {
  return (
    <Layout.MainQueryClient headTitle={headTitle}>
      <EditContactSharingGroupContainer />
    </Layout.MainQueryClient>
  );
};

export default EditContactSharingGroupsLayout;
