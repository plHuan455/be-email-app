import { useTranslation } from '@@packages/localization/src';
import { DepartmentResponse } from '@api/deparment/interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateDepartmentManagement } from './hook';
import DepartmentTemplate from './template';

interface OutletContextType {
  departmentQueryData: AxiosResponse<DepartmentResponse[], any> | undefined;
}

const AddDepartmentContainer = () => {
  const {
    schema,
    department,
    setDepartment,

    handleCancel,
    handleCreate,
  } = useCreateDepartmentManagement();

  const { departmentQueryData } = useOutletContext<OutletContextType>();

  const compId = useMemo(() => {
    if (!isEmpty(departmentQueryData)) return departmentQueryData.data[0].company_id;
    return 0;
  }, [departmentQueryData]);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const { mutate: createDepartmentMutation } = useMutation({
    mutationKey: ['create-department-container'],
    mutationFn: handleCreate,
    onSuccess: (res) => {
      // console.log('created');
      queryClient.invalidateQueries({
        queryKey: ['manager-get-departments'],
      });
      toast.success('Create department success!');
      navigate(`/departments/department/${res?.data.id}/employee`);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(`line 51`, error);
      toast(t(error.response?.data.message ?? 'Has Error'));
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
