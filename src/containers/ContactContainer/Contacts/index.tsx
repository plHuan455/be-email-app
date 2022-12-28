import TableActionsMenu from '@components/molecules/TableActionsMenu';
import Contacts from '@components/organisms/Contact/Contacts';
import useLocalStorage from '@hooks/useLocalStorage';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import { GridColDef, GridRowId } from '@mui/x-data-grid';
import { RootState } from '@redux/configureStore';
import { setContactsList } from '@redux/Contact/reducer';
import { rem } from '@utils/functions';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { useNavigate } from 'react-router-dom';

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
          <Tooltip title="Delete" placement="right">
            <IconButton onClick={handleClickDelete(params.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ];

    // Handler FNC
    const handleClickDelete = (index: GridRowId) => (e) => {
      e.stopPropagation();
      console.log(index);
    };

    return colsDef;
  }, [contactsList]);

  //   Handler FNC
  const handleCellClick = (rowData) => {
    console.log('row data ------->', rowData);
    if (rowData.field === 'actions') return;
    navigate(`edit/${rowData.id}`);
  };

  return (
    <Contacts
      rows={contactsList}
      columns={columns}
      handleCellClick={handleCellClick}
    />
  );
};

export default ContactsContainer;
