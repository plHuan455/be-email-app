import { useTranslation } from '@@packages/localization/src';
import Icon from '@components/atoms/Icon';
import PageCrudData from '@components/organisms/PageCrudData';
import { IconButton, Tooltip } from '@mui/material';

import { ColumnDef } from '@tanstack/react-table';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Layout from '@layouts/Layout';
import AddBlackListModal from '../Modals/AddBlackList';
import ModalConfirmDelete from '../Modals/ConfirmDelete';
import { deleteEmailBlacklist } from '@api/blacklist';
import { toast } from 'react-toastify';

const UserBlacklistContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(0);
  const [refreshKey, setRefreshKey] = useState('currentRefreshKey');
  const [emailDelete, setEmailDelete] = useState('');

  const columns = React.useMemo<ColumnDef<any, any>[]>(
    () => [
      {
        accessorKey: '',
        accessorFn: (row) => row.id,
        id: 'id',
        cell: (info) => info.getValue(),
        header: () => <span>ID</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: '',
        accessorFn: (row) => row.user_email,
        id: 'user_email',
        cell: (info) => info.getValue(),
        header: () => <span>User email</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: '',
        accessorFn: (row) => row.user_email,
        id: 'delete',
        cell: (info) => {
          return (
            <Tooltip title="Delete" placement="right">
              <IconButton
                onClick={() => {
                  setEmailDelete(info.getValue());
                  setShowModal(2);
                }}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          );
        },
        header: () => <span>Delete</span>,
        footer: (props) => props.column.id,
      },
    ],
    [],
  );

  const handleSuccess = () => {
    setShowModal(0);
    setRefreshKey('changeRefreshKey');
  };

  const hanldeDeleteEmailBlacklist = async () => {
    try {
      // call create here
      const currentUserId = localStorage.getItem('current_id');
      const params = { user_email: emailDelete, user_id: Number(currentUserId) };

      await deleteEmailBlacklist(params);
      toast.success('Delete email from blacklist success!');
    } catch (error: any) {
      console.error(new Error(error));
      toast.error(error?.response?.message || 'Has Error');
    }
  };

  return (
    <Layout.MainQueryClient
      headTitle={t('User Blacklist')}
      isHaveHeader
      onClickAdd={() => setShowModal(1)}>
      <div className="px-4">
        <PageCrudData
          refreshKey={refreshKey}
          disabledRowOnClick={true}
          api="/v1/api/user/blacklist"
          columns={columns}
        />
      </div>
      <AddBlackListModal
        isOpen={showModal === 1}
        onClose={() => setShowModal(0)}
        onAddSuccess={handleSuccess}
      />
      <ModalConfirmDelete
        title="Add email blacklist"
        isOpen={showModal === 2}
        onClose={() => setShowModal(0)}
        onConfirm={hanldeDeleteEmailBlacklist}
      />
    </Layout.MainQueryClient>
  );
};
export default UserBlacklistContainer;
