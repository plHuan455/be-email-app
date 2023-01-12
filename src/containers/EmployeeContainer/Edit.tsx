import React from 'react';
import { useEditEmployeeManagement } from './hook';
import EmployeeTemplate from './template';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { deleteUser, UserProfileResponse } from '@api/user';
import { toast } from 'react-toastify';
import { useTranslation } from '@@packages/localization/src';
import { useNavigate } from 'react-router-dom';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';

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

  const { t } = useTranslation();

  const navigate = useNavigate();

  const {
    isLoading,
    callback,
    description,
    isOpen,
    isShowAgreeBtn,
    onClose,
    onCloseCallBack,
    setAlertData,
    setIsLoading,
    title,
  } = useAlertDialog();

  const { mutate: mutateDeleteUser } = useMutation({
    mutationKey: ['EmployeeContainer-delete-user'],
    mutationFn: deleteUser,
    onSuccess: () => {
      onClose();
      toast.success(t('Delete Successfully!'));
      navigate(-1);
    },
  });

  const handleOnDeleteClick = (data: any) => {
    setAlertData(
      '',
      <div>
        <p>Are you sure want to "Delete" this user?</p>
        <p>
          <b>First Name:</b>
          <span>{data.first_name}</span>
        </p>
        <p>
          <b>Last Name:</b>
          <span>{data.last_name}</span>
        </p>
      </div>,
      () => {
        mutateDeleteUser(data.id);
      },
    );
  };

  if (employee.id === -1) return <div>Loading...</div>;

  return (
    <>
      <EmployeeTemplate
        schema={schema}
        formData={employee}
        onChange={(formData) => setEmployee(formData)}
        files={files}
        onChangeFile={setFiles}
        onSubmit={handleEdit}
        onCancel={handleCancel}
        onClear={() => handleOnDeleteClick(employee)}
        editMode
      />
      <AlertDialog
        descriptionLabel={description}
        isOpen={isOpen}
        onClose={onClose}
        titleLabel={title}
        isLoading={isLoading}
        onAgree={callback}
        onDisagree={onClose}
      />
    </>
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
