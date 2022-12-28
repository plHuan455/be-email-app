import React from 'react';
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
      />
    </div>
  );
};

export default AddContactGroupContainer;
