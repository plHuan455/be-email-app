import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
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
import { Button, TableHead } from '@mui/material';

import './styles.scss';
import { rem } from '@utils/functions';
import TableActionsMenu from '@components/molecules/TableActionsMenu';
import Loading from '@components/atoms/Loading';

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

interface Props {
  page: number;
  limit: number;
  total: number;
  isLoading?: boolean;
  data: Manager[];
  onDelete?: (id: number) => void;
  onUpdate?: (id: number) => void;
  onChangePage: (page: number) => void;
  onChangeLimit: (limit: number) => void;
}

const TableManagerEmployee: React.FC<Props> = ({ 
  data, 
  page,
  limit,
  total,
  isLoading = false,
  onDelete,
  onUpdate,
  onChangePage,
  onChangeLimit 
}) => {
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = limit - data.length;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChangeLimit(parseInt(event.target.value, 10));
  };

  const handleDelete = (id: number) => {
    if (onDelete) {
      onDelete(id)
    }
  }

  const handleUpdate = (id: number) => {
    if (onUpdate) onUpdate(id);
  }

  return (
    <>
      <TableContainer className="managerTable" component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={5}
                style={{
                  color: '#778397',
                  fontSize: 14,
                }}>{`${data.length} employees in total`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Avatar</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Position</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell align="center" colSpan={6} height={53 * limit}>
                  <Loading isLoading size='xs'/>
                </TableCell>
              </TableRow>
            )}
            {
              data.length === 0 && !isLoading && (
              <TableRow>
                <TableCell align="center" colSpan={6} height={53 * limit} sx={{color: 'rgb(148 148 148 / 87%)'}}>
                  There is no employee
                </TableCell>
              </TableRow>
            )}
            {!isLoading && data.map((row, index) => (
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
                    isAdminRole={row.role === 'ADMIN'}
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
                <TableCell align="center">
                  <TableActionsMenu
                    sx={{ maxWidth: rem(52), minWidth: rem(52) }}
                    options={[{ value: 0, label: 'Update', icon: <UpdateIcon /> }, { value: 1, label: 'Delete', icon: <DeleteIcon /> }]}
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
            ))}
            {!isLoading && data.length !== 0 && emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={5}
                count={total}
                rowsPerPage={limit}
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
    </>
  );
};

export default TableManagerEmployee;
