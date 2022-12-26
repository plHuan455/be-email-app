import TableLayout, { tableHead } from '@layouts/TableLayout';
import { Positions } from '@page/Manager/interface';
import React, { useState } from 'react';
import TableManagerPosition from './TableManagerPosition';

const tableHeads: tableHead[] = [
  { align: 'center', label: 'Id' },
  { align: 'center', label: 'Name' },
  { align: 'center', label: 'Actions' },
];

interface Props {
  maxHeight?: number;
  isLoading?: boolean;
  data?: Positions[];
  onUpdate?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const TableManagerPositionsContainer: React.FC<Props> = ({
  maxHeight,
  data = [],
  isLoading,
  onUpdate,
  onDelete,
}) => {
  const [tablePageParams, setTablePageParams] = useState<{
    page: number;
    limit: number;
    total: number;
  }>({ page: 0, limit: 5, total: 0 });

  const { limit } = tablePageParams;

  const emptyRows = limit - data.length;

  return (
    <TableLayout
      tableHeads={tableHeads}
      maxHeight={maxHeight}
      page={tablePageParams.page}
      limit={tablePageParams.limit}
      total={data.length}
      onUpdate={onUpdate}
      onDelete={onDelete}
      onChangeLimit={(limit) =>
        setTablePageParams((preState) => ({ ...preState, limit }))
      }
      onChangePage={(page) =>
        setTablePageParams((preState) => ({ ...preState, page }))
      }>
      <TableManagerPosition
        data={data}
        isLoading={isLoading}
        emptyRows={emptyRows}
        limit={limit}
      />
    </TableLayout>
  );
};

export default TableManagerPositionsContainer;
