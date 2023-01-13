import {
  createDepartment,
  deleteDepartment,
  getDepartmentById,
  updateDepartment,
} from '@api/deparment';
import { useUploadFileToSever } from '@hooks/useUploadFileToSever';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { toast, useToast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Name is required!'),
  description: yup.string().required('Description is required!'),
  address: yup.string().required('Address is required!'),
  company_id: yup.number().required('Company is required!'),
});

const initDepartment = {
  id: -1,
  name: '',
  description: '',
  address: '',
  company_id: -1,
};

export const useDepartmentManagement = () => {
  // hooks
  const navigate = useNavigate();
  const param = useParams();
  //   const { uploadImage } = useUploadFileToSever();

  const [department, setDepartment] = useState(initDepartment);

  const handleCancel = () => navigate(-1);

  return {
    navigate,
    schema,
    param,
    department,
    setDepartment,
    handleCancel,
  };
};

export const useCreateDepartmentManagement = () => {
  const hook = useDepartmentManagement();
  const { navigate, department, setDepartment } = hook;

  const handleCreate = async () => {
    try {
      console.log('department data --->', department);

      // call create here
      const { id, ...params } = department;
      const res = await createDepartment(params);

      return res;
    } catch (error: any) {
      console.error(new Error(error));
      toast.error(error?.response?.message || 'Has Error');
    }
  };

  return {
    ...hook,
    handleCreate,
  };
};

export const useEditDepartmentManagement = () => {
  const hook = useDepartmentManagement();
  const { param, navigate, department, setDepartment } = hook;
  const queryClient = useQueryClient();

  console.log('param -->', param.id);
  useQuery(
    ['getDepartmentById', param.id],
    () => getDepartmentById(Number(param.id)),
    {
      onSuccess: (res: any) => {
        const d = res.data;
        const depItem = {
          id: d.id,
          name: d.name,
          description: 'Description',
          address: 'Address',
          company_id: 1,
        };
        setDepartment(depItem);
      },
      onError: (error: any) => {
        navigate('..');
        console.error(new Error(error));
        toast.error('Cannot find this department!');
      },

      enabled: !!param.id,
    },
  );

  const handleEdit = async () => {
    try {
      console.log('department data --->', department);
      const { id, company_id, ...params } = department;
      await updateDepartment(id, params);
      queryClient.invalidateQueries({ queryKey: ['manager-get-departments'] });
      navigate(-1);
      toast.success('Success');
    } catch (error: any) {
      console.error(new Error(error));
      toast.error(error?.response?.message || 'Update department fail!');
    }
  };

  const handleDelete = async () => {
    try {
      // call await delete
      await deleteDepartment(Number(param.id));
      navigate('..');
      toast.success('Success');
    } catch (error: any) {
      console.error(new Error(error));
      toast.error(error?.response?.message || 'Has Error');
    }
  };

  return {
    ...hook,
    handleEdit,
    handleDelete,
  };
};
