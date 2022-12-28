import TableActionsMenu from '@components/molecules/TableActionsMenu';
import Contacts from '@components/organisms/Contact/Contacts';
import useLocalStorage from '@hooks/useLocalStorage';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import { GridColDef, GridRowId } from '@mui/x-data-grid';
import { RootState } from '@redux/configureStore';
import { deleteContacts, setContactsList } from '@redux/Contact/reducer';
import { rem } from '@utils/functions';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { useNavigate } from 'react-router-dom';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
import { Box } from '@mui/system';
import { toast } from 'react-toastify';

const ContactsContainer = () => {
  // useNavigate
  const navigate = useNavigate();

  // useDispatch
  const dispatch = useDispatch();

  // useSelector
  const { contactsList } = useSelector((state: RootState) => state.contact);

  // useLocalStorage
  const [localContactsList] = useLocalStorage('contacts-list', undefined);

  // useEffect
  useEffect(() => {
    if (localContactsList) dispatch(setContactsList(JSON.parse(localContactsList)));
  }, [localContactsList]);

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
        field: 'avatar',
        headerName: 'Avatar',
        align: 'center',
        headerAlign: 'center',
        flex: 1,
        renderCell: (params) =>
          params.value ? (
            <Avatar src={params.value} />
          ) : (
            <img
              className="img-signature"
              src={
                'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000'
              }
            />
          ),
      },
      {
        field: 'first_name',
        headerName: 'First Name',
        align: 'center',
        headerAlign: 'center',
        flex: 1,
      },
      {
        field: 'last_name',
        headerName: 'Last Name',
        align: 'center',
        headerAlign: 'center',
        flex: 1,
      },
      {
        field: 'mail',
        headerName: 'Email',
        align: 'center',
        headerAlign: 'center',
        flex: 1,
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
  }, [contactsList]);

  //   Handler FNC
  const handleCellClick = (rowData) => {
    console.log('row data ------->', rowData);
    if (rowData.field === 'actions') return;
    navigate(`edit/${rowData.id}`);
  };

  const handleClickDelete = (id: GridRowId) => {
    setAlertData(
      '',
      _renderAlertSelectedContact(id, `Are you sure want to "Delete" this contact?`),
      () => {
        dispatch(deleteContacts(id));
        onClose();
        toast.success('Delete successfully!');
      },
      () => {},
    );
  };

  // render FNC

  const _renderAlertSelectedContact = (id: GridRowId, alertLabel: string) => {
    const selectedContact = contactsList.find((contact) => contact.id === +id);

    const { first_name, last_name, mail } = selectedContact || {
      first_name: '',
      last_name: '',
      mail: '',
    };

    return (
      <Box>
        <Box>
          <p>{alertLabel}</p>
        </Box>
        <Box>
          <p>
            <b>Full Name:</b> <span>{`${first_name} ${last_name}`}</span>
          </p>
          <p>
            <b>Email:</b> <span>{`${mail}`}</span>
          </p>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Contacts
        rows={contactsList}
        columns={columns}
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

export default ContactsContainer;
