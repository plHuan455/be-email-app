import { PermissionResponse } from '@api/permission/interface';
import CustomInputRadio from '@components/atoms/CustomInputCheckbox';
import { TableCell, TableRow } from '@mui/material';
import React, { useEffect } from 'react';

interface Props {
  row: PermissionResponse;
  isActive: boolean;
  className: string;
  index: number;
  onChangeRow: (id: number, name?: string) => void;
}

const Row: React.FC<Props> = (props) => {
  const { row, className, onChangeRow, index, isActive } = props;

  return (
    <React.Fragment>
      <TableRow className={className} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="center">
          <CustomInputRadio
            isCheck={isActive}
            onChange={() => onChangeRow(row.id, row.name)}
            value="Active"
            name={`roleInputRadio-${row.name}${index}`}
          />
        </TableCell>
        <TableCell align="center">
          <CustomInputRadio
            isCheck={!isActive}
            onChange={() => onChangeRow(row.id, undefined)}
            value="deny"
            name={`roleInputRadio-${row.name}${index}`}
            checkColor="#E13D3D"
          />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
export default Row;
