import { useTranslation } from '@@packages/localization/src';
import Icon from '@components/atoms/Icon';
import PageCrudData from '@components/organisms/PageCrudData';

import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateIcon from '@mui/icons-material/Update';

const EmployeeContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const params = useParams();

  useEffect(() => {
    console.log('mount', params);
  });

  const columns = React.useMemo<ColumnDef<any, any>[]>(
    () => [
      {
        accessorKey: '',
        accessorFn: (row) => row,
        id: 'name',
        cell: (info) => {
          const { first_name, last_name } = info.getValue();
          return first_name + ' ' + last_name;
        },
        header: () => <span>{t('Fullname')}</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: '',
        accessorFn: (row) => row.avatar,
        id: 'avatar',
        cell: (info) => (
          <div>
            <img
              className="w-20 h-10 object-contain rounded-md"
              src={`http://${info.getValue()}`}
            />
          </div>
        ),
        header: () => <span>{t('Avatar')}</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: '',
        accessorFn: (row) => row.email,
        id: 'email',
        cell: (info) => info.getValue(),
        header: () => <span>Email</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: '',
        accessorFn: (row) => row.phone_number,
        id: 'phone_number',
        cell: (info) => info.getValue(),
        header: () => <span>{t('Phone number')}</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: '',
        accessorFn: (row) => row.position,
        id: 'position',
        cell: (info) => info.getValue(),
        header: () => <span>{t('Position')}</span>,
        footer: (props) => props.column.id,
      },
    ],
    [],
  );

  const rowClick = (row) => {
    if (row && row.original) {
      // tạm thời cho edit, sau này phần quyền sau
      navigate(
        `/department/${params.idDepartment}/employee/edit/${row.original.id}`,
      );
    }
  };

  return (
    <div className="px-4">
      <PageCrudData
        refreshKey={params.idDepartment}
        disabledRowOnClick={false}
        api={`/rbac/department/users/${params.idDepartment}`}
        columns={columns}
        rowOnClick={(row) => rowClick(row)}
      />
    </div>
  );
};
export default EmployeeContainer;
