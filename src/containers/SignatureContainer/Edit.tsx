import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useEditStoreManagement } from './hook';
import SignatureTemplate from './template';

const UpdateSignContainer = () => {
  const {
    schema,
    signature,
    setSignature,
    files,
    setFiles,
    handleDelete,
    handleEdit,
    handleCancel,
  } = useEditStoreManagement();

  console.log('signature -->', signature);

  // if (signature.id === -1) return <div>Loading...</div>;

  return (
    <SignatureTemplate
      schema={schema}
      formData={signature}
      onChange={(formData) => setSignature(formData)}
      files={files}
      onChangeFile={setFiles}
      onSubmit={handleEdit}
      onCancel={handleCancel}
      onClear={handleDelete}
    />
  );
};

export default UpdateSignContainer;
