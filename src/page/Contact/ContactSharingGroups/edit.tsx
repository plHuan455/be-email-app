import EditContactSharingGroupContainer from '@containers/ContactContainer/ContactSharingGroupsContainer/edit';
import EditContactSharingGroupsLayout from '@layouts/ContactSharingGroups/edit';
import Layout from '@layouts/Layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditContactSharingGroupsPage = () => {
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient
      onComback={() => navigate(-1)}
      headTitle="Edit Sharing Contact">
      <EditContactSharingGroupContainer />
    </Layout.MainQueryClient>
    // <>
    //   <EditContactSharingGroupsLayout headTitle="Edit Sharing Contact" />
    // </>
  );
};

export default EditContactSharingGroupsPage;
