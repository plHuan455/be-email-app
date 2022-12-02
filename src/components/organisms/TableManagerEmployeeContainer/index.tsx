import TableHeader from '@components/molecules/TableManagerHeader';
import { Manager } from '@page/Manager/interface';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import AddEmployeeModal, { AddEmployeeField } from './AddEmployeeModal';
import TableManagerEmployee from './TableManagerEmployee';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRole } from '@api/role';
import { createEmployeeSchema } from '@utils/schemas';
import { getDepartments } from '@api/deparment';
import { createEmployee, getAllUser } from '@api/user';
import { toast } from 'react-toastify';
import { Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const rows = [
  new Manager('', 'adep adep', 'adep@adep.com', 'Marketing', 'Manager 02'),
  new Manager(
    '',
    'Anh Nguyen The',
    'theanh.nguyen@theanh.com',
    'Front End',
    'Admin',
  ),
  new Manager('', 'Anh Tran', 'anh.tran@test.com', 'Back End', 'Employee'),
  new Manager('', 'Bùi Thùy Thị Minh', 'minhthuy.bui@test.com', 'CS', 'Manager'),
  new Manager(
    '',
    'Bùi Phạn Hương Giang',
    'huonggiang.bui@test.com',
    'CS',
    'Blocked',
  ),
  new Manager('', 'CSKH iBe', 'cskh', 'Front End', 'Employee'),
  new Manager('', 'adep adep', 'adep@adep.com', 'Marketing', 'Manager 02'),
  new Manager(
    '',
    'Anh Nguyen The',
    'theanh.nguyen@theanh.com',
    'Front End',
    'Admin',
  ),
  new Manager('', 'Anh Tran', 'anh.tran@test.com', 'Back End', 'Employee'),
  new Manager('', 'Bùi Thùy Thị Minh', 'minhthuy.bui@test.com', 'CS', 'Manager'),
  new Manager(
    '',
    'Bùi Phạn Hương Giang',
    'huonggiang.bui@test.com',
    'CS',
    'Blocked',
  ),
  new Manager('', 'CSKH iBe', 'cskh', 'Front End', 'Employee'),
  new Manager('', 'adep adep', 'adep@adep.com', 'Marketing', 'Manager 02'),
  new Manager(
    '',
    'Anh Nguyen The',
    'theanh.nguyen@theanh.com',
    'Front End',
    'Admin',
  ),
  new Manager('', 'Anh Tran', 'anh.tran@test.com', 'Back End', 'Employee'),
  new Manager('', 'Bùi Thùy Thị Minh', 'minhthuy.bui@test.com', 'CS', 'Manager'),
  new Manager(
    '',
    'Bùi Phạn Hương Giang',
    'huonggiang.bui@test.com',
    'CS',
    'Blocked',
  ),
  new Manager('', 'CSKH iBe', 'cskh', 'Front End', 'Employee'),
  new Manager('', 'adep adep', 'adep@adep.com', 'Marketing', 'Manager 02'),
  new Manager(
    '',
    'Anh Nguyen The',
    'theanh.nguyen@theanh.com',
    'Front End',
    'Admin',
  ),
  new Manager('', 'Anh Tran', 'anh.tran@test.com', 'Back End', 'Employee'),
  new Manager('', 'Bùi Thùy Thị Minh', 'minhthuy.bui@test.com', 'CS', 'Manager'),
  new Manager(
    '',
    'Bùi Phạn Hương Giang',
    'huonggiang.bui@test.com',
    'CS',
    'Blocked',
  ),
  new Manager('', 'CSKH iBe', 'cskh', 'Front End', 'Employee'),
].sort((a, b) => (a.name < b.name ? -1 : 1));

const headerTabData = [
  { id: 0, name: 'Department', url: '/manager/department/department' },
  { id: 1, name: 'Employee', url: '/manager/department/employee' },
];

const TableManagerEmployeeContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState(() =>
    location.pathname === '/manager/department/employee' ? 1 : 0,
  );

  const handleChange = (e, newValue) => setValue(newValue);

  const [isShowAddEmployee, setIsShowEmployee] = useState<boolean>(false);
  const method = useForm<AddEmployeeField>({
    defaultValues: {
      avatar: undefined,
      username: '',
      password: '',
      phone: '',
      department: 'Blocked',
      email: '',
      position: 'a',
      role: '',
    },
    resolver: yupResolver(createEmployeeSchema),
  });

  const { data: employeeData } = useQuery({
    queryKey: ['table-manager-employee-get-employee'],
    queryFn: getAllUser,
  });

  // To fill create form in select input
  const { mutate: createEmployeeMutate, isLoading: isCreateEmployeeLoading } =
    useMutation({
      mutationKey: ['table-manager-create-employee'],
      mutationFn: createEmployee,
      onSuccess: () => {
        toast.success('Employee is created');
      },
      onError: () => {
        toast.error('Create employee failed');
      },
    });

  const { data: roleData } = useQuery({
    queryKey: ['table-manager-employee-get-role'],
    queryFn: getRole,
    onSuccess: (res) => {
      if (res?.data?.length) {
        method.setValue('role', String(res.data[0].id));
      }
    },
  });

  const { data: departmentData } = useQuery({
    queryKey: ['table-manager-employee-get-department'],
    queryFn: getDepartments,
    onSuccess: (res) => {
      if (res?.data?.length) {
        method.setValue('department', String(res.data[0].id));
      }
    },
    enabled: isShowAddEmployee,
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
      .map(
        (value) =>
          new Manager(
            value.avatar,
            value.user_name,
            value.email,
            value.position,
            roleHash[value.role] ?? '',
          ),
      )
      .sort((a, b) => (a.name < b.name ? -1 : 1));
  }, [employeeData, roleData]);

  const handleSubmit = (values: AddEmployeeField) => {
    createEmployeeMutate(values);
  };

  return (
    <div>
      <TableHeader
        isHaveActions={false}
        plusButtonTitle="Add employee"
        onPlusClick={() => setIsShowEmployee(true)}>
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
      <TableManagerEmployee data={convertedEmployeeList ?? []} />

      <AddEmployeeModal
        isFormLoading={isCreateEmployeeLoading}
        method={method}
        isOpen={isShowAddEmployee}
        roleList={convertedRoleList ?? []}
        departmentList={convertedDepartmentList ?? []}
        title="Add employee"
        onSubmit={handleSubmit}
        onClose={() => {
          setIsShowEmployee(false);
          method.reset();
        }}
      />
    </div>
  );
};

export default TableManagerEmployeeContainer;
