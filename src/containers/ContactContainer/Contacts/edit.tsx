import { RootState } from '@redux/configureStore';
import { setContactsList } from '@redux/Contact/reducer';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useCreateContacts, useEditContacts } from './hook/useCreateContacts';
import ContactTemplate from './Template';

const EditContactContainer = () => {
  const {
    schema,
    contacts,
    setContacts,
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
        formData={contacts}
        onChange={(formData) => setContacts(formData)}
        files={files}
        onChangeFile={setFiles}
        onSubmit={handleEdit}
        onCancel={handleCancel}
        disabledClear
      />
    </div>
  );
};

export default EditContactContainer;
