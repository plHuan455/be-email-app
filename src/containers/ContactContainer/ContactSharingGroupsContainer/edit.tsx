import { useEditContactSharingGroups } from './hook/useCreateContactSharingGroups';
import ContactSharingGroupsTemplate from './Template';

const EditContactSharingGroupContainer = () => {
  const {
    schema,
    contactGroup,
    setContactGroup,
    files,
    setFiles,
    handleCancel,
    handleEdit,
  } = useEditContactSharingGroups();

  // if (signature.id === -1) return <div>Loading...</div>;

  return (
    <div className="h-full">
      <ContactSharingGroupsTemplate
        schema={schema}
        formData={contactGroup}
        onChange={(formData) => setContactGroup(formData)}
        files={files}
        onChangeFile={setFiles}
        onSubmit={handleEdit}
        onCancel={handleCancel}
        disabledClear
      />
    </div>
  );
};

export default EditContactSharingGroupContainer;
