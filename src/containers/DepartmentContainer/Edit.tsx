import React from 'react';
import { useEditDepartmentManagement } from './hook';
import DepartmentTemplate from './template';

const EditDepartmentContainer = () => {
  const {
    schema,
    department,
    setDepartment,

    handleDelete,
    handleEdit,
    handleCancel,
  } = useEditDepartmentManagement();

  if (department.id === -1) return <div>Loading...</div>;

  return (
    <DepartmentTemplate
      schema={schema}
      formData={department}
      onChange={(formData) => setDepartment(formData)}
      onSubmit={handleEdit}
      onCancel={handleCancel}
      onClear={handleDelete}
    />
  );
};

export default EditDepartmentContainer;
