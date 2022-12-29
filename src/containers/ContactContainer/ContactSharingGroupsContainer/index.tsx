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
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
import { Box } from '@mui/system';
import { toast } from 'react-toastify';
import { ContactType } from '../Contacts/interface';
import Icon from '@components/atoms/Icon';
import ContactSharingGroups from '@components/organisms/Contact/ContactSharingGroups';

export interface ContactSharingGroupsType {
  id: number;
  group_name: string;
  members: ContactType[];
  share_by: string;
}

const ContactSharingGroupsContainer = () => {
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
        field: 'share_by',
        headerName: 'Share By',
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
              { value: 0, label: 'Share', icon: <ShareIcon /> },
              { value: 1, label: 'Delete', icon: <DeleteIcon /> },
            ]}
            onItemClick={(value) => {
              if (value === 0) {
                console.log('Share click');
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
      <ContactSharingGroups
        rows={contactSharingGroups}
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

const membersDefault: ContactType[] = [
  {
    id: 1,
    avatar: '',
    first_name: 'Contact',
    last_name: 'Name 1',
    mail: 'contact@mail.com',
  },
  {
    id: 2,
    avatar: '',
    first_name: 'Contact',
    last_name: 'Name 2',
    mail: 'contact2@mail.com',
  },
  {
    id: 3,
    avatar: '',
    first_name: 'Contact',
    last_name: 'Name 3',
    mail: 'contact3@mail.com',
  },
];

const contactSharingGroups: ContactSharingGroupsType[] = [
  {
    id: 1,
    group_name: 'Group Sharing 1',
    members: membersDefault,
    share_by: 'giangemployee@notification.trade',
  },
  {
    id: 2,
    group_name: 'Group Sharing 2',
    members: membersDefault,
    share_by: 'giangemployee2@notification.trade',
  },
  {
    id: 3,
    group_name: 'Group Sharing 3',
    members: membersDefault,
    share_by: 'giangemployee3@notification.trade',
  },
];

export default ContactSharingGroupsContainer;
