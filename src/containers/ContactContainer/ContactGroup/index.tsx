import TableActionsMenu from '@components/molecules/TableActionsMenu';
import ContactGroup from '@components/organisms/Contact/ContactGroup';
import { Avatar, Box } from '@mui/material';
import { GridColDef, GridRowId } from '@mui/x-data-grid';
import { rem } from '@utils/functions';
import React, { useEffect, useMemo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';
import Icon from '@components/atoms/Icon';
import useLocalStorage from '@hooks/useLocalStorage';
import { deleteContactGroups, setContactGroups } from '@redux/Contact/reducer';
import { useNavigate } from 'react-router-dom';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
import { toast } from 'react-toastify';

const ContactGroupContainer = () => {
  // useSelector
  const { contactGroupsList } = useSelector((state: RootState) => state.contact);
  // useDispatch
  const dispatch = useDispatch();
  // useLocalStorage
  const [localContactGroup] = useLocalStorage('contact-groups-list', undefined);
  // useNavigate
  const navigate = useNavigate();

  // useEffect
  useEffect(() => {
    if (localContactGroup) dispatch(setContactGroups(JSON.parse(localContactGroup)));
  }, [localContactGroup]);

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

  // useAlertDialog
  const {
    isOpen,
    isLoading,
    title,
    description,
    callback,
    onCloseCallBack,
    setAlertData,
    setIsLoading,
    onClose,
  } = useAlertDialog();

  // render FNC

  const _renderAlertSelectedContact = (id: GridRowId, alertLabel: string) => {
    const selectedContact = contactGroupsList.find((contact) => contact.id === +id);

    const { group_name } = selectedContact || {
      group_name: '',
    };

    return (
      <Box>
        <Box>
          <p>{alertLabel}</p>
        </Box>
        <Box>
          <p>
            <b>Group name:</b> <span>{`${group_name}`}</span>
          </p>
        </Box>
      </Box>
    );
  };

  // Handler FNC
  const handleClickDelete = (id: GridRowId) => {
    setAlertData(
      '',
      _renderAlertSelectedContact(id, `Are you sure want to "Delete" this contact?`),
      () => {
        dispatch(deleteContactGroups(id));
        onClose();
        toast.success('Delete successfully!');
      },
      () => {},
    );
  };

  const handleCellClick = (rowData) => {
    console.log('row data ------->', rowData);
    if (rowData.field === 'actions') return;
    navigate(`edit/${rowData.id}`);
  };

  return (
    <>
      <ContactGroup
        columns={columns}
        rows={contactGroupsList}
        handleCellClick={handleCellClick}
      />
      <AlertDialog
        isOpen={isOpen}
        descriptionLabel={description}
        onClose={onClose}
        titleLabel={title}
        onAgree={callback}
        onDisagree={onClose}
      />
    </>
  );
};

export default ContactGroupContainer;
