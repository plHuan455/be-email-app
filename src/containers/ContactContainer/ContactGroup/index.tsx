import TableActionsMenu from '@components/molecules/TableActionsMenu';
import ContactGroup from '@components/organisms/Contact/ContactGroup';
import { Avatar } from '@mui/material';
import { GridColDef, GridRowId } from '@mui/x-data-grid';
import { rem } from '@utils/functions';
import React, { useMemo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';
import Icon from '@components/atoms/Icon';

const ContactGroupContainer = () => {
  // useSelector
  const { contactGroupsList } = useSelector((state: RootState) => state.contact);

  const columns = useMemo(() => {
    const colsDef: GridColDef[] = [
      {
        field: 'id',
        headerName: 'ID',
        align: 'center',
        headerAlign: 'center',
        width: 60,
      },
      {
        field: 'group_name',
        headerName: 'Group Name',
        align: 'center',
        headerAlign: 'center',
        flex: 1,
      },
      {
        field: 'members',
        headerName: 'Amount',
        align: 'center',
        headerAlign: 'center',
        flex: 1,
        renderCell(params) {
          return (
            <div className="flex">
              <Icon className="pr-2" icon="people" />
              <span>{params.value.length}</span>
            </div>
          );
        },
      },
      {
        field: 'actions',
        headerName: 'Actions',
        align: 'center',
        headerAlign: 'center',
        flex: 1,
        renderCell: (params) => (
          // <Tooltip title="Delete" placement="right">
          //   <IconButton onClick={handleClickDelete(params.id)}>
          //     <DeleteIcon />
          //   </IconButton>
          // </Tooltip>
          <TableActionsMenu
            sx={{ maxWidth: rem(52), minWidth: rem(52) }}
            options={[
              // { value: 0, label: 'Update', icon: <UpdateIcon /> },
              { value: 1, label: 'Delete', icon: <DeleteIcon /> },
            ]}
            onItemClick={(value) => {
              if (value === 0) {
                console.log('update click');
                // onDepartmentUpdateClick(row.id);
              }
              if (value === 1) {
                handleClickDelete(params.id);
                // onDepartmentDeleteClick(row.id);
              }
            }}
          />
        ),
      },
    ];

    return colsDef;
  }, [contactGroupsList]);

  // Handler FNC
  const handleClickDelete = (id: GridRowId) => {
    console.log(id);
  };

  return (
    <>
      <ContactGroup
        columns={columns}
        rows={contactGroupsList}
        handleCellClick={() => console.log('cell click')}
      />
    </>
  );
};

export default ContactGroupContainer;
