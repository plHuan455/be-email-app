import Loading from '@components/atoms/Loading';
import TableActionsMenu from '@components/molecules/TableActionsMenu';
import { TableBody, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import React from 'react';
import { Positions } from '@page/Manager/interface';
import { rem } from '@utils/functions';

interface Props {
  isLoading?: Boolean;
  data: Positions[];
  limit: number;
  emptyRows: number;
  onUpdate?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const TableManagerPosition: React.FC<Props> = ({
  isLoading,
  data,
  limit,
  emptyRows,
  onUpdate,
  onDelete,
}) => {
  const handleDelete = (id: number) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleUpdate = (id: number) => {
    if (onUpdate) onUpdate(id);
  };

  return (
    <TableBody>
      {isLoading && (
        <TableRow>
          <TableCell align="center" colSpan={3} height={53 * limit}>
            <Loading isLoading size="xs" />
          </TableCell>
        </TableRow>
      )}
      {data.length === 0 && !isLoading && (
        <TableRow>
          <TableCell
            align="center"
            colSpan={3}
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
              <TableCell className="managerName" align="center">
                {row.id}
              </TableCell>
              <TableCell className="managerName" align="center">
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
  );
};

export default TableManagerPosition;
