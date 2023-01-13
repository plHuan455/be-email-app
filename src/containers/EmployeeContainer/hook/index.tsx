import { useTranslation } from '@@packages/localization/src';
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

// const schema = yup.object().shape({
//   first_name: yup.string().required('first_name is required!'),
//   last_name: yup.string().required('last_name is required!'),
//   identity: yup.string().required('identity is required!'),
//   email: yup.string().required('email is required!'),
//   password: yup.string().required('password is required!'),
//   position: yup.string().required('position is required!'),
//   phone_number: yup.number().required('phone_number is required!'),
//   role_id: yup.string().required('role_id is required!'),
//   // department_id: yup.string().required('role_id is required!'),
// });

const initEmployee = {
  id: -1,
  avatar: '',
  first_name: '',
  last_name: '',
  identity: '',
  email: '',
  sex: 'male',
  password: '',
  confirmPassword: '',
  phone_number: '',
  position: '',
  role_id: localStorage.getItem('current_role_id') ?? '',
  department_id: localStorage.getItem('current_department_id') ?? '',
  national: '',
  city: '',
  district: '',
  ward: '',
  street: '',
  number: '',
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

  const { t } = useTranslation();

  const schema = {
    first_name: yup.string().required('first_name is required!'),
    last_name: yup.string().required('last_name is required!'),
    identity: yup.string().required('identity is required!'),
    email: yup.string().required('email is required!'),
    position: yup.string().required('position is required!'),
    phone_number: yup.number().required('phone_number is required!'),
    role_id: yup.string().required('role_id is required!'),
  };

  console.log('role --->', roles);

  const handleCancel = () => navigate(-1);

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
      const { id, confirmPassword, ...params } = employee;
      await createEmployee({
        ...params,
        avatar,
        role_id: +params.role_id,
        department_id: +param.idDepartment!,
        address: {
          national: param.national ?? '',
          city: param.city ?? '',
          district: param.district ?? '',
          ward: param.ward ?? '',
          street: param.street ?? '',
          number: param.number ?? '',
        },
      });
      toast.success('Create employee success!');
      navigate(-1);
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

  useQuery(['getUserById', param.id], () => getUserById(Number(param.id)), {
    onSuccess: (res: any) => {
      const data = res.data;
      setEmployee(data);
      console.log(data);
    },
    onError: (error: any) => {
      navigate('..');
      console.error(new Error(error));
      toast.error('Cannot find this employee!');
    },

    enabled: !!param.id,
  });

  const handleEdit = async () => {
    try {
      console.log('employee data --->', employee);
      const { id, password, ...params } = employee;
      // call await update
      if (files.image && files.image.length > 0) {
        const avatar = await uploadImage(files.image[0]);
        // update with img change
        await updateEmployee(id, {
          ...params,
          avatar,
          role_id: +params.role_id,
          department_id: +param.idDepartment!,
        });
      } else {
        // update without img change
        await updateEmployee(id, {
          ...params,
          role_id: +params.role_id,
          department_id: +param.idDepartment!,
        });
      }
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
      await deleteEmployee(Number(param.id));
      navigate(-1);
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
