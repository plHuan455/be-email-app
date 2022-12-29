import ContactSharingGroupsContainer from '@containers/ContactContainer/ContactSharingGroupsContainer';
import Layout from '@layouts/Layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ContactSharingGroupsLayoutProps {
  headTitle?: string;
}

const ContactSharingGroupsLayout: React.FC<ContactSharingGroupsLayoutProps> = ({
  headTitle,
}) => {
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient headTitle={headTitle} onClickAdd={() => navigate('add')}>
      <ContactSharingGroupsContainer />
    </Layout.MainQueryClient>
  );
};

export default ContactSharingGroupsLayout;
