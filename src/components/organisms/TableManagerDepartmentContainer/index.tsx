import TableHeader from '@components/molecules/TableManagerHeader';
import React from 'react';
import AddDepartmentModal, { AddDepartmentField } from './AddDepartmentModal';
import TableManagerDepartment from './TableManagerDepartment';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { createDepartment } from '@api/deparment';
import { toast } from 'react-toastify';

interface TableManagerDepartmentContainerProps {
  isShowAddDepartmentModal?: boolean;
  onCloseAddDepartmentModal?: () => void;
}

const createDepartmentSchema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  address: yup.string(),
}).required();

const TableManagerDepartmentContainer: React.FC<TableManagerDepartmentContainerProps> = ({
  isShowAddDepartmentModal, onCloseAddDepartmentModal
}) => {
  const method = useForm<AddDepartmentField>({
    defaultValues: {
      name: '',
      description: '',
      address: ''
    },
    resolver: yupResolver(createDepartmentSchema)
  });

  const { mutate: createDepartmentMutate, isLoading: isCreateDepartmentSubmitting } = useMutation({
    mutationKey: ['table-manager-department-create-department'],
    mutationFn: createDepartment,
    onSuccess: (res) => {
      toast.success('Department is created');
    },
    onError: () => {
      toast.error('Create department failed');
    }
  });

  const handleSubmit = (values: AddDepartmentField) => {
    createDepartmentMutate(values);
  }

  return (
    <div>
      <TableHeader isHaveActions={false} />
      <TableManagerDepartment />
      <AddDepartmentModal 
        method={method}
        isOpen={Boolean(isShowAddDepartmentModal)} 
        isFormLoading={isCreateDepartmentSubmitting}
        title="Create department"
        onSubmit={handleSubmit}
        onClose={() => {
          if(onCloseAddDepartmentModal) onCloseAddDepartmentModal();
          method.reset();
        }}
      />
    </div>
  );
};

export default TableManagerDepartmentContainer;
