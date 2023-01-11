import { useTranslation } from '@@packages/localization/src';
import { DepartmentResponse } from '@api/deparment/interface';
import InnerLayoutHeaderTabs from '@components/molecules/InnerLayoutTabs';
import { TAB_DEPARTMENT_LIST } from '@constants/InnerHeaderLayoutTab';
import { EmployeeContainer } from '@containers/EmployeeContainer';
import Layout from '@layouts/Layout';
import { AxiosResponse } from 'axios';
import { useMemo } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

interface OutletContextType {
  departmentQueryData: AxiosResponse<DepartmentResponse[], any> | undefined;
}

const ManagerEmployeePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const { departmentQueryData } = useOutletContext<OutletContextType>();

  const departmentName = useMemo(() => {
    const found = departmentQueryData?.data.find(
      (item) => item.id.toString() === params.idDepartment,
    );

    if (found) return found.name;
    return 'Department';
  }, [params.idDepartment, departmentQueryData]);

  const handleAddEmployee = () => {
    // tạm thời cho add, sau này phân quyền sau
    navigate(`/department/${params.idDepartment}/employee/add`);
  };

  return (
    <>
      <Layout.MainQueryClient
        headTitle={t(departmentName)}
        isHaveHeader
        onClickAdd={handleAddEmployee}
        rightHeaderTabs={
          <InnerLayoutHeaderTabs
            tabs={TAB_DEPARTMENT_LIST}
            typeOpenTabLink="replace"
          />
        }>
        <EmployeeContainer />
      </Layout.MainQueryClient>
    </>
  );
};

export default ManagerEmployeePage;
