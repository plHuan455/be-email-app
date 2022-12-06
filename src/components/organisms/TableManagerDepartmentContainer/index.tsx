import TableHeader from '@components/molecules/TableManagerHeader';
import React, { useMemo, useState } from 'react';
import AddDepartmentModal, { AddDepartmentField } from './AddDepartmentModal';
import TableManagerDepartment from './TableManagerDepartment';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDepartment, getDepartments } from '@api/deparment';
import { Department, Manager } from '@page/Manager/interface';
import { toast } from 'react-toastify';
import { getRole } from '@api/role';
import { Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import UpdateEmployeeModal, {
  UpdateEmployeeFields,
} from '../TableManagerEmployeeContainer/UpdateEmployeeModal';
import { createEmployeeSchema } from '@utils/schemas';
import { uploadFile } from '@api/uploadFile';
import { deleteUser, getUser, updateEmployee } from '@api/user';
import es from 'date-fns/esm/locale/es/index.js';
import { UpdateEmployeeParams } from '@api/user/interface';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';

const headerTabData = [
  { id: 0, name: 'Department', url: '/manager/department/department' },
  { id: 1, name: 'Employee', url: '/manager/department/employee' },
];

interface TableManagerDepartmentContainerProps {
  isShowAddDepartmentModal?: boolean;
  onCloseAddDepartmentModal?: () => void;
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

  const [isShowUpdateEmployee, setIsShowUpdateEmployee] = useState<boolean>(false);

  const createDepartmentMethod = useForm<AddDepartmentField>({
    defaultValues: {
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
      username: '',
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
        toast.success('Department is created');
      },
      onError: () => {
        toast.error('Create department failed');
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
    mutationFn: getUser,
    onSuccess: (res) => {
      const data = res.data;
      if (data) {
        updateEmployeeMethod.setValue('id', data.user_id);
        updateEmployeeMethod.setValue('avatar', data.avatar);
        updateEmployeeMethod.setValue('username', data.user_name);
        updateEmployeeMethod.setValue('password', data.password);
        updateEmployeeMethod.setValue('phone', data.phone_number);
        updateEmployeeMethod.setValue('department', String(data.department_id));
        updateEmployeeMethod.setValue('email', String(data.email));
        updateEmployeeMethod.setValue('position', String(data.position));
        updateEmployeeMethod.setValue('role', String(data.role_id));
      }
    },
  });

  const { data: roleData } = useQuery({
    queryKey: ['table-manager-employee-get-role'],
    queryFn: getRole,
  });

  const { data: departmentData } = useQuery({
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
          value.name,
          value?.users?.length ?? 0,
          value.address,
          value?.users?.map(
            (user) =>
              new Manager(
                user.user_id,
                user.avatar,
                user.user_name,
                user.email,
                user.position,
                roleHash[user.role_id] ?? '',
              ),
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

  const handleSubmit = (values: AddDepartmentField) => {
    createDepartmentMutate(values);
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

  return (
    <div>
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
        departmentList={convertedDepartmentList ?? []}
        onEmployeeUpdate={handleEmployeeUpdateClick}
        onEmployeeDelete={handleEmployeeDeleteClick}
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
