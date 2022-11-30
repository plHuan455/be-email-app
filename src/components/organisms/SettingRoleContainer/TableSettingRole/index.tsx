import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import './styles.scss';
import { Radio } from '@mui/material';
import CustomInputRadio from '@components/atoms/CustomInputCheckbox';
import CustomButton from '@components/atoms/CustomButton';
import Icon from '@components/atoms/Icon';
import { PermissionResponse } from '@api/permission/interface';
import ModalBase from '@components/atoms/ModalBase';
import Row from './Row';

interface Props {
  data: PermissionResponse[];
  buttonLabel?: string;
  onChangeRow: Function;
  updatePermission: Function;
}

const TableSettingRole: React.FC<Props> = ({
  buttonLabel = '',
  data,
  onChangeRow,
  updatePermission,
}) => {
  console.log(
    '🚀 ~ file: TableSettingRole/index.ts ~ line 87 ~ TableSettingRole',
    data,
  );

  const handleClickSetRole = (e) => {
    const filterData = data
      .filter((value) => value.status === 'Active')
      .map((value) => ({
        id: value.id,
        name: value.name,
      }));
    console.log(
      '🚀 ~ file: TableSettingRole/index.ts ~ line 83 ~ filterData',
      filterData,
    );

    updatePermission({
      permissions: filterData,
    });
  };

  return (
    <Box className="flex-1">
      <TableContainer className="tableSettingRole" component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Grant</TableCell>
              <TableCell align="left">Department</TableCell>
              <TableCell align="center" width={100}>
                Grant
              </TableCell>
              <TableCell align="center" width={100}>
                Deny
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <Row
                className="managerSettingRoleRow"
                key={row.name}
                row={row}
                index={index}
                onChangeRow={onChangeRow}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length > 0 && (
        <Box className="flex justify-end items-end my-6">
          <CustomButton
            onClick={handleClickSetRole}
            className="py-3 px-6"
            bgButtonColor="#554CFF"
            color="#ffffff"
            label={buttonLabel}
          />
        </Box>
      )}
    </Box>
  );
};

export default TableSettingRole;
