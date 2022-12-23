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
import { Department } from '@page/Manager/interface';

import './styles.scss';
import Icon from '@components/atoms/Icon';
import { rem } from '@utils/functions';
import TableActionsMenu from '@components/molecules/TableActionsMenu';
import TableManagerEmployeeContainer from '@containers/TableManagerEmployeeContainer';
import Loading from '@components/atoms/Loading';

interface TableManagerDepartmentProps {
  isLoading?: boolean;
  departmentList: Department[];
  onEmployeeDeleteClick: (id: number) => void;
  onEmployeeUpdateClick: (id: number) => void;
  onDepartmentDeleteClick: (id: number) => void;
  onDepartmentUpdateClick: (id: number) => void;
}

interface RowProps {
  isShow: boolean;
  onChangeIsShow: () => void;
  row: Department;
  className: string;
  onEmployeeUpdateClick: (id: number) => void;
  onEmployeeDeleteClick: (id: number) => void;
  onDepartmentUpdateClick: (id: number) => void;
  onDepartmentDeleteClick: (id: number) => void;
}

function Row({
  isShow,
  onChangeIsShow,
  row,
  className,
  onEmployeeUpdateClick,
  onEmployeeDeleteClick,
  onDepartmentDeleteClick,
  onDepartmentUpdateClick,
}: RowProps) {
  return (
    <React.Fragment>
      <TableRow className={className} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => onChangeIsShow()}>
            {isShow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
            sx={{ maxWidth: rem(52), minWidth: rem(52) }}
            options={[
              { value: 0, label: 'Update', icon: <UpdateIcon /> },
              { value: 1, label: 'Delete', icon: <DeleteIcon /> },
            ]}
            onItemClick={(value) => {
              if (value === 0) {
                onDepartmentUpdateClick(row.id);
              }
              if (value === 1) {
                onDepartmentDeleteClick(row.id);
              }
            }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isShow} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Employees
              </Typography>
              <TableManagerEmployeeContainer
                data={row.employees}
                onUpdate={onEmployeeUpdateClick}
                onDelete={onEmployeeDeleteClick}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function TableManagerDepartment({
  isLoading = false,
  departmentList,
  onEmployeeUpdateClick,
  onEmployeeDeleteClick,
  onDepartmentUpdateClick,
  onDepartmentDeleteClick,
}: TableManagerDepartmentProps) {
  const [indexShow, setIndexShow] = React.useState<number>();

  const handleOnChangeIsShow = (index: number) => {
    if (index === indexShow) setIndexShow(undefined);
    else setIndexShow(index);
  };

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
          {isLoading && (
            <TableRow>
              <TableCell align="center" colSpan={5}>
                <Loading isLoading={isLoading} size="xs" />
              </TableCell>
            </TableRow>
          )}
          {!isLoading && departmentList.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                There is no department
              </TableCell>
            </TableRow>
          )}
          {!isLoading &&
            departmentList.map((row, index) => (
              <Row
                isShow={indexShow === index}
                onChangeIsShow={() => handleOnChangeIsShow(index)}
                className="managerDepartmentRow"
                key={row.name}
                row={row}
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
