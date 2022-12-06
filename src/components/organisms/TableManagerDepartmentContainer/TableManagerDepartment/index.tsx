import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
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
import { Department, Manager } from '@page/Manager/interface';
import TableManagerEmployee from '@components/organisms/TableManagerEmployeeContainer/TableManagerEmployee';

import './styles.scss';
import Icon from '@components/atoms/Icon';
import { Button, Divider, Menu, MenuItem } from '@mui/material';
import { rem } from '@utils/functions';
import TableActionsMenu from '@components/molecules/TableActionsMenu';

interface TableManagerDepartmentProps {
  departmentList: Department[];
  onEmployeeDeleteClick: (id: number) => void;
  onEmployeeUpdateClick: (id: number) => void;
  onDepartmentDeleteClick: (id: number) => void;
  onDepartmentUpdateClick: (id: number) => void;
}

interface RowProps {
  row: Department;
  className: string;
  onEmployeeUpdateClick: (id: number) => void;
  onEmployeeDeleteClick: (id: number) => void;
  onDepartmentUpdateClick: (id: number) => void;
  onDepartmentDeleteClick: (id: number) => void;
}

function Row({
  row,
  className,
  onEmployeeUpdateClick,
  onEmployeeDeleteClick,
  onDepartmentDeleteClick,
  onDepartmentUpdateClick,
}: RowProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow className={className} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {row.name}
        </TableCell>
        <TableCell align="left">{row.description}</TableCell>
        <TableCell align="left">
          <div className="flex">
            <Icon className="pr-2" icon="people" />
            <span>{row.number}</span>
          </div>
        </TableCell>
        <TableCell align="left">{row.address}</TableCell>
        <TableCell align="center">
          <TableActionsMenu
            sx={{maxWidth: rem(52), minWidth: rem(52)}}
            options={[{value: 0, label: 'Update', icon: <UpdateIcon />}, {value: 1, label: 'Delete', icon: <DeleteIcon />}]}
            onItemClick={(value) => {
              if(value === 0) {
                onDepartmentUpdateClick(row.id);
              }
              if(value === 1) {
                onDepartmentDeleteClick(row.id);
              }
            }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Employees
              </Typography>
              <TableManagerEmployee data={row.employees} onUpdate={onEmployeeUpdateClick} onDelete={onEmployeeDeleteClick} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function TableManagerDepartment({
  departmentList,
  onEmployeeUpdateClick,
  onEmployeeDeleteClick,
  onDepartmentUpdateClick,
  onDepartmentDeleteClick
}: TableManagerDepartmentProps) {
  return (
    <TableContainer className="tableDepartment" component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Number</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell component="th" scope="row" colSpan={3}>
              ibenefit.vn
            </TableCell>
            <TableCell align="left">all@</TableCell>
          </TableRow>
          {departmentList.map((row) => (
            <Row
              className="managerDepartmentRow"
              key={row.name} row={row}
              onEmployeeUpdateClick={onEmployeeUpdateClick}
              onEmployeeDeleteClick={onEmployeeDeleteClick}
              onDepartmentUpdateClick={onDepartmentUpdateClick}
              onDepartmentDeleteClick={onDepartmentDeleteClick}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
