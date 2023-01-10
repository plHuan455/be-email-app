import { useTranslation } from '@@packages/localization/src';
import Icon from '@components/atoms/Icon';
import PageCrudData from '@components/organisms/PageCrudData';

import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateIcon from '@mui/icons-material/Update';

const PositionContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const params = useParams();

  useEffect(() => {
    console.log('mount', params);
  });

  const columns = React.useMemo<ColumnDef<any, any>[]>(() => {
    return [
      {
        accessorKey: '',
        accessorFn: (row) => row.name,
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>{t('Position Name')}</span>,
        footer: (props) => {
          return props.column.id;
        },
      },
      {
        accessorKey: '',
        accessorFn: (row) => row.describe,
        id: 'describe',
        cell: (info) => info.getValue(),
        header: () => <span>Describe</span>,
        footer: (props) => props.column.id,
      },
    ];
  }, []);

  const rowClick = (row) => {
    if (row && row.original) {
      // tạm thời cho edit, sau này phần quyền sau
      navigate(
        `/department/${params.idDepartment}/position/edit/${row.original.id}`,
      );
    }
  };

  return (
    <div className="px-4 flex-1 pb-4">
      <PageCrudData
        disabledRowOnClick={false}
        api={`/system/position/department/${params.idDepartment}`}
        columns={columns}
        rowOnClick={(row) => rowClick(row)}
      />
    </div>
  );
};
export default PositionContainer;
