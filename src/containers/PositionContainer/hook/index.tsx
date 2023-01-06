import {
  addPositionInDepartment,
  getPositionById,
  updatePosition,
} from '@api/deparment';
import { getRole } from '@api/role';
import {
  createEmployee,
  deleteUser as deleteEmployee,
  getUserById,
  // getEmployeeById,
  updateEmployee,
} from '@api/user';
import { useUploadFileToSever } from '@hooks/useUploadFileToSever';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, useToast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Name is required!'),
  describe: yup.string().required('Describe is required!'),
  // department_id: yup.string().required('role_id is required!'),
});

const initPosition = {
  id: -1,
  describe: '',
  name: '',
  department_id: '',
};

export const usePositionManagement = () => {
  // hooks
  const navigate = useNavigate();
  const param = useParams();

  const [position, setPosition] = useState(initPosition);
  const { data: roles } = useQuery(['getRole'], getRole);
  console.log('role --->', roles);

  const handleCancel = () => navigate(-1);

  return {
    navigate,
    schema,
    param,
    position,
    roles: roles?.data || [],
    setPosition,
    handleCancel,
  };
};

export const useCreatePositionManagement = () => {
  const hook = usePositionManagement();
  const { navigate, position, param } = hook;

  const handleCreate = async () => {
    try {
      console.log('position data --->', position);
      // call create here
      const { id, ...params } = position;
      await addPositionInDepartment({
        ...params,
        department_id: +param.idDepartment!,
      });
      toast.success('Create employee success!');
      navigate('..');
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

export const useEditPositionManagement = () => {
  const hook = usePositionManagement();
  const { param, navigate, position, setPosition } = hook;

  useQuery(
    ['get-position-by-id', param.id],
    () => getPositionById(Number(param.id)),
    {
      onSuccess: (res: any) => {
        const data = res.data;
        setPosition(data);
        console.log(data);
      },
      onError: (error: any) => {
        navigate('..');
        console.error(new Error(error));
        toast.error('Cannot find this employee!');
      },

      enabled: !!param.id,
    },
  );

  const handleEdit = async () => {
    try {
      console.log('position data --->', position);
      const { id, ...params } = position;
      // call await update
      await updatePosition(id, {
        ...params,
        department_id: +param.idDepartment!,
      });
      navigate(-1);
      toast.success('Success');
    } catch (error: any) {
      console.error(new Error(error));
      toast.error(error?.response?.message || 'Update employee fail!');
    }
  };

  const handleDelete = async () => {
    try {
      // call await delete
      // await deleteEmployee(Number(param.employee_id));
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
