import TableHeader from '@components/molecules/TableManagerHeader';
import { Manager } from '@page/Manager/interface';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import AddEmployeeModal, { AddEmployeeField } from './AddEmployeeModal';
import TableManagerEmployee from './TableManagerEmployee';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRole } from '@api/role';
import { createEmployeeSchema } from '@utils/schemas';
import { getDepartments } from '@api/deparment';
import { createEmployee, deleteUser, getAllUser, updateEmployee } from '@api/user';
import { toast } from 'react-toastify';
import { Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { uploadFile } from '@api/uploadFile';

import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
import { CreateEmployeeParams, UpdateEmployeeParams } from '@api/user/interface';
import UpdateEmployeeModal, { UpdateEmployeeFields } from './UpdateEmployeeModal';

const headerTabData = [
  { id: 0, name: 'Department', url: '/manager/department/department' },
  { id: 1, name: 'Employee', url: '/manager/department/employee' },
];

const TableManagerEmployeeContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [tablePageParams, setTablePageParams] = useState<{
    page: number;
    limit: number;
    total: number;
  }>({
    page: 0,
    limit: 5,
    total: 0,
  });

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

  const [value, setValue] = useState(() =>
    location.pathname === '/manager/department/employee' ? 1 : 0,
  );

  const [isShowAddEmployee, setIsShowAddEmployee] = useState<boolean>(false);
  const [isShowUpdateEmployee, setIsShowUpdateEmployee] = useState<boolean>(false);

  const createEmployeeMethod = useForm<AddEmployeeField>({
    defaultValues: {
      avatar: undefined,
      username: '',
      password: '',
      phone: '',
      department: '',
      email: '',
      position: 'A',
      role: '',
    },
    resolver: yupResolver(createEmployeeSchema),
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
      position: 'a',
      role: '',
    },
    resolver: yupResolver(createEmployeeSchema),
  });

  const { mutate: createEmployeeMutate, isLoading: isCreateEmployeeLoading } =
    useMutation({
      mutationKey: ['table-manager-create-employee'],
      mutationFn: createEmployee,
      onSuccess: () => {
        toast.success('Employee is created');
        queryClient.invalidateQueries({
          queryKey: ['table-manager-employee-get-employees'],
        });
      },
      onError: () => {
        toast.error('Create employee failed');
      },
    });

  const { mutate: updateEmployeeMutate, isLoading: isUpdateEmployeeLoading } =
    useMutation({
      mutationKey: ['table-manager-update-employee'],
      mutationFn: ({ id, params }: { id: number; params: UpdateEmployeeParams }) =>
        updateEmployee(id, params),
      onSuccess: () => {
        toast.success('Employee is updated');
        queryClient.invalidateQueries({
          queryKey: ['table-manager-employee-get-employees'],
        });
      },
      onError: () => {
        toast.error('Update employee failed');
      },
    });

  // const {mutate: getImageUrlMutate} = useMutation({
  //   mutationKey: ['table-manager-get-image-url'],
  //   mutationFn: (data: AddEmployeeField & { avatarName: string }) => getImageUrl(data.avatarName),
  //   onSuccess: (res, params) => {
  //     return createEmployeeMutate({...params, avatar: res?.data})
  //   }
  // })

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
        if (!res?.data) {
          params.callback('');
          return;
        }

        if (res.data.match(/^https:\/\/|^http:\/\//g)) {
          params.callback(res.data);
        } else {
          params.callback(`http://${res.data}`);
        }
      },
      onError: () => {
        toast.error("Can't upload file");
      },
    },
  );

  const { data: employeeData, isLoading: isEmployeeGetting } = useQuery({
    queryKey: [
      'table-manager-employee-get-employees',
      tablePageParams.page,
      tablePageParams.limit,
    ],
    queryFn: () =>
      getAllUser({ ...tablePageParams, page: tablePageParams.page + 1 }),
    onSuccess: (res) => {
      console.log(res);
      setTablePageParams((preState) => {
        if (res?.total !== undefined) return { ...preState, total: res.total };
        return preState;
      });
    },
  });

  const { data: roleData } = useQuery({
    queryKey: ['table-manager-employee-get-role'],
    queryFn: getRole,
    onSuccess: (res) => {
      if (res?.data?.length) {
        createEmployeeMethod.setValue('role', String(res.data[0].id));
      }
    },
  });

  const { data: departmentData } = useQuery({
    queryKey: ['table-manager-employee-get-department'],
    queryFn: getDepartments,
    onSuccess: (res) => {
      if (res?.data?.length) {
        createEmployeeMethod.setValue('department', String(res.data[0].id));
      }
    },
    enabled: isShowAddEmployee || isShowUpdateEmployee,
  });

  const { mutate: deleteEmployeeMutate } = useMutation({
    mutationKey: ['table-manager-employee-update-employee'],
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success('User is deleted');
      queryClient.invalidateQueries({
        queryKey: ['table-manager-employee-get-employees'],
      });
      onCloseAlertDialog();
    },
    onError: () => {
      toast.error('Delete is failed');
    },
  });

  const convertedRoleList = useMemo(
    () =>
      roleData?.data.map((value) => ({
        label: value.name,
        value: String(value.id),
      })),
    [roleData],
  );

  const convertedDepartmentList = useMemo(
    () =>
      departmentData?.data.map((value) => ({
        label: value.name,
        value: String(value.id),
      })),
    [departmentData],
  );

  const convertedEmployeeList = useMemo(() => {
    if (!roleData?.data) return undefined;

    const roleHash: { [key: number]: string } = {};
    roleData.data.forEach((value) => {
      roleHash[value.id] = value.name;
    });

    return employeeData?.data
      .map((value) => {
        return new Manager(
          value.id,
          value.avatar,
          value.user_name,
          value.email,
          value.position,
          roleHash[value.role_id] ?? '',
        );
      })
      .sort((a, b) => (a.name < b.name ? -1 : 1));
  }, [employeeData, roleData]);

  const handleChangeTab = (e, newValue) => setValue(newValue);

  const handleCreateSubmit = (values: AddEmployeeField) => {
    if (values.avatar) {
      uploadAvatarFileMutate({
        avatar: values.avatar as File,
        callback: (avatar) => createEmployeeMutate({ ...values, avatar }),
      });
      return;
    }

    createEmployeeMutate({ ...values, avatar: undefined });
  };

  const handleUpdateSubmit = (values: UpdateEmployeeFields) => {
    if (values.avatar instanceof File) {
      uploadAvatarFileMutate({
        avatar: values.avatar as File,
        callback: (avatar) =>
          updateEmployeeMutate({ id: values.id, params: { ...values, avatar } }),
      });
    } else {
      updateEmployeeMutate({
        id: values.id,
        params: { ...values, avatar: undefined },
      });
    }
  };

  const handleDelete = (employeeId: number) => {
    setAlertData('Delete employee', 'Deleted employee will not restored', () => {
      setIsAlertDialogLoading(true);
      deleteEmployeeMutate(employeeId);
    });
  };

  const handleUpdateClick = (id: number) => {
    const updateEmployee = employeeData?.data.find((value) => value.id === id);
    if (updateEmployee) {
      updateEmployeeMethod.setValue('id', updateEmployee.id);
      updateEmployeeMethod.setValue('avatar', updateEmployee.avatar);
      updateEmployeeMethod.setValue('username', updateEmployee.user_name);
      updateEmployeeMethod.setValue(
        'department',
        String(updateEmployee.department_id),
      );
      updateEmployeeMethod.setValue('role', String(updateEmployee.role_id));
      updateEmployeeMethod.setValue('email', updateEmployee.email);
      updateEmployeeMethod.setValue('phone', updateEmployee.phone_number);
      updateEmployeeMethod.setValue('password', updateEmployee.password);
      updateEmployeeMethod.setValue('position', updateEmployee.position);
    }
    setIsShowUpdateEmployee(true);
  };

  return (
    <div>
      <TableHeader
        isHaveActions={true}
        plusButtonTitle="Add employee"
        onPlusClick={() => setIsShowAddEmployee(true)}>
        <Tabs className="tableManagerTabs" value={value} onChange={handleChangeTab}>
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
      <TableManagerEmployee
        page={tablePageParams.page}
        limit={tablePageParams.limit}
        total={tablePageParams.total}
        isLoading={isEmployeeGetting}
        data={convertedEmployeeList ?? []}
        onDelete={handleDelete}
        onUpdate={handleUpdateClick}
        onChangeLimit={(limit) =>
          setTablePageParams((preState) => ({ ...preState, limit }))
        }
        onChangePage={(page) =>
          setTablePageParams((preState) => ({ ...preState, page }))
        }
      />
      <AddEmployeeModal
        submitLabel={'Create Employee'}
        isFormLoading={isCreateEmployeeLoading || isUploadingFile}
        method={createEmployeeMethod}
        isOpen={isShowAddEmployee}
        roleList={convertedRoleList ?? []}
        departmentList={convertedDepartmentList ?? []}
        title={'Create Employee'}
        onSubmit={handleCreateSubmit}
        onClose={() => {
          setIsShowAddEmployee(false);
          createEmployeeMethod.reset();
        }}
      />

      <UpdateEmployeeModal
        submitLabel={'Update employee'}
        isFormLoading={isUpdateEmployeeLoading || isUploadingFile}
        method={updateEmployeeMethod}
        isOpen={isShowUpdateEmployee}
        roleList={convertedRoleList ?? []}
        departmentList={convertedDepartmentList ?? []}
        title={'Update employee'}
        onSubmit={handleUpdateSubmit}
        onClose={() => {
          setIsShowUpdateEmployee(false);
          updateEmployeeMethod.reset();
        }}
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

export default TableManagerEmployeeContainer;
