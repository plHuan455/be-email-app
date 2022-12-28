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
