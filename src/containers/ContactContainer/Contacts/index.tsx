import Contacts from '@components/organisms/Contact/Contacts';
import useLocalStorage from '@hooks/useLocalStorage';
import { Avatar } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { RootState } from '@redux/configureStore';
import { setContactsList } from '@redux/Contact/reducer';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ContactsContainer = () => {
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
        headerName: 'Mail',
        align: 'center',
        headerAlign: 'center',
        flex: 1,
      },
    ];

    return colsDef;
  }, [contactsList]);

  //   Handler FNC
  const handleRowClick = (rowData) => {
    console.log('row data ------->', rowData);
  };

  return (
    <Contacts
      rows={contactsList}
      columns={columns}
      handleRowClick={handleRowClick}
    />
  );
};

export default ContactsContainer;
