import { contactDummy } from '@assets/dummyData/contactDummy';
import { RootState } from '@redux/configureStore';
import { setContactsList } from '@redux/Contact/reducer';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEditContacts } from './hook/useCreateContactGroup';
import ContactTemplate from './Template';

const EditContactGroupContainer = () => {
  const {
    schema,
    contactGroup,
    setContactGroup,
    files,
    setFiles,
    handleCancel,
    handleEdit,
  } = useEditContacts();

  // if (signature.id === -1) return <div>Loading...</div>;

  return (
    <div className="h-full">
      <ContactTemplate
        schema={schema}
        formData={contactGroup}
        onChange={(formData) => setContactGroup(formData)}
        files={files}
        onChangeFile={setFiles}
        onSubmit={handleEdit}
        onCancel={handleCancel}
        disabledClear

        contactList={contactDummy}
      />
    </div>
  );
};

export default EditContactGroupContainer;
