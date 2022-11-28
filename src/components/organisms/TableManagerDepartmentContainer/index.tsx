import TableHeader from '@components/molecules/TableManagerHeader';
import React from 'react';
import AddDepartmentModal, { AddDepartmentField } from './AddDepartmentModal';
import TableManagerDepartment from './TableManagerDepartment';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface TableManagerDepartmentContainerProps {
  isShowAddDepartmentModal?: boolean;
  onCloseAddDepartmentModal?: () => void;
}

const createDepartmentSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  number: yup.number().required(),
  address: yup.string().required(),
}).required();

const TableManagerDepartmentContainer: React.FC<TableManagerDepartmentContainerProps> = ({
  isShowAddDepartmentModal, onCloseAddDepartmentModal
}) => {
  const method = useForm<AddDepartmentField>({
    defaultValues: {
      name: '',
      description: '',
      number: 0,
      address: ''
    },
    resolver: yupResolver(createDepartmentSchema)
  });

  return (
    <div>
      <TableHeader isHaveActions={false} />
      <TableManagerDepartment />
      <AddDepartmentModal 
        method={method}
        isOpen={Boolean(isShowAddDepartmentModal)} 
        title="Create department"
        onSubmit={(values) => {console.log(values);}}
        onClose={() => {
          if(onCloseAddDepartmentModal) onCloseAddDepartmentModal();
          method.reset();
        }}
      />
    </div>
  );
};

export default TableManagerDepartmentContainer;
