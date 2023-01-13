import React, { useEffect } from 'react';
import { useCreateEmployeeManagement } from './hook';
import EmployeeTemplate from './template';
import * as yup from 'yup';
import { useTranslation } from '@@packages/localization/src';

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

  const { t } = useTranslation();

  const newSchema = yup.object().shape({
    ...schema,
    password: yup.string().required('password is required!'),
    confirmPassword: yup
      .string()
      .required(t('Confirm Password is required'))
      .oneOf([yup.ref('password'), null], t('Confirmation password is not correct')),
  });

  return (
    <EmployeeTemplate
      schema={newSchema}
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
