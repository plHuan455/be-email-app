import Contacts from '@components/organisms/Contact/Contacts';
import useLocalStorage from '@hooks/useLocalStorage';
import { Avatar } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useMemo, useState } from 'react';
import { ContactType } from './interface';

const ContactsContainer = () => {
  // useLocalStorage
  const [contactsLocal] = useLocalStorage('contacts-list', contactsList);

  // useState
  const [listSign, setListSign] = useState(contactsLocal);

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
    <Contacts rows={listSign} columns={columns} handleRowClick={handleRowClick} />
  );
};

const contactsList: ContactType[] = [
  {
    id: 1,
    avatar: '',
    first_name: 'Contact',
    last_name: 'Name 1',
    mail: 'contact1@mail.mail',
  },
  {
    id: 2,
    avatar: '',
    first_name: 'Contact',
    last_name: 'Name 2',
    mail: 'contact2@mail.mail',
  },
  {
    id: 3,
    avatar: '',
    first_name: 'Contact',
    last_name: 'Name 3',
    mail: 'contact3@mail.mail',
  },
];

export default ContactsContainer;
