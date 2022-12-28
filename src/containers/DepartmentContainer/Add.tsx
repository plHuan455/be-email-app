import React from 'react';
import { useCreateDepartmentManagement } from './hook';
import DepartmentTemplate from './template';

const AddDepartmentContainer = () => {
  const {
    schema,
    department,
    setDepartment,

    handleCancel,
    handleCreate,
  } = useCreateDepartmentManagement();

  return (
    <DepartmentTemplate
      schema={schema}
      formData={department}
      onChange={(formData) => setDepartment(formData)}
      onSubmit={handleCreate}
      onCancel={handleCancel}
      disabledClear
    />
  );
};

export default AddDepartmentContainer;
