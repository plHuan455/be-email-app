import { useTranslation } from '@@packages/localization/src';
import Icon from '@components/atoms/Icon';
import PageCrudData from '@components/organisms/PageCrudData';

import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateIcon from '@mui/icons-material/Update';

const DepartmentContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const columns = React.useMemo<ColumnDef<any, any>[]>(
    () => [
      {
        accessorKey: '',
        accessorFn: (row) => row.name,
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: '',
        accessorFn: (row) => row.name,
        id: 'des',
        cell: (info) => 'Department description',
        header: () => <span>{t('Description')}</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: '',
        accessorFn: (row) => row.users,
        id: 'total_users',
        cell: (info) => (
          <div className="flex">
            <Icon className="pr-2" icon="people" />
            <span>{info.getValue()?.length || 0}</span>
          </div>
        ),
        header: () => <span>{t('Total users')}</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: '',
        accessorFn: (row) => row.id,
        id: 'actions',
        cell: (info) => (
          <div className="w-fit cursor-pointer">
            <Icon
              icon="edit"
              onClick={() => navigate(`/manager/department/edit/${info.getValue()}`)}
            />
          </div>
        ),
        header: () => <span>{t('Detail')}</span>,
        footer: (props) => props.column.id,
      },
    ],
    [],
  );
  return (
    <div className="px-4">
      <PageCrudData
        disabledRowOnClick={true}
        api="/v1/api/rbac/department"
        columns={columns}
        //   rowOnClick={(row) => navigate(`edit/${row.original.id}`)}
      />
    </div>
  );
};
export default DepartmentContainer;