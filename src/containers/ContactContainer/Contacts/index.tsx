import TableActionsMenu from '@components/molecules/TableActionsMenu';
import Contacts from '@components/organisms/Contact/Contacts';
import useLocalStorage from '@hooks/useLocalStorage';
import { Avatar, IconButton, Tooltip, Typography } from '@mui/material';
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
import PageCrudData from '@components/organisms/PageCrudData';
import { CONTACT_API } from '@constants/contactAPI';
import { ColumnDef } from '@tanstack/react-table';
import { ContactResponse } from '@api/contact/interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteContactService } from '@api/contact';
import ModalBase from '@components/atoms/ModalBase';
import { contactDummy } from '@assets/dummyData/contactDummy';
import ContactInfo from '@components/organisms/ContactInfo';
import dayjs from 'dayjs';

const ContactsContainer = () => {
  // useNavigate
  const queryKey = 'contact-container-get'
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // useDispatch
  const dispatch = useDispatch();

  // useSelector
  const { contactsList } = useSelector((state: RootState) => state.contact);

  // useLocalStorage
  const [localContactsList] = useLocalStorage('contacts-list', undefined);

  // To open contact info modal
  const [selectedContactModal, setSelectedContactModal] = useState<ContactResponse>();

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

  const {mutate: deleteContactMutate} = useMutation({
    mutationKey: ['contact-container-delete-contact'],
    mutationFn: deleteContactService,
    onSuccess: () => {
      toast.success('Delete successfully!');
      queryClient.invalidateQueries({queryKey: [queryKey]})
    },
    onError: () => {
      toast.error("Can't delete contact");
    }
  })

  const columns = useMemo<ColumnDef<ContactResponse, any>[]>(() => {
    return [
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
        accessorKey: 'name',
        accessorFn: (row) => ({firstName: row.first_name, lastName: row.last_name}),
        id: 'name',
        cell: (info) => `${info.getValue().firstName} ${info.getValue().lastName}`,
        header: () => <span>Name</span>,
        footer: (props) => props.column,
      },
      {
        accessorKey: 'email',
        accessorFn: (row) => row.email,
        id: 'email',
        cell: (info) => info.getValue(),
        header: () => <span>Email</span>,
        footer: (props) => props.column,
      },
      {
        accessorKey: 'phone',
        accessorFn: (row) => row.phone,
        id: 'phone',
        cell: (info) => info.getValue(),
        header: () => <span>Phone Number</span>,
        footer: (props) => props.column,
      },
      {
        accessorKey: 'action',
        accessorFn: (row) => row.id,
        id: 'actions',
        cell: (info) => (
          <Box sx={{display: 'fex', justifyContent: 'center'}}>
            <TableActionsMenu 
              options={[{label: 'update', value: 0, icon: <UpdateIcon />}, {label: 'delete', value: 1, icon: <DeleteIcon />}]}
              onClick={(e) => e.stopPropagation()}
              onClose={(e) => e.stopPropagation()}
              onItemClick={(value)=> {
                if(value === 0) handleUpdateClick(Number(info.getValue()))
                if(value === 1) handleDeleteClick(Number(info.getValue()));
              }}
            />
          </Box>
        ),
        header: () => <Typography variant="body2" sx={{textAlign: 'center'}}>Actions</Typography>,
        footer: (props) => props.column.id,
      },
    ]
  }, []);

  const handleUpdateClick = (id: number) => {
    navigate(`edit/${id}`)
  }

  const handleDeleteClick = (id: number) => {
    setAlertData(
      '',
      _renderAlertSelectedContact(id, `Are you sure want to "Delete" this contact?`),
      () => {
        deleteContactMutate(id);
        onClose();
      },
      () => { },
    );
  }

  //   Handler FNC
  // const handleCellClick = (rowData) => {
  //   console.log('row data ------->', rowData);
  //   if (rowData.field === 'actions') return;
  //   navigate(`edit/${rowData.id}`);
  // };

  // const handleClickDelete = (id: GridRowId) => {
  //   setAlertData(
  //     '',
  //     _renderAlertSelectedContact(id, `Are you sure want to "Delete" this contact?`),
  //     () => {
  //       dispatch(deleteContacts(id));
  //       onClose();
  //       toast.success('Delete successfully!');
  //     },
  //     () => { },
  //   );
  // };

  // render FNC

  const handleRowClick = (contact: ContactResponse) => {
    setSelectedContactModal(contact)
  }

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
      <Box sx={{
        '& .MuiTableCell-root': { verticalAlign: 'top' },
        '& .MuiTableRow-root:not(.MuiTableRow-head)': {
          cursor: 'pointer' 
        }
      }}
      >
        <PageCrudData
          refreshKey={queryKey}
          disabledRowOnClick={false}
          api={CONTACT_API}
          columns={columns}
          rowOnClick={(row) => handleRowClick(row.original)}
        />
      </Box>
      <ModalBase 
        isOpen={Boolean(selectedContactModal)} 
        title="Contact detail" 
        submitLabel='' 
        onClose={() => setSelectedContactModal(undefined)}
      >
        <Box sx={{maxHeight: "80vh", maxWidth: "80vw", width: rem(400), pb: rem(20)}}>
          <ContactInfo 
            avatar={selectedContactModal?.avatar ?? ''}
            firstName={selectedContactModal?.first_name ?? ''}
            lastName={selectedContactModal?.last_name ?? ''}
            email={selectedContactModal?.email ?? ''}
            phone={selectedContactModal?.phone ?? ''}
            createdAt={dayjs(selectedContactModal?.created_at).format('lll')}
          />
        </Box>
      </ModalBase>
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
