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

const UserBlacklistContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(0);

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
        header: () => <span>user_email</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: '',
        accessorFn: (row) => row,
        id: 'delete',
        cell: (info) => {
          return (
            <Tooltip title="Delete" placement="right">
              <IconButton onClick={() => setShowModal(2)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          );
        },
        header: () => <span>delete</span>,
        footer: (props) => props.column.id,
      },
    ],
    [],
  );

  const rowClick = (row: any) => {
    console.log('data delete', row);
  };

  return (
    <Layout.MainQueryClient
      headTitle={t('User Blacklist')}
      isHaveHeader
      onClickAdd={() => setShowModal(1)}>
      <div className="px-4">
        <PageCrudData
          disabledRowOnClick={true}
          api="/v1/api/user/blacklist"
          columns={columns}
        />
      </div>
      <AddBlackListModal isOpen={showModal === 1} onClose={() => setShowModal(0)} />
      <ModalConfirmDelete
        title="Add email blacklist"
        isOpen={showModal === 2}
        onClose={() => setShowModal(0)}
        onConfirm={() => {
          console.log('confirm ...');
          setShowModal(0);
        }}
      />
    </Layout.MainQueryClient>
  );
};
export default UserBlacklistContainer;
