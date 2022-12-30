import { useEditContacts } from './hook/userCreateContactSharingPersonals';
import ContactSharingPersonalsTemplate from './Template';

const EditContactSharingPersonalsContainer = () => {
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
      <ContactSharingPersonalsTemplate
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

export default EditContactSharingPersonalsContainer;
