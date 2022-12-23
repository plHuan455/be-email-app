import Loading from '@components/atoms/Loading';
import SingleAvatar from '@components/atoms/SingleAvatar';
import TableActionsMenu from '@components/molecules/TableActionsMenu';
import TableLayout, { tableHead } from '@layouts/TableLayout';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { Positions } from '@page/Manager/interface';
import { rem } from '@utils/functions';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

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

  const handleDelete = (id: number) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleUpdate = (id: number) => {
    if (onUpdate) onUpdate(id);
  };

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
      <TableBody>
        {isLoading && (
          <TableRow>
            <TableCell align="center" colSpan={6} height={53 * limit}>
              <Loading isLoading size="xs" />
            </TableCell>
          </TableRow>
        )}
        {data.length === 0 && !isLoading && (
          <TableRow>
            <TableCell
              align="center"
              colSpan={6}
              height={53 * limit}
              sx={{ color: 'rgb(148 148 148 / 87%)' }}>
              There is no employee
            </TableCell>
          </TableRow>
        )}
        {!isLoading &&
          data.map((row, index) => {
            return (
              <TableRow className={`managerRow`} key={index}>
                <TableCell className="managerName" align="left">
                  {row.id}
                </TableCell>
                <TableCell className="managerName" align="left">
                  {row.name}
                </TableCell>

                <TableCell align="center">
                  <TableActionsMenu
                    sx={{ maxWidth: rem(52), minWidth: rem(52) }}
                    options={[
                      { value: 0, label: 'Update', icon: <UpdateIcon /> },
                      { value: 1, label: 'Delete', icon: <DeleteIcon /> },
                    ]}
                    onItemClick={(value) => {
                      if (value === 0) {
                        handleUpdate(row.id);
                      }
                      if (value === 1) {
                        handleDelete(row.id);
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        {!isLoading && data.length !== 0 && emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    </TableLayout>
  );
};

export default TableManagerPositionsContainer;
