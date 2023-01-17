import { useTranslation } from '@@packages/localization/src';
import { DepartmentResponse } from '@api/deparment/interface';
import ModalBase from '@components/atoms/ModalBase';
import InnerLayoutHeaderTabs from '@components/molecules/InnerLayoutTabs';
import { LayoutMoreActionInputType } from '@components/molecules/LayoutMoreActionsMenu';
import { PERMISSIONS } from '@constants/constants';
import { TAB_DEPARTMENT_LIST } from '@constants/InnerHeaderLayoutTab';
import { EmployeeContainer } from '@containers/EmployeeContainer';
import { useCheckPermissions } from '@hooks/useCheckPermissions';
import Layout from '@layouts/Layout';
import { AxiosResponse } from 'axios';
import { useMemo, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

interface OutletContextType {
  departmentQueryData: AxiosResponse<DepartmentResponse[], any> | undefined;
  moreActionsList: LayoutMoreActionInputType[];
}

const ManagerEmployeePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const isCanCreate = useCheckPermissions(PERMISSIONS.USER_SETTING_CREATE);

  console.log(isCanCreate);

  const { departmentQueryData, moreActionsList } =
    useOutletContext<OutletContextType>();

  const departmentName = useMemo(() => {
    const found = departmentQueryData?.data.find(
      (item) => item.id.toString() === params.idDepartment,
    );

    if (found) return found.name;
    return 'Department';
  }, [params.idDepartment, departmentQueryData]);

  const handleAddEmployee = () => {
    // tạm thời cho add, sau này phân quyền sau
    navigate(`/departments/department/${params.idDepartment}/employee/add`);
  };

  return (
    <>
      <Layout.MainQueryClient
        headTitle={t(departmentName)}
        isHaveHeader
        onClickAdd={isCanCreate ? handleAddEmployee : undefined}
        rightHeaderTabs={
          <InnerLayoutHeaderTabs
            tabs={TAB_DEPARTMENT_LIST}
            typeOpenTabLink="replace"
          />
        }
        moreActionsList={moreActionsList}>
        <EmployeeContainer />
      </Layout.MainQueryClient>
    </>
  );
};

export default ManagerEmployeePage;
