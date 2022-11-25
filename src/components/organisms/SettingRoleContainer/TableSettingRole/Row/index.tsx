import { PermissionResponse } from '@api/permission/interface';
import CustomInputRadio from '@components/atoms/CustomInputCheckbox';
import { TableCell, TableRow } from '@mui/material';
import React, { useEffect } from 'react';

interface Props {
  row: PermissionResponse;
  className: string;
  index: number;
  onChangeRow: Function;
}

const Row: React.FC<Props> = (props) => {
  const { row, className, onChangeRow, index } = props;
  const [selectedValue, setSelectedValue] = React.useState(() => row.status);

  React.useEffect(() => {
    const newPermission: PermissionResponse = {
      ...row,
      status: selectedValue,
    };
    onChangeRow(index, newPermission);
  }, [selectedValue]);

  useEffect(() => {
    setSelectedValue(row.status);
  }, [row]);

  const handleChangeCheckValue = (e) => {
    setSelectedValue(e.target.value);
    console.log(
      '🚀 ~ file: TableSettingRole/index.ts ~ line 43 ~ TableSettingRole',
      selectedValue,
    );
  };

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
            isCheck={row.status === 'Active'}
            onChange={handleChangeCheckValue}
            value="Active"
            name={`roleInputRadio-${row.name}${index}`}
          />
        </TableCell>
        <TableCell align="center">
          <CustomInputRadio
            isCheck={row.status !== 'Active'}
            onChange={handleChangeCheckValue}
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
