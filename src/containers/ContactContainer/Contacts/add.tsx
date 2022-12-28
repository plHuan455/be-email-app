import React from 'react';
import { useCreateContacts } from './hook/useCreateContacts';
import ContactTemplate from './Template';

const AddContactsContainer = () => {
  const {
    schema,
    contacts,
    setContacts,
    files,
    setFiles,
    handleCancel,
    handleCreate,
  } = useCreateContacts();

  return (
    <div className="h-full">
      <ContactTemplate
        schema={schema}
        formData={contacts}
        onChange={(formData) => setContacts(formData)}
        files={files}
        onChangeFile={setFiles}
        onSubmit={handleCreate}
        onCancel={handleCancel}
        disabledClear
      />
    </div>
  );
};

export default AddContactsContainer;
