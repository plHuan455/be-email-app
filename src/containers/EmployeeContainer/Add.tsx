import React, { useEffect } from 'react';
import { useCreateEmployeeManagement } from './hook';
import EmployeeTemplate from './template';

const AddEmployeeContainer = () => {
  const {
    schema,
    employee,
    setEmployee,
    handleCancel,
    handleCreate,
    files,
    setFiles,
  } = useCreateEmployeeManagement();

  return (
    <EmployeeTemplate
      schema={schema}
      formData={employee}
      onChange={(formData) => setEmployee(formData)}
      files={files}
      onChangeFile={setFiles}
      onSubmit={handleCreate}
      onCancel={handleCancel}
      disabledClear
    />
  );
};

export default AddEmployeeContainer;
