import { ContactResponse } from '@api/contact/interface';
import { contactDummy } from '@assets/dummyData/contactDummy';
import { AutoCompleteGroupValueTypes } from '@components/molecules/AutoCompleteGroup';
import { Contact } from '@redux/Contact/interface';
import React, { useState } from 'react';
import { useCreateContactGroup } from './hook/useCreateContactGroup';
import ContactGroupTemplate from './Template';

const AddContactGroupContainer = () => {
  const {
    schema,
    contactGroup,
    setContactGroup,
    files,
    setFiles,
    handleCancel,
    handleCreate,
  } = useCreateContactGroup();

  // TODO: call api to get contact list
  const contactListData = contactDummy;

  const [isOpenSelectContactModal, setIsOpenSelectContactModal] = useState<boolean>(false);
  const [selectingContactList, setSelectingContactList] = useState<number[]>([]);

  const handleSelectContactModalConfirmClick = () => {
    const selectedContactGroup: AutoCompleteGroupValueTypes[] = 
      contactListData
      .filter(value => selectingContactList.includes(value.id))
      .map(value => ({
        isGroup: false,
        name: `${value.first_name} ${value.last_name}`,
        data: [],
      }))
    setContactGroup({...contactGroup, members: selectedContactGroup})
    setIsOpenSelectContactModal(false)
  }
  const handleSelectContactModalClose = () => {
    setIsOpenSelectContactModal(false);
    setSelectingContactList([...contactGroup.members])
  }

  return (
    <div className="h-full">
      <ContactGroupTemplate
        schema={schema}
        formData={contactGroup}
        onChange={(formData) => setContactGroup(formData)}
        files={files}
        onChangeFile={setFiles}
        onSubmit={handleCreate}
        onCancel={handleCancel}
        disabledClear


        contactList={contactDummy}
        selectingContactList={selectingContactList}
        isOpenSelectContactModal={isOpenSelectContactModal}
        onMemberFieldFocus={() => setIsOpenSelectContactModal(true)}
        onSelectContactModalClose={handleSelectContactModalClose}
        onSelectingContactListChange={values => setSelectingContactList(values) }
        onSelectContactModalConfirmClick={handleSelectContactModalConfirmClick}
      />
    </div>
  );
};

export default AddContactGroupContainer;
