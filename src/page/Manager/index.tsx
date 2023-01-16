import { useTranslation } from '@@packages/localization/src';
import { deleteDepartment, getDepartmentsByRole } from '@api/deparment';
import ModalBase from '@components/atoms/ModalBase';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
import SubSidebar from '@components/organisms/SubSidebar';
import { SubSidebarItem } from '@constants/subMenus';
import Layout from '@layouts/Layout';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate, useOutlet, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// Icon
import Icon from '@components/atoms/Icon';
import PeopleIcon from '@mui/icons-material/People';
import { LayoutMoreActionInputType } from '@components/molecules/LayoutMoreActionsMenu';
import useLocalStorage from '@hooks/useLocalStorage';
import { useCheckPermissions } from '@hooks/useCheckPermissions';

const Manager = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [menus, setMenus] = useState<SubSidebarItem[]>([]);

  const [isFirstTime, setIsFirstTime] = useState<boolean>(false);

  const navigate = useNavigate();

  const ROOT_NAVIGATE = '/departments';

  const { t } = useTranslation();

  const [currentRole] = useLocalStorage('current_role', '');
  const [currentDepartmentId] = useLocalStorage('department_id', '');

  const outlet = useOutlet();

  const params = useParams();

  const isCanCreate = useCheckPermissions('RBAC_DEPARTMENT_CREATE');

  const { callback, description, isLoading, isOpen, onClose, setAlertData, title } =
    useAlertDialog();

  const queryClient = useQueryClient();

  const { data: departmentQueryData, isLoading: isLoadingQueryData } = useQuery({
    queryKey: ['manager-get-departments'],
    queryFn: getDepartmentsByRole,
    onSuccess: (res) => {
      const resData = currentRole.toLowerCase().startsWith('employee')
        ? res.data.filter((value) => value.id.toString() === currentDepartmentId)
        : res.data;

      const convertToMenus: SubSidebarItem[] = resData.map((data) => {
        const { name, id } = data;

        return {
          name,
          navigate: `${ROOT_NAVIGATE}/department/${id}/employee`,
          icon: <Icon icon="department" color="black" />,
        };
      });

      setMenus(convertToMenus);
      return res;
    },
  });

  const { mutate: mutateDeleteDepartment } = useMutation({
    mutationKey: ['Manager-delete-department'],
    mutationFn: deleteDepartment,
    onSuccess: () => {
      toast.success(t('Delete successfully!'));
      queryClient.invalidateQueries({
        queryKey: ['manager-get-departments'],
      });
    },
  });

  const currentDepartment = useMemo(() => {
    if (isEmpty(departmentQueryData?.data)) return null;

    return departmentQueryData?.data.find(
      (department) => department.id.toString() === params.idDepartment,
    );
  }, [params.idDepartment, departmentQueryData]);

  useEffect(() => {
    if (!isEmpty(menus)) {
      if (!isFirstTime) {
        navigate(menus[0].navigate ?? '');
        setIsFirstTime(true);
      }

      if (!currentDepartment) navigate(menus[0].navigate ?? '');
    }
  }, [menus]);

  const moreActionsList: LayoutMoreActionInputType[] = [
    {
      type: 'info',
      onClick: () => {
        setIsOpenModal(true);
      },
    },
    {
      type: 'edit',
      onClick: () => {
        navigate(`${ROOT_NAVIGATE}/department/edit/${params.idDepartment}`);
      },
    },
    {
      type: 'delete',
      onClick: () => {
        setAlertData(
          '',
          <>
            <p>Are you sure want to "Delete" this department?</p>
            <p>
              <b>Department Name: </b>
              <span>{currentDepartment?.name ?? undefined}</span>
            </p>
          </>,
          () => {
            mutateDeleteDepartment(params.idDepartment ? +params.idDepartment : 0);
            onClose();
          },
        );
      },
    },
  ];

  const _renderModalContent = useMemo(() => {
    if (isEmpty(currentDepartment)) return null;

    const { name, description, address, users } = currentDepartment;

    return (
      <div>
        <Grid container>
          <Grid xs={12}>
            <h1 className="font-semibold text-[20px] text-center">{name}</h1>
          </Grid>
          <Grid xs={12}>
            <p className="pl-6">
              <b className="min-w-[100px] inline-block">Description:</b>
              <span>{description}</span>
            </p>
          </Grid>
          <Grid xs={12}>
            <p className="pl-6">
              <b className="min-w-[100px] inline-block">Address:</b>
              <span>{address}</span>
            </p>
          </Grid>
          <Grid xs={12}>
            <p className="pl-6">
              <b className="min-w-[100px] inline-block">Employees:</b>
              <span className="inline-flex items-center">
                {users?.length}
                <PeopleIcon className="pl-2" sx={{ color: '#999999' }} />
              </span>
            </p>
          </Grid>
        </Grid>
      </div>
    );
  }, [currentDepartment]);

  return (
    <Layout.Content>
      <Layout.ASide>
        <SubSidebar
          menus={menus}
          title="Department"
          headerBtnTitle={isCanCreate ? '' : 'Compose'}
          onClickCompose={
            isCanCreate
              ? () => navigate(`${ROOT_NAVIGATE}/department/add`)
              : () => navigate(`/emails/compose`)
          }
        />
      </Layout.ASide>
      {outlet ? (
        <Outlet context={{ departmentQueryData, moreActionsList }} />
      ) : (
        <Layout.MainQueryClient
          headTitle={t('Department')}
          isHaveHeader
          onClickAdd={() => {}}
          moreActionsList={moreActionsList}></Layout.MainQueryClient>
      )}
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
        isOpen={isOpenModal}
        title="More Info"
        submitLabel=""
        onClose={() => setIsOpenModal(false)}
        style={{
          minWidth: '20vw',
          minHeight: '30vh',
        }}>
        {_renderModalContent}
      </ModalBase>
    </Layout.Content>
  );
};

export default Manager;
