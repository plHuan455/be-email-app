import TableHeader from '@components/molecules/TableManagerHeader';
import React, { useMemo, useState } from 'react';
import AddDepartmentModal, { AddDepartmentField } from './AddDepartmentModal';
import TableManagerDepartment from './TableManagerDepartment';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createDepartment, getDepartments } from '@api/deparment';
import { Department, Manager } from '@page/Manager/interface';
import { toast } from 'react-toastify';
import { getRole } from '@api/role';
import { Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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
  const method = useForm<AddDepartmentField>({
    defaultValues: {
      name: '',
      description: '',
      address: '',
    },
    resolver: yupResolver(createDepartmentSchema),
  });

  const { data: roleData } = useQuery({
    queryKey: ['table-manager-employee-get-role'],
    queryFn: getRole,
  });

  const { data: departmentData } = useQuery({
    queryKey: ['table-manager-department-get-department'],
    queryFn: getDepartments,
  });

  const departmentList = useMemo(() => {
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
                user.id,
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
  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState(() =>
    location.pathname === '/manager/department/employee' ? 1 : 0,
  );

  const handleChange = (e, newValue) => setValue(newValue);

  const handleSubmit = (values: AddDepartmentField) => {
    createDepartmentMutate(values);
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
      <TableManagerDepartment departmentList={departmentList ?? []} />

      <AddDepartmentModal
        method={method}
        isOpen={Boolean(isShowAddDepartmentModal)}
        isFormLoading={isCreateDepartmentSubmitting}
        title="Create department"
        onSubmit={handleSubmit}
        onClose={() => {
          if (onCloseAddDepartmentModal) onCloseAddDepartmentModal();
          method.reset();
        }}
      />
    </div>
  );
};

export default TableManagerDepartmentContainer;
