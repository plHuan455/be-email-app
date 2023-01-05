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
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/department/department/edit/${info.getValue()}`);
              }}
            />
          </div>
        ),
        header: () => <span>{t('Detail')}</span>,
        footer: (props) => props.column.id,
      },
    ],
    [],
  );

  const rowClick = (row: any) => {
    if (row && row.original) {
      navigate(`/department/${row.original.id}/employee`);
    }
  };

  return (
    <div className="px-4">
      <PageCrudData
        disabledRowOnClick={false}
        api="/system/position/department"
        columns={columns}
        rowOnClick={(row) => rowClick(row)}
      />
    </div>
  );
};
export default DepartmentContainer;
