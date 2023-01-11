import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useCreateDepartmentManagement } from './hook';
import DepartmentTemplate from './template';

interface OutletContextType {
  compId: number;
}

const AddDepartmentContainer = () => {
  const {
    schema,
    department,
    setDepartment,

    handleCancel,
    handleCreate,
  } = useCreateDepartmentManagement();

  const { compId } = useOutletContext<OutletContextType>();

  const queryClient = useQueryClient();

  const { mutate: createDepartmentMutation } = useMutation({
    mutationKey: ['create-department-container'],
    mutationFn: handleCreate,
    onSuccess: () => {
      console.log('created');
      queryClient.invalidateQueries({
        queryKey: ['manager-get-departments'],
      });
    },
  });

  useEffect(() => {
    setDepartment({ ...department, company_id: compId });
  }, [compId]);

  return (
    <DepartmentTemplate
      schema={schema}
      formData={department}
      onChange={(formData) => setDepartment(formData)}
      onSubmit={createDepartmentMutation}
      onCancel={handleCancel}
      disabledClear
    />
  );
};

export default AddDepartmentContainer;
