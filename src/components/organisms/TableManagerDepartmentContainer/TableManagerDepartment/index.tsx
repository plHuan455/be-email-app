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
import { Department, Manager } from '@page/Manager/interface';
import TableManagerEmployee from '@components/organisms/TableManagerEmployeeContainer/TableManagerEmployee';

import './styles.scss';
import Icon from '@components/atoms/Icon';

const rows = [
  new Department(
    'cs',
    3,
    'cs@',
    [
      new Manager('', 'Bùi Thùy Thị Minh', 'minhthuy.bui@test.com', 'CS', 'Manager'),
      new Manager(
        '',
        'Bùi Phạn Hương Giang',
        'huonggiang.bui@test.com',
        'CS',
        'Blocked',
      ),
    ],
    '',
  ),
  new Department(
    'IT Support',
    3,
    'it-support@',
    [
      new Manager(
        '',
        'Anh Nguyen The',
        'theanh.nguyen@theanh.com',
        'Front End',
        'Admin',
      ),
      new Manager('', 'Anh Tran', 'anh.tran@test.com', 'Back End', 'Employee'),
    ],
    '',
  ),
];

function Row(props: { row: Department; className: string }) {
  const { row, className } = props;
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
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Employees
              </Typography>
              <TableManagerEmployee data={row.employees} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function TableManagerDepartment() {
  return (
    <TableContainer className="tableDepartment" component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Number</TableCell>
            <TableCell align="left">Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell component="th" scope="row" colSpan={3}>
              ibenefit.vn
            </TableCell>
            <TableCell align="left">all@</TableCell>
          </TableRow>
          {rows.map((row) => (
            <Row className="managerDepartmentRow" key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
