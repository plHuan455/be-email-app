import { useTranslation } from '@@packages/localization/src';
import Icon from '@components/atoms/Icon';
import PageCrudData from '@components/organisms/PageCrudData';

import { ColumnDef } from '@tanstack/react-table';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateIcon from '@mui/icons-material/Update';
import ModalBase from '@components/atoms/ModalBase';
import { Box, Button } from '@mui/material';
import { isEmpty } from 'lodash';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
import { useMutation } from '@tanstack/react-query';
import { deletePositionById } from '@api/deparment';
import { toast } from 'react-toastify';
import TableActionsMenu from '@components/molecules/TableActionsMenu';

import DeleteIcon from '@mui/icons-material/Delete';
import { useCheckPermissions } from '@hooks/useCheckPermissions';
import { PERMISSIONS } from '@constants/constants';

const PositionContainer = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [positionData, setPositionData] = useState<any>();
  const [refreshKey, setRefreshKey] = useState<number>(Date.now());

  const navigate = useNavigate();
  const { t } = useTranslation();
  const params = useParams();

  useEffect(() => {
    console.log('mount', params);
  });

  const isCanUpdate = useCheckPermissions(PERMISSIONS.SYSTEM_POSITION_UPDATE);
  const isCanDelete = useCheckPermissions(PERMISSIONS.SYSTEM_POSITION_DELETE);

  const {
    callback,
    description,
    isLoading,
    isOpen,
    isShowAgreeBtn,
    onClose,
    onCloseCallBack,
    setAlertData,
    setIsLoading,
    title,
  } = useAlertDialog();

  const onUpdateActionClick = useCallback(
    (id: number) => {
      if (isCanUpdate)
        navigate(
          `/departments/department/${params.idDepartment}/position/edit/${id}`,
        );
      else toast(t(`You don't have permission!`));
    },
    [isCanUpdate],
  );

  const onDeleteActionClick = useCallback(
    (data) => {
      if (isCanDelete)
        setAlertData(
          '',
          <div>
            <p>Are you sure want to "Delete" this position?</p>
            <p>
              <b>Position Name:</b>
              <span>{data.name}</span>
            </p>
            <p>
              <b>Description:</b>
              <span>{data.describe}</span>
            </p>
          </div>,
          () => {
            mutateDeletePosition(data.id);
            onClose();
          },
        );
      else toast(t(`You don't have permission!`));
    },
    [isCanDelete],
  );

  const columns = React.useMemo<ColumnDef<any, any>[]>(() => {
    return [
      {
        accessorKey: '',
        accessorFn: (row) => row.name,
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>{t('Position Name')}</span>,
        footer: (props) => {
          return props.column.id;
        },
      },
      {
        accessorKey: '',
        accessorFn: (row) => row.describe,
        id: 'describe',
        cell: (info) => info.getValue(),
        header: () => <span>Describe</span>,
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
              onItemClick={(value) => {
                if (value === 0) onUpdateActionClick(Number(info.getValue().id));
                if (value === 1) onDeleteActionClick(info.getValue());
              }}
            />
          );
        },
        header: () => <span>{t('Actions')}</span>,
        footer: (props) => props.column.id,
      },
    ];
  }, []);

  const rowClick = (row) => {
    if (row && row.original) {
      // tạm thời cho edit, sau này phần quyền sau
      // navigate(
      //   `/department/${params.idDepartment}/position/edit/${row.original.id}`,
      // );

      setPositionData(row.original);
      setIsOpenModal(true);
    }
  };

  const { mutate: mutateDeletePosition } = useMutation({
    mutationKey: ['PositionContainer-delete-position'],
    mutationFn: deletePositionById,
    onSuccess: () => {
      setIsOpenModal(false);
      setRefreshKey(Date.now());
      toast.success(t('Delete Successfully'));
    },
  });

  const handleEditPosition = (id: number) => {
    navigate(`/departments/department/${params.idDepartment}/position/edit/${id}`);
  };

  const handleDeletePosition = (id: number, posName: string) => {
    setAlertData(
      '',
      <>
        <p>Are you sure want to "Delete" this position?</p>
        <p>
          <b>Position Name:</b>
          <span>{posName}</span>
        </p>
      </>,
      () => {
        onClose();
        mutateDeletePosition(id);
      },
    );
  };

  const _renderModalContent = useMemo(() => {
    if (!positionData) return null;

    return (
      <Box className="flex flex-col min-h-[20vh]">
        <Box className="flex-1">
          <Grid container>
            <Grid xs={12}>
              <p>
                <b>Name:</b>
                <span>{positionData.name}</span>
              </p>
            </Grid>
            <Grid xs={12}>
              <p>
                <b>Description:</b>
                <span>{positionData.describe}</span>
              </p>
            </Grid>
          </Grid>
        </Box>
        {(isCanDelete || isCanUpdate) && (
          <Box className="flex justify-end items-end gap-2">
            {isCanDelete && (
              <Button
                color="error"
                onClick={() =>
                  handleDeletePosition(positionData.id, positionData.name)
                }>
                Delete
              </Button>
            )}
            {isCanUpdate && (
              <Button onClick={() => handleEditPosition(positionData.id)}>
                Edit
              </Button>
            )}
          </Box>
        )}
      </Box>
    );
  }, [positionData]);

  return (
    <div className="px-4 flex-1 pb-4">
      <PageCrudData
        refreshKey={refreshKey.toString()}
        disabledRowOnClick={false}
        api={`/system/position/department/${params.idDepartment}`}
        columns={columns}
        rowOnClick={(row) => rowClick(row)}
      />
      <ModalBase
        isOpen={isOpenModal}
        title="Position Info"
        submitLabel=""
        style={{
          minWidth: '30vw',
          minHeight: '30vh',
        }}
        onClose={() => setIsOpenModal(false)}>
        {_renderModalContent}
      </ModalBase>
      <AlertDialog
        descriptionLabel={description}
        isOpen={isOpen}
        onClose={onClose}
        titleLabel={title}
        isLoading={isLoading}
        onAgree={callback}
        onDisagree={onClose}
      />
    </div>
  );
};
export default PositionContainer;
