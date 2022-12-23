import TableHeader from '@components/molecules/TableManagerHeader';
import React, { useMemo, useState } from 'react';
import AddDepartmentModal, { AddDepartmentField } from './AddDepartmentModal';
import TableManagerDepartment from './TableManagerDepartment';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
} from '@api/deparment';
import { Department, Manager, Positions } from '@page/Manager/interface';
import { toast } from 'react-toastify';
import { getRole } from '@api/role';
import { Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import UpdateEmployeeModal, {
  UpdateEmployeeFields,
} from '../TableManagerEmployeeContainer/UpdateEmployeeModal';
import { createEmployeeSchema } from '@utils/schemas';
import { uploadFile } from '@api/uploadFile';
import { deleteUser, getUser, getUserWithEmail, updateEmployee } from '@api/user';
import es from 'date-fns/esm/locale/es/index.js';
import { UpdateEmployeeParams } from '@api/user/interface';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
import UpdateDepartmentModal, {
  UpdateDepartmentFields,
} from './UpdateDepartmentModal';

const headerTabData = [
  { id: 0, name: 'Department', url: '/manager/department/department' },
  { id: 1, name: 'Employee', url: '/manager/department/employee' },
];

interface TableManagerDepartmentContainerProps {
  onCloseAddDepartmentModal: () => void;
  isShowAddDepartmentModal?: boolean;
}

const createDepartmentSchema = yup
  .object({
    name: yup.string().required(),
    description: yup.string(),
    address: yup.string(),
  })
  .required();

const TableManagerDepartmentContainer: React.FC<
  TableManagerDepartmentContainerProps
> = ({ isShowAddDepartmentModal, onCloseAddDepartmentModal }) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    isOpen,
    isLoading: isAlertDialogLoading,
    title: alertTitle,
    description: alertDescription,
    callback: alertCallback,
    setAlertData,
    onClose: onCloseAlertDialog,
    setIsLoading: setIsAlertDialogLoading,
  } = useAlertDialog();

  // Tab value
  const [value, setValue] = useState(() =>
    location.pathname === '/manager/department/employee' ? 1 : 0,
  );

  const [isShowUpdateDepartment, setIsShowUpdateDepartment] =
    useState<boolean>(false);
  const [isShowUpdateEmployee, setIsShowUpdateEmployee] = useState<boolean>(false);

  const createDepartmentMethod = useForm<AddDepartmentField>({
    defaultValues: {
      name: '',
      description: '',
      address: '',
    },
    resolver: yupResolver(createDepartmentSchema),
  });

  const updateDepartmentMethod = useForm<UpdateDepartmentFields>({
    defaultValues: {
      id: '',
      name: '',
      description: '',
      address: '',
    },
    resolver: yupResolver(createDepartmentSchema),
  });

  const updateEmployeeMethod = useForm<UpdateEmployeeFields>({
    defaultValues: {
      id: -1,
      avatar: undefined,
      firstName: '',
      lastName: '',
      identity: '',
      password: '',
      phone: '',
      department: '',
      email: '',
      position: '',
      role: '',
    },
    resolver: yupResolver(createEmployeeSchema),
  });

  const { mutate: createDepartmentMutate, isLoading: isCreateDepartmentSubmitting } =
    useMutation({
      mutationKey: ['table-manager-department-create-department'],
      mutationFn: createDepartment,
      onSuccess: (res) => {
        queryClient.invalidateQueries({
          queryKey: ['table-manager-department-get-departments'],
        });
        toast.success('Department is created');
        onCloseAddDepartmentModal();
      },
      onError: () => {
        toast.error('Create department failed');
      },
    });

  const { mutate: updateDepartmentMutate, isLoading: isDepartmentUpdating } =
    useMutation({
      mutationKey: ['table-manager-department-update'],
      mutationFn: ({ id, params }: { id: number; params: UpdateDepartmentFields }) =>
        updateDepartment(id, params),
      onSuccess: (res) => {
        console.log('test');
        queryClient.invalidateQueries({
          queryKey: ['table-manager-department-get-departments'],
        });
        toast.success('Department is updated');
        setIsShowUpdateDepartment(false);
      },
      onError: (err: any) => {
        toast.error(err?.data?.message ?? 'Update department failed');
      },
    });

  const { mutate: deleteDepartmentMutate, isLoading: isDepartmentDeleting } =
    useMutation({
      mutationKey: ['table-manager-department-delete-department'],
      mutationFn: deleteDepartment,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['table-manager-department-get-departments'],
        });
        toast.success('Department is deleted');
        onCloseAlertDialog();
      },
      onError: (err: any) => {
        onCloseAlertDialog();
        toast.error(err?.data?.message ?? 'Delete department is failed');
      },
    });

  const { mutate: deleteEmployeeMutate, isLoading: isEmployeeDeleting } =
    useMutation({
      mutationKey: ['table-manager-delete-employee'],
      mutationFn: deleteUser,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['table-manager-department-get-departments'],
        });
        toast.success('Employee is deleted');
        onCloseAlertDialog();
      },
    });

  const { mutate: updateEmployeeMutate, isLoading: isUpdateEmployeeLoading } =
    useMutation({
      mutationKey: ['table-manager-update-employee'],
      mutationFn: ({ id, params }: { id: number; params: UpdateEmployeeParams }) =>
        updateEmployee(id, params),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['table-manager-department-get-departments'],
        });
        toast.success('Employee is updated');
        updateEmployeeMethod.reset();
        setIsShowUpdateEmployee(false);
      },
      onError: (err: any) => {
        toast.error(err?.data?.message ?? 'Update employee failed');
      },
    });

  const { mutate: uploadAvatarFileMutate, isLoading: isUploadingFile } = useMutation(
    {
      mutationKey: ['table-manager-upload-file'],
      mutationFn: ({
        avatar,
        callback,
      }: {
        avatar: File;
        callback: (avatarSrc: string) => void;
      }) => {
        return uploadFile(avatar);
      },
      onSuccess: (res, params) => {
        params.callback(res?.dta ?? '');
      },
      onError: () => {
        toast.error("Can't upload file");
      },
    },
  );

  const { mutate: getEmployeeMutate, isLoading: isGetEmployeeMutate } = useMutation({
    mutationKey: ['table-manager-get-employee'],
    mutationFn: getUserWithEmail,
    onSuccess: (res) => {
      const data = res.data;
      if (data) {
        updateEmployeeMethod.setValue('id', data.id);
        updateEmployeeMethod.setValue('avatar', data.avatar);
        updateEmployeeMethod.setValue('firstName', data.first_name);
        updateEmployeeMethod.setValue('lastName', data.last_name);
        updateEmployeeMethod.setValue('identity', data.identity);
        updateEmployeeMethod.setValue('password', 'password');
        updateEmployeeMethod.setValue('phone', data.phone_number);
        updateEmployeeMethod.setValue('department', String(data.department));
        updateEmployeeMethod.setValue('email', String(data.email));
        updateEmployeeMethod.setValue('position', String(data.position));
        updateEmployeeMethod.setValue('role', String(data.role));
      }
    },
  });

  const { data: roleData } = useQuery({
    queryKey: ['table-manager-employee-get-role'],
    queryFn: getRole,
  });

  const { data: departmentData, isLoading: isDepartmentGetting } = useQuery({
    queryKey: ['table-manager-department-get-departments'],
    queryFn: getDepartments,
  });

  const convertedDepartmentList = useMemo(() => {
    if (!roleData?.data) return undefined;

    const roleHash: { [key: number]: string } = {};
    roleData.data.forEach((value) => {
      roleHash[value.id] = value.name;
    });

    return departmentData?.data.map(
      (value) =>
        new Department(
          value.id,
          value.name,
          value?.users?.length ?? 0,
          value.address,
          value?.users?.map(
            (user) =>
              new Manager(
                user.id,
                user.avatar,
                user.first_name,
                user.last_name,
                user.identity,
                user.email,
                user.position,
                roleHash[user.role_id] ?? '',
              ),
          ) ?? [],
          value?.positions?.map(
            (position) => new Positions(position.id, position.name),
          ) ?? [],
          value.description,
        ),
    );
  }, [departmentData, roleData]);

  const convertedDepartmentOptions = useMemo(
    () =>
      departmentData?.data.map((value) => ({
        label: value.name,
        value: String(value.id),
      })),
    [departmentData],
  );

  const convertedRoleOptions = useMemo(
    () =>
      roleData?.data.map((value) => ({
        label: value.name,
        value: String(value.id),
      })),
    [roleData],
  );

  const handleChange = (e, newValue) => setValue(newValue);

  // Create department
  const handleSubmit = (values: AddDepartmentField) => {
    createDepartmentMutate(values);
  };

  const handleUpdateDepartmentSubmit = (values: UpdateDepartmentFields) => {
    updateDepartmentMutate({ id: Number(values.id), params: values });
  };

  const handleUpdateEmployeeSubmit = (values: UpdateEmployeeFields) => {
    if (values.avatar instanceof File) {
      uploadAvatarFileMutate({
        avatar: values.avatar,
        callback: (avatarSrc) => {
          updateEmployeeMutate({
            id: values.id,
            params: { ...values, avatar: avatarSrc },
          });
        },
      });
      return;
    }

    updateEmployeeMutate({
      id: values.id,
      params: { ...values, avatar: undefined },
    });
  };

  const handleEmployeeUpdateClick = (id: number) => {
    setIsShowUpdateEmployee(true);
    getEmployeeMutate(id);
  };

  const handleEmployeeDeleteClick = (id: number) => {
    setAlertData('Delete employee', 'Deleted employee will not restored', () => {
      setIsAlertDialogLoading(true);
      deleteEmployeeMutate(id);
    });
  };

  const handleDepartmentUpdateClick = (id: number) => {
    const foundDepartment = departmentData?.data?.find((value) => value.id === id);
    if (foundDepartment) {
      updateDepartmentMethod.setValue('id', String(foundDepartment.id));
      updateDepartmentMethod.setValue('name', foundDepartment.name);
      updateDepartmentMethod.setValue('address', foundDepartment.address);
      updateDepartmentMethod.setValue('description', foundDepartment.description);
      setIsShowUpdateDepartment(true);
    }
  };

  const handleDepartmentDeleteClick = (id: number) => {
    setAlertData('Delete department', 'Deleted department will not restored', () => {
      setIsAlertDialogLoading(true);
      deleteDepartmentMutate(id);
    });
  };

  return (
    <div className="px-6">
      <TableHeader isHaveActions={false}>
        <Tabs className="tableManagerTabs" value={value} onChange={handleChange}>
          {headerTabData.map((item) => (
            <Tab
              value={item.id}
              key={item.id}
              label={item.name}
              onClick={() => navigate(item.url)}
            />
          ))}
        </Tabs>
      </TableHeader>
      <TableManagerDepartment
        isLoading={isDepartmentGetting}
        departmentList={convertedDepartmentList ?? []}
        onEmployeeUpdateClick={handleEmployeeUpdateClick}
        onEmployeeDeleteClick={handleEmployeeDeleteClick}
        onDepartmentUpdateClick={handleDepartmentUpdateClick}
        onDepartmentDeleteClick={handleDepartmentDeleteClick}
      />

      <AddDepartmentModal
        method={createDepartmentMethod}
        isOpen={Boolean(isShowAddDepartmentModal)}
        isFormLoading={isCreateDepartmentSubmitting}
        title="Create department"
        onSubmit={handleSubmit}
        onClose={() => {
          if (onCloseAddDepartmentModal) onCloseAddDepartmentModal();
          createDepartmentMethod.reset();
        }}
      />

      <UpdateDepartmentModal
        isOpen={isShowUpdateDepartment}
        onClose={() => setIsShowUpdateDepartment(false)}
        isFormLoading={isDepartmentUpdating || isDepartmentGetting}
        method={updateDepartmentMethod}
        onSubmit={handleUpdateDepartmentSubmit}
        title="Update department"
      />

      <UpdateEmployeeModal
        title="Update employee"
        isOpen={isShowUpdateEmployee}
        method={updateEmployeeMethod}
        departmentList={convertedDepartmentOptions ?? []}
        isFormLoading={
          isGetEmployeeMutate || isUpdateEmployeeLoading || isUploadingFile
        }
        onClose={() => {
          setIsShowUpdateEmployee(false);
          updateEmployeeMethod.reset();
        }}
        onSubmit={handleUpdateEmployeeSubmit}
        submitLabel="Update employee"
        roleList={convertedRoleOptions ?? []}
      />

      <AlertDialog
        isLoading={isAlertDialogLoading}
        titleLabel={alertTitle}
        descriptionLabel={alertDescription}
        isOpen={isOpen}
        onClose={onCloseAlertDialog}
        onAgree={() => alertCallback()}
        onDisagree={onCloseAlertDialog}
      />
    </div>
  );
};

export default TableManagerDepartmentContainer;
