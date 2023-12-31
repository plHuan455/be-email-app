import TableActionsMenu from "@components/molecules/TableActionsMenu";
import { Box, Checkbox, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { rem } from "@utils/functions";
import { useMemo } from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { ColumnDef } from "@tanstack/react-table";
import PageCrudData from "@components/organisms/PageCrudData";
import { SignatureResponse } from "@api/user/interface";

export interface SignatureTableItemTypes {
  name: string;
  id: number;
  htmlString: string;
}

interface SignatureTableProps {
  selectedId?: number,
  api: string;
  queryKey: string;
  onCheckboxClick: (value: SignatureResponse) => void;
  onDeleteActionClick: (id: number) => void;
  onUpdateActionClick: (id: number) => void;
}

const SignatureTable: React.FC<SignatureTableProps> = ({
  selectedId,
  queryKey,
  api,
  onCheckboxClick,
  onDeleteActionClick,
  onUpdateActionClick,
}) => {

  const columns = useMemo<ColumnDef<SignatureResponse, any>[]>(() => {
    return [
      {
        id: 'checkbox',
        accessorFn: (row) => row,
        cell: (info) => (
          <Box sx={{textAlign: 'center'}}>
            <Checkbox
              sx={{padding: 0}}
              checked={info.getValue().id === selectedId} 
              onChange={(_, checked) => onCheckboxClick(info.getValue())}
            />
          </Box>
        ),
        header: () => <Typography variant="body1" align="center">Selected</Typography>,
        footer: (props) => props.column.id,
        size: 100
      },
      {
        accessorKey: 'id',
        accessorFn: (row) => row.id,
        id: 'id',
        cell: (info) => info.getValue(),
        header: () => <Typography>Id</Typography>,
        footer: (props) => props.column.id,
        size: 100
      },
      {
        accessorKey: 'text_html',
        accessorFn: (row) => row.text_html,
        id: 'preview',
        cell: (info) => {
          return (
          <Box sx={{width: rem(100), height: rem(86), overflow: 'hidden'}}>
            <div 
              dangerouslySetInnerHTML={{__html: info.getValue()}} 
              style={{transform: 'scale(0.5)', transformOrigin: 'top left', width: rem(140)}}
            >
            </div>
          </Box>
        )},
        header: () => <span>Preview</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'name',
        accessorFn: (row) => row.name,
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        footer: (props) => props.column,
      },
      {
        accessorKey: '',
        accessorFn: (row) => row.id,
        id: 'actions',
        cell: (info) => (
          <Box sx={{display: 'fex', justifyContent: 'center'}}>
            <TableActionsMenu 
              options={[{label: 'update', value: 0, icon: <UpdateIcon />}, {label: 'delete', value: 1, icon: <DeleteIcon />}]}
              onClick={(e) => e.stopPropagation()}
              onClose={(e) => e.stopPropagation()}
              onItemClick={(value)=> {
                if(value === 0) onUpdateActionClick(Number(info.getValue()))
                if(value === 1) onDeleteActionClick(Number(info.getValue()));
              }}
            />
          </Box>
        ),
        header: () => <Typography variant="body2" sx={{textAlign: 'center'}}>Actions</Typography>,
        footer: (props) => props.column.id,
      },
    ]
  }, [selectedId]);
  
  return (
    <Box className="t-signatureTable px-6">
      <Box sx={{
        '& .MuiTableCell-root': { verticalAlign: 'top'},
        '& .MuiTableRow-root:not(.MuiTableRow-head)': {
          cursor: 'pointer'
        }
        }}
      >
        <PageCrudData
          refreshKey={queryKey}
          disabledRowOnClick={false}
          api={api}
          columns={columns}
          rowOnClick={(row) => {onCheckboxClick(row.original)}}
        />
      </Box>
    </Box>
  )
}

export default SignatureTable;