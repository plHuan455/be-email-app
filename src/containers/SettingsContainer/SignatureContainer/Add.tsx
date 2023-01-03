import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useCreateSignManagement } from './hook';
import SignatureTemplate from './template';

const CreateSignContainer = () => {
  const {
    schema,
    signature,
    setSignature,
    files,
    setFiles,
    handleCancel,
    handleCreate,
  } = useCreateSignManagement();

  return (
    <SignatureTemplate
      schema={schema}
      formData={signature}
      onChange={(formData) => setSignature(formData)}
      files={files}
      onChangeFile={setFiles}
      onSubmit={handleCreate}
      onCancel={handleCancel}
      disabledClear
    />
  );
};

export default CreateSignContainer;
