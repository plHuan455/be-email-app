import { useTranslation } from '@@packages/localization/src';
import { EmployeeContainer } from '@containers/EmployeeContainer';
import Layout from '@layouts/Layout';
import { useNavigate, useParams } from 'react-router-dom';

const ManagerEmployeePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  return (
    <>
      <Layout.MainQueryClient
        headTitle={t('Employee')}
        isHaveHeader
        onClickAdd={() => navigate(`/manager/department/${params.id}/employee/add`)}>
        <EmployeeContainer />
        {/* <TableManagerEmployeeContainer
              isShowAddEmployeeModal={false}
              onCloseAddEmployeeModal={() => {}}
              onClickAddEmployeeModal={() => {}}
            /> */}
      </Layout.MainQueryClient>
    </>
  );
};

export default ManagerEmployeePage;
