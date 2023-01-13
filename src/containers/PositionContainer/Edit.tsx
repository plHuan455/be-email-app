import { useTranslation } from '@@packages/localization/src';
import { deletePositionById } from '@api/deparment';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';
import { useEditPositionManagement } from './hook';
import PositionTemplate from './template';

const EditPositionContainer = () => {
  const { schema, position, setPosition, handleCancel, handleEdit } =
    useEditPositionManagement();

  const { t } = useTranslation();

  const {
    callback,
    description,
    isLoading,
    isOpen,
    isShowAgreeBtn,
    onClose,
    onCloseCallBack,
    setAlertData,
    setIsLoading,
    title,
  } = useAlertDialog();

  const { mutate: mutateDeletePosition } = useMutation({
    mutationKey: ['PositionContainer-delete-position'],
    mutationFn: deletePositionById,
    onSuccess: () => {
      toast.success(t('Delete Successfully'));
    },
  });

  const onDeleteActionClick = (data) => {
    setAlertData(
      '',
      <div>
        <p>Are you sure want to "Delete" this position?</p>
        <p>
          <b>Position Name:</b>
          <span>{data.name}</span>
        </p>
        <p>
          <b>Description:</b>
          <span>{data.describe}</span>
        </p>
      </div>,
      () => {
        mutateDeletePosition(data.id);
        onClose();
      },
    );
  };

  if (position.id === -1) return <div>Loading...</div>;

  return (
    <>
      <PositionTemplate
        schema={schema}
        formData={position}
        onChange={(formData) => setPosition(formData)}
        onSubmit={handleEdit}
        onCancel={handleCancel}
        onClear={() => onDeleteActionClick(position)}
        disabledClear={false}
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

export default EditPositionContainer;
