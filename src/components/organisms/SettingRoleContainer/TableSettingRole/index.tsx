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
import { Role } from '@page/Manager/interface';

import './styles.scss';
import { Radio } from '@mui/material';
import CustomInputRadio from '@components/atoms/CustomInputCheckbox';
import CustomButton from '@components/atoms/CustomButton';
import Icon from '@components/atoms/Icon';

function Row(props: {
  row: Role;
  className: string;
  index: number;
  onChangeRow: Function;
}) {
  const { row, className, onChangeRow, index } = props;
  const [selectedValue, setSelectedValue] = React.useState(() =>
    row.isGrant ? 'grant' : 'deny',
  );

  React.useEffect(() => {
    onChangeRow(
      index,
      new Role(
        row.name,
        selectedValue === 'grant',
        selectedValue === 'deny',
        row.grant,
        row.department,
      ),
    );
  }, [selectedValue]);

  const handleChangeCheckValue = React.useCallback((e) => {
    setSelectedValue(e.target.value);
  }, []);

  return (
    <React.Fragment>
      <TableRow className={className} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.grant}</TableCell>
        <TableCell align="left">{row.department}</TableCell>
        <TableCell align="center">
          <CustomInputRadio
            isCheck={selectedValue === 'grant'}
            onChange={handleChangeCheckValue}
            value="grant"
            name={`roleInputRadio-${row.name}${index}`}
          />
        </TableCell>
        <TableCell align="center">
          <CustomInputRadio
            isCheck={selectedValue === 'deny'}
            onChange={handleChangeCheckValue}
            value="deny"
            name={`roleInputRadio-${row.name}${index}`}
            checkColor="#E13D3D"
          />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface Props {
  data: Role[];
  onChangeRow: Function;
}

const TableSettingRole: React.FC<Props> = ({ data, onChangeRow }) => {
  const handleClickSetRole = (e) => {
    console.log(data);
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
      <Box className="flex justify-end items-end my-6">
        <CustomButton
          onClick={handleClickSetRole}
          className="py-3 px-6"
          bgButtonColor="#554CFF"
          color="#ffffff"
          label="Set Role"
          isBeforeIcon={true}
          beforeIcon={<Icon icon="plus" rawColor="#ffffff" />}
        />
      </Box>
    </Box>
  );
};

export default TableSettingRole;