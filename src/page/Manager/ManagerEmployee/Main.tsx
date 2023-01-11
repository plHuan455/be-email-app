import { useTranslation } from '@@packages/localization/src';
import InnerLayoutHeaderTabs from '@components/molecules/InnerLayoutTabs';
import { TAB_DEPARTMENT_LIST } from '@constants/InnerHeaderLayoutTab';
import { EmployeeContainer } from '@containers/EmployeeContainer';
import Layout from '@layouts/Layout';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

interface OutletContextType {
  departmentName: string;
  setDepartmentName: React.Dispatch<React.SetStateAction<string>>;
}

const ManagerEmployeePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const { departmentName } = useOutletContext<OutletContextType>();

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
