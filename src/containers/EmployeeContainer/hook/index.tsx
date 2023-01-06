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
  first_name: yup.string().required('first_name is required!'),
  last_name: yup.string().required('last_name is required!'),
  identity: yup.string().required('identity is required!'),
  email: yup.string().required('email is required!'),
  password: yup.string().required('password is required!'),
  position: yup.string().required('position is required!'),
  phone_number: yup.number().required('phone_number is required!'),
  role_id: yup.string().required('role_id is required!'),
  // department_id: yup.string().required('role_id is required!'),
});

const initEmployee = {
  id: -1,
  avatar: '',
  first_name: '',
  last_name: '',
  identity: '',
  email: '',
  password: '',
  phone_number: '',
  position: '',
  role_id: '',
  department_id: '',
};

const initFiles: { [key: string]: FileList | undefined } = {
  avatar: undefined,
};

export const useEmployeeManagement = () => {
  // hooks
  const navigate = useNavigate();
  const param = useParams();

  const { uploadImage } = useUploadFileToSever();
  const [files, setFiles] = useState(initFiles);

  const [employee, setEmployee] = useState(initEmployee);
  const { data: roles } = useQuery(['getRole'], getRole);
  console.log('role --->', roles);

  const handleCancel = () => navigate('..');

  return {
    navigate,
    schema,
    param,
    files,
    setFiles,
    uploadImage,
    employee,
    roles: roles?.data || [],
    setEmployee,
    handleCancel,
  };
};

export const useCreateEmployeeManagement = () => {
  const hook = useEmployeeManagement();
  const { navigate, employee, files, uploadImage, param } = hook;

  const handleCreate = async () => {
    try {
      if (!files.avatar || files.avatar.length === 0) {
        toast.error('File not found!');
        return;
      }
      console.log('employee data --->', employee);
      const avatar = await uploadImage(files.avatar[0]);
      // call create here
      const { id, ...params } = employee;
      await createEmployee({
        ...params,
        avatar,
        role_id: +params.role_id,
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

export const useEditEmployeeManagement = () => {
  const hook = useEmployeeManagement();
  const { param, navigate, employee, setEmployee, files, uploadImage } = hook;

  useQuery(
    ['getUserById', param.employee_id],
    () => getUserById(Number(param.employee_id)),
    {
      onSuccess: (res: any) => {
        const data = res.data;
        setEmployee(data);
      },
      onError: (error: any) => {
        navigate('..');
        console.error(new Error(error));
        toast.error('Cannot find this employee!');
      },

      enabled: !!param.employee_id,
    },
  );

  const handleEdit = async () => {
    try {
      console.log('employee data --->', employee);
      // call await update
      if (files.image && files.image.length > 0) {
        const picture = await uploadImage(files.image[0]);
        // update with img change
        // await updateEmployee(id, params);
      } else {
        // update without img change
        // await updateEmployee(id, params);
      }
      navigate('..');
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
