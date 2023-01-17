import { useTranslation } from '@@packages/localization/src';
import Icon from '@components/atoms/Icon';
import PageCrudData from '@components/organisms/PageCrudData';

import { ColumnDef } from '@tanstack/react-table';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateIcon from '@mui/icons-material/Update';
import ModalBase from '@components/atoms/ModalBase';
import { useMutation } from '@tanstack/react-query';
import { deleteUser, getUserWithId, UserProfileResponse } from '@api/user';
import Loading from '@components/atoms/Loading';
import ClientProfileLayout from '@layouts/ClientProfile';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
import LayoutMoreActionMenu, {
  LayoutMoreActionInputType,
} from '@components/molecules/LayoutMoreActionsMenu';
import TableActionsMenu from '@components/molecules/TableActionsMenu';

import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { Avatar } from '@mui/material';
import { useCheckPermissions } from '@hooks/useCheckPermissions';
import { PERMISSIONS } from '@constants/constants';

const EmployeeContainer = () => {
  const [isOpenModel, setIsOpenModal] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState(Date.now());

  const navigate = useNavigate();
  const { t } = useTranslation();
  const params = useParams();

  const isCanUpdate = useCheckPermissions(PERMISSIONS.USER_SETTING_UPDATE);
  const isCanDelete = useCheckPermissions(PERMISSIONS.USER_SETTING_DELETE);

  console.log('permission', isCanUpdate);
  // useEffect(() => {
  // }, [isCanUpdate]);

  const {
    isLoading,
    callback,
    description,
    isOpen,
    isShowAgreeBtn,
    onClose,
    onCloseCallBack,
    setAlertData,
    setIsLoading,
    title,
  } = useAlertDialog();

  useEffect(() => {
    console.log('mount', params);
  });

  const onUpdateActionClick = (id: number) => {
    navigate(`/departments/department/${params.idDepartment}/employee/edit/${id}`);
  };

  const onDeleteActionClick = (data) => {
    setAlertData(
      '',
      <div>
        <p>Are you sure want to "Delete" this user?</p>
        <p>
          <b>First Name:</b>
          <span>{data.first_name}</span>
        </p>
        <p>
          <b>Last Name:</b>
          <span>{data.last_name}</span>
        </p>
      </div>,
      () => {
        mutateDeleteUser(data.id);
      },
    );
  };

  const tabItemClick = useCallback(
    (info) =>
      (value: string | number, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        console.log('permissions', isCanUpdate);
        if (value === 0)
          isCanUpdate
            ? onUpdateActionClick(Number(info.getValue().id))
            : toast(t(`You don't have permission!`));
        if (value === 1)
          isCanDelete
            ? onDeleteActionClick(info.getValue())
            : toast(t(`You don't have permission!`));
      },
    [isCanDelete, isCanUpdate],
  );

  const columns = React.useMemo<ColumnDef<any, any>[]>(
    () => [
      {
        accessorKey: '',
        accessorFn: (row) => row.first_name,
        id: 'first_name',
        cell: (info) => info.getValue(),
        header: () => <span>{t('First Name')}</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: '',
        accessorFn: (row) => row.last_name,
        id: 'last_name',
        cell: (info) => info.getValue(),
        header: () => <span>{t('Last Name')}</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: '',
        accessorFn: (row) => row.avatar,
        id: 'avatar',
        cell: (info) => (
          <div className="w-10 h-10 rounded-[50%] overflow-hidden border border-slate-200">
            <Avatar
              className="w-full h-full object-cover"
              src={`http://${info.getValue()}`}
            />
          </div>
        ),
        header: () => <span>{t('Avatar')}</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: '',
        accessorFn: (row) => row.email,
        id: 'email',
        cell: (info) => info.getValue(),
        header: () => <span>Email</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: '',
        accessorFn: (row) => row.phone_number,
        id: 'phone_number',
        cell: (info) => info.getValue(),
        header: () => <span>{t('Phone number')}</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: '',
        accessorFn: (row) => row.position,
        id: 'position',
        cell: (info) => info.getValue(),
        header: () => <span>{t('Position')}</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: '',
        accessorFn: (row) => row,
        id: 'actions',
        cell: (info) => {
          return (
            <TableActionsMenu
              options={[
                { label: 'update', value: 0, icon: <UpdateIcon /> },
                { label: 'delete', value: 1, icon: <DeleteIcon /> },
              ]}
              onClick={(e) => e.stopPropagation()}
              onClose={(e) => e.stopPropagation()}
              onItemClick={tabItemClick(info)}
            />
          );
        },
        header: () => <span>{t('Actions')}</span>,
        footer: (props) => props.column.id,
      },
    ],
    [isCanDelete, isCanUpdate],
  );

  const {
    mutate: mutateGetUserProfile,
    data: dataMutateGetUserProfile,
    isLoading: isLoadingGetUserProfile,
  } = useMutation({
    mutationKey: ['EmployeeContainer-get-user-profile'],
    mutationFn: getUserWithId,
  });

  const { mutate: mutateDeleteUser } = useMutation({
    mutationKey: ['EmployeeContainer-delete-user'],
    mutationFn: deleteUser,
    onSuccess: () => {
      setIsOpenModal(false);
      onClose();
      setRefreshKey(Date.now());
      toast.success(t('Delete Successfully!'));
    },
  });

  const handleOnUpdateClick = (id: number) => {
    setIsOpenModal(false);
    navigate(`/departments/department/${params.idDepartment}/employee/edit/${id}`);
  };

  const handleOnDeleteClick = (data: UserProfileResponse) => {
    setAlertData(
      '',
      <div>
        <p>Are you sure want to "Delete" this user?</p>
        <p>
          <b>First Name:</b>
          <span>{data.first_name}</span>
        </p>
        <p>
          <b>Last Name:</b>
          <span>{data.last_name}</span>
        </p>
      </div>,
      () => {
        mutateDeleteUser(data.id);
      },
    );
  };

  const rowClick = (row) => {
    if (row && row.original) {
      // tạm thời cho edit, sau này phần quyền sau
      // navigate(
      //   `/departments/department/${params.idDepartment}/employee/profile/${row.original.id}`,
      // );
      mutateGetUserProfile(row.original.id);
      setIsOpenModal(true);
    }
  };

  return (
    <div className="px-4 flex-1 pb-3">
      <PageCrudData
        refreshKey={params.idDepartment + refreshKey.toString()}
        disabledRowOnClick={false}
        api={`/rbac/department/users/${params.idDepartment}`}
        columns={columns}
        rowOnClick={(row) => rowClick(row)}
      />
      <AlertDialog
        descriptionLabel={description}
        isOpen={isOpen}
        onClose={onClose}
        titleLabel={title}
        isLoading={isLoading}
        onAgree={callback}
        onDisagree={onClose}
      />
      <ModalBase
        style={{ width: '80vw', minHeight: '50vh' }}
        isOpen={isOpenModel}
        title=""
        submitLabel=""
        onClose={() => setIsOpenModal(false)}>
        {isLoadingGetUserProfile ? (
          <Loading isLoading={isLoadingGetUserProfile} />
        ) : (
          <ClientProfileLayout
            clientProfileData={dataMutateGetUserProfile?.data}
            onDelete={isCanDelete ? handleOnDeleteClick : undefined}
            onEdit={isCanUpdate ? handleOnUpdateClick : undefined}
          />
        )}
      </ModalBase>
    </div>
  );
};
export default EmployeeContainer;
