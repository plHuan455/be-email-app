import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

import './styles.scss';
import CustomButton from '@components/atoms/CustomButton';
import { PermissionResponse } from '@api/permission/interface';
import Row from './Row';
import Loading from '@components/atoms/Loading';
import LoadingButton from '@mui/lab/LoadingButton';
import { rem } from '@utils/functions';

interface Props {
  isLoading?: boolean;
  isButtonLoading?: boolean;
  data?: PermissionResponse[];
  dataStates: {[key: number]: string};
  buttonLabel?: string;
  onChangeRow: (id: number, name?: string) => void;
  updatePermission: Function;
}

const TableSettingRole: React.FC<Props> = ({
  isLoading = false,
  isButtonLoading = false,
  buttonLabel = '',
  data = [],
  dataStates,
  onChangeRow,
  updatePermission,
}) => {
  console.log(
    '🚀 ~ file: TableSettingRole/index.ts ~ line 87 ~ TableSettingRole',
    data,
  );

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
            {isLoading && (
              <TableRow>
                <TableCell sx={{borderBottom: 0}} align='center' colSpan={5}>
                  <Loading size='xs' isLoading/>
                </TableCell>
              </TableRow>
            )}
            {!isLoading && data.map((row, index) => (
              <Row
                isActive={dataStates.hasOwnProperty(row.id)}
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
      {/* {data.length > 0 && (
        <Box className="flex justify-end items-end my-6">
          <LoadingButton
            onClick={() => updatePermission()}
            className="py-3 px-6"
            bgButtonColor="#554CFF"
            color="#ffffff"
            label={buttonLabel}
          />
        </Box> */}
        { data.length !== 0 && <Box className="flex justify-end items-end my-6">
          <LoadingButton
            variant='outlined'
            loading={isButtonLoading}
            loadingPosition='end'
            endIcon={<SyncAltIcon />}
            sx={{
              backgroundColor: '#554CFF',
              px: rem(12), 
              py: rem(4), 
              color: '#ffffff',
              '&:hover': {
                color: '#554CFF'
              },
              '&.MuiLoadingButton-loading': {
                backgroundColor: '#7e77f8',
                color: '#ffffff'
              }
            }}
            onClick={() => updatePermission()}
          >
            {buttonLabel}
          </LoadingButton>
        </Box>}
    </Box>
  );
};

export default TableSettingRole;
