import ContactGroupDetail from '@components/organisms/ContactGroupDetail';
import React from 'react';
import { ContactSharingGroupsType } from '../ContactSharingGroupsContainer';

interface Props {
  data: ContactSharingGroupsType;
}

const ContactGroupDetailContainer: React.FC<Props> = ({ data }) => {
  return <ContactGroupDetail data={data} />;
};

export default ContactGroupDetailContainer;
