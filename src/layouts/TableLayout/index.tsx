import Loading from '@components/atoms/Loading';
import SingleAvatar from '@components/atoms/SingleAvatar';
import TableActionsMenu from '@components/molecules/TableActionsMenu';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from '@mui/material';
import React, { PropsWithChildren } from 'react';

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

export interface tableHead {
  align: 'left' | 'right' | 'inherit' | 'center' | 'justify';
  label: string;
}

interface Props extends PropsWithChildren {
  tableHeads: tableHead[];
  page: number;
  limit: number;
  total: number;
  maxHeight?: number;
  isLoading?: boolean;
  onDelete?: (id: number) => void;
  onUpdate?: (id: number) => void;
  onChangePage: (page: number) => void;
  onChangeLimit: (limit: number) => void;
}

const TableLayout: React.FC<Props> = ({
  children,
  tableHeads,
  page,
  limit,
  total,
  isLoading = false,
  maxHeight,
  onDelete,
  onUpdate,
  onChangePage,
  onChangeLimit,
}) => {
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
      onDelete(id);
    }
  };

  const handleUpdate = (id: number) => {
    if (onUpdate) onUpdate(id);
  };

  return (
    <TableContainer
      className="managerTable flex-1 overflow-scroll mb-4 p-0"
      sx={{
        maxHeight: maxHeight ? maxHeight + 'px' : 'auto',
      }}
      component={Paper}>
      <Table
        stickyHeader
        sx={{ minWidth: 500 }}
        aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={8}
              style={{
                color: '#778397',
                fontSize: 14,
              }}>{`${total} employees in total`}</TableCell>
          </TableRow>
          <TableRow>
            {tableHeads.map((head) => (
              <TableCell align={head.align}>{head.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        {children}
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
  );
};

export default TableLayout;
