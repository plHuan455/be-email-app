import TableActionsMenu from '@components/molecules/TableActionsMenu';
import ContactGroup from '@components/organisms/Contact/ContactGroup';
import { Avatar, Box, Switch, Typography } from '@mui/material';
import { GridColDef, GridRowId } from '@mui/x-data-grid';
import { rem } from '@utils/functions';
import React, { useEffect, useMemo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import ShareIcon from '@mui/icons-material/Share';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';
import Icon from '@components/atoms/Icon';
import useLocalStorage from '@hooks/useLocalStorage';
import { deleteContactGroups, setContactGroups } from '@redux/Contact/reducer';
import { useNavigate } from 'react-router-dom';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
import { toast } from 'react-toastify';
import PageCrudData from '@components/organisms/PageCrudData';
import { ColumnDef } from '@tanstack/react-table';
import { ContactResponse } from '@api/contact/interface';
import { ContactSharingGroupsType } from '../ContactSharingGroupsContainer';
import { isEmpty } from 'lodash';

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

  const columns = useMemo<ColumnDef<ContactSharingGroupsType, any>[]>(() => {
    return [
      {
        accessorKey: 'id',
        accessorFn: (row) => row.id,
        id: 'id',
        cell: (info) => info.getValue(),
        header: () => <Typography>Id</Typography>,
        footer: (props) => props.column.id,
        size: 100,
      },
      {
        accessorKey: 'name',
        accessorFn: (row) => row.group_name,
        id: 'name',
        cell: (info) => `${info.getValue()}`,
        header: () => <span>Name</span>,
        footer: (props) => props.column,
      },
      {
        accessorKey: 'members',
        accessorFn: (row) => row.members,
        id: 'email',
        cell: (info) => info.getValue(),
        header: () => <span>Contacts</span>,
        footer: (props) => props.column,
      },
      {
        accessorKey: 'share',
        accessorFn: (row) => row.share_with,
        id: 'share',
        cell: (info) => <Switch size="small" checked={!isEmpty(info.getValue())} />,
        header: () => (
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Shared
          </Typography>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'action',
        accessorFn: (row) => row.id,
        id: 'actions',
        cell: (info) => (
          <Box sx={{ display: 'fex', justifyContent: 'center' }}>
            <TableActionsMenu
              options={[
                { label: 'update', value: 0, icon: <UpdateIcon /> },
                { label: 'delete', value: 1, icon: <DeleteIcon /> },
              ]}
              onClick={(e) => e.stopPropagation()}
              onClose={(e) => e.stopPropagation()}
              onItemClick={(value) => {
                if (value === 0) handleUpdateClick(Number(info.getValue()));
                if (value === 1) handleDeleteClick(Number(info.getValue()));
              }}
            />
          </Box>
        ),
        header: () => (
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Actions
          </Typography>
        ),
        footer: (props) => props.column.id,
      },
    ];
  }, []);

  const handleUpdateClick = (id: number) => {
    navigate(`edit/${id}`);
  };

  const handleDeleteClick = (id: number) => {
    setAlertData(
      '',
      _renderAlertSelectedContact(id, `Are you sure want to "Delete" this contact?`),
      () => {
        // deleteContactMutate(id);
        onClose();
      },
      () => {},
    );
  };

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
      {/* <ContactGroup
        columns={columns}
        rows={contactGroupsList}
        handleCellClick={handleCellClick}
      /> */}
      <Box
        sx={{
          '& .MuiTableCell-root': { verticalAlign: 'top' },
          '& .MuiTableRow-root:not(.MuiTableRow-head)': {
            cursor: 'pointer',
          },
        }}>
        <PageCrudData
          // refreshKey={queryKey}
          disabledRowOnClick={false}
          api={'add-when-have-api'}
          columns={columns}
          rowOnClick={(row) => {}}
        />
      </Box>
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
