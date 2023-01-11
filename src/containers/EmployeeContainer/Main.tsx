import { useTranslation } from '@@packages/localization/src';
import Icon from '@components/atoms/Icon';
import PageCrudData from '@components/organisms/PageCrudData';

import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateIcon from '@mui/icons-material/Update';
import ModalBase from '@components/atoms/ModalBase';
import { useMutation } from '@tanstack/react-query';
import { getUserWithId } from '@api/user';
import Loading from '@components/atoms/Loading';
import ClientProfileLayout from '@layouts/ClientProfile';

const EmployeeContainer = () => {
  const [isOpenModel, setIsOpenModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const params = useParams();

  useEffect(() => {
    console.log('mount', params);
  });

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
          <div>
            <img
              className="w-20 h-10 object-contain rounded-md"
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
    ],
    [],
  );

  const {
    mutate: mutateGetUserProfile,
    data: dataMutateGetUserProfile,
    isLoading: isLoadingGetUserProfile,
  } = useMutation({
    mutationKey: ['EmployeeContainer-get-user-profile'],
    mutationFn: getUserWithId,
  });

  const handleOnUpdateClick = (id: number) => {
    setIsOpenModal(false);
    navigate(`/departments/department/${params.idDepartment}/employee/edit/${id}`);
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
        refreshKey={params.idDepartment}
        disabledRowOnClick={false}
        api={`/rbac/department/users/${params.idDepartment}`}
        columns={columns}
        rowOnClick={(row) => rowClick(row)}
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
            onEdit={handleOnUpdateClick}
          />
        )}
      </ModalBase>
    </div>
  );
};
export default EmployeeContainer;
