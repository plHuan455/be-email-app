import ModalBase from '@components/atoms/ModalBase';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { string } from 'yup';

export interface AddPositionField {
  name: string;
}

interface AddPositionModalProps {
  method: UseFormReturn<AddPositionField>;
  isFormLoading: boolean;
  isOpen: boolean;
  title: string;
  onSubmit: () => {};
  onCancel: () => {};
}

const AddPositionModal: React.FC<AddPositionModalProps> = ({
  method,
  isFormLoading,
  isOpen,
  title,
  onSubmit,
  onCancel,
}) => {
  return <ModalBase isOpen={true} title=""></ModalBase>;
};

export default AddPositionModal;
