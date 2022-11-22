import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import SingleAvatar from '@components/atoms/SingleAvatar';
import { Manager } from '@page/Manager/interface';
import { TableHead } from '@mui/material';

import './styles.scss';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const rows = [
  new Manager('', 'adep adep', 'adep@adep.com', 'Marketing', 'Manager 02'),
  new Manager(
    '',
    'Anh Nguyen The',
    'theanh.nguyen@theanh.com',
    'Front End',
    'Admin',
  ),
  new Manager('', 'Anh Tran', 'anh.tran@test.com', 'Back End', 'Employee'),
  new Manager('', 'Bùi Thùy Thị Minh', 'minhthuy.bui@test.com', 'CS', 'Manager'),
  new Manager(
    '',
    'Bùi Phạn Hương Giang',
    'huonggiang.bui@test.com',
    'CS',
    'Blocked',
  ),
  new Manager('', 'CSKH iBe', 'cskh', 'Front End', 'Employee'),
  new Manager('', 'adep adep', 'adep@adep.com', 'Marketing', 'Manager 02'),
  new Manager(
    '',
    'Anh Nguyen The',
    'theanh.nguyen@theanh.com',
    'Front End',
    'Admin',
  ),
  new Manager('', 'Anh Tran', 'anh.tran@test.com', 'Back End', 'Employee'),
  new Manager('', 'Bùi Thùy Thị Minh', 'minhthuy.bui@test.com', 'CS', 'Manager'),
  new Manager(
    '',
    'Bùi Phạn Hương Giang',
    'huonggiang.bui@test.com',
    'CS',
    'Blocked',
  ),
  new Manager('', 'CSKH iBe', 'cskh', 'Front End', 'Employee'),
  new Manager('', 'adep adep', 'adep@adep.com', 'Marketing', 'Manager 02'),
  new Manager(
    '',
    'Anh Nguyen The',
    'theanh.nguyen@theanh.com',
    'Front End',
    'Admin',
  ),
  new Manager('', 'Anh Tran', 'anh.tran@test.com', 'Back End', 'Employee'),
  new Manager('', 'Bùi Thùy Thị Minh', 'minhthuy.bui@test.com', 'CS', 'Manager'),
  new Manager(
    '',
    'Bùi Phạn Hương Giang',
    'huonggiang.bui@test.com',
    'CS',
    'Blocked',
  ),
  new Manager('', 'CSKH iBe', 'cskh', 'Front End', 'Employee'),
  new Manager('', 'adep adep', 'adep@adep.com', 'Marketing', 'Manager 02'),
  new Manager(
    '',
    'Anh Nguyen The',
    'theanh.nguyen@theanh.com',
    'Front End',
    'Admin',
  ),
  new Manager('', 'Anh Tran', 'anh.tran@test.com', 'Back End', 'Employee'),
  new Manager('', 'Bùi Thùy Thị Minh', 'minhthuy.bui@test.com', 'CS', 'Manager'),
  new Manager(
    '',
    'Bùi Phạn Hương Giang',
    'huonggiang.bui@test.com',
    'CS',
    'Blocked',
  ),
  new Manager('', 'CSKH iBe', 'cskh', 'Front End', 'Employee'),
].sort((a, b) => (a.name < b.name ? -1 : 1));

export default function TableManagerEmployee() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer className="managerTable" component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={5}
              style={{
                color: '#778397',
                fontSize: 14,
              }}>{`${rows.length} employees in total`}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            <TableRow
              className={`managerRow ${row.role === 'Blocked' && 'blocked'}`}
              key={index}>
              <TableCell
                className="managerAvatar"
                style={{ width: 50 }}
                component="th"
                scope="row">
                <SingleAvatar
                  src={row.avatar}
                  abbreviations={row.getAbbreviations()}
                  isAdminRole={row.role === 'Admin'}
                />
              </TableCell>
              <TableCell className="managerName" align="left">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 400, color: '#778397' }} align="left">
                {row.dissectionMail()}
              </TableCell>
              <TableCell style={{ width: 200 }} align="left">
                {row.position}
              </TableCell>
              <TableCell style={{ width: 100 }} align="left">
                {row.role}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={5} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={5}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
