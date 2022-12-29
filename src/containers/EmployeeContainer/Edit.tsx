import React from 'react';
import { useEditEmployeeManagement } from './hook';
import EmployeeTemplate from './template';

const EditEmployeeContainer = () => {
  const {
    schema,
    employee,
    setEmployee,
    files,
    setFiles,
    handleDelete,
    handleEdit,
    handleCancel,
  } = useEditEmployeeManagement();

  if (employee.id === -1) return <div>Loading...</div>;

  return (
    <EmployeeTemplate
      schema={schema}
      formData={employee}
      onChange={(formData) => setEmployee(formData)}
      files={files}
      onChangeFile={setFiles}
      onSubmit={handleEdit}
      onCancel={handleCancel}
      onClear={handleDelete}
      editMode
    />
  );
};

export default EditEmployeeContainer;
