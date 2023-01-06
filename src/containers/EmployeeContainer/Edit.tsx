import React from 'react';
import { useEditEmployeeManagement } from './hook';
import EmployeeTemplate from './template';
import * as yup from 'yup';

const EditEmployeeContainer = () => {
  const {
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
const schema = yup.object().shape({
  first_name: yup.string().required('first_name is required!'),
  last_name: yup.string().required('last_name is required!'),
  identity: yup.string().required('identity is required!'),
  email: yup.string().required('email is required!'),
  position: yup.string().required('position is required!'),
  phone_number: yup.number().required('phone_number is required!'),
  role_id: yup.string().required('role_id is required!'),
  // department_id: yup.string().required('role_id is required!'),
});

export default EditEmployeeContainer;
