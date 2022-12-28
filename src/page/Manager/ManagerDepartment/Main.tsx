import { useTranslation } from '@@packages/localization/src';
import { DepartmentContainer } from '@containers/DepartmentContainer';
import Layout from '@layouts/Layout';
import { useNavigate } from 'react-router-dom';

const ManagerDepartmentPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const userRole = localStorage.getItem('current_role');

  return (
    <>
      {userRole == 'employee' ? (
        <Layout.MainQueryClient
          headTitle={t('Department')}
          isHaveHeader
          onClickAdd={() => navigate('/manager/department/add')}>
          <DepartmentContainer />
          {/* <TableManagerDepartmentContainer
              isShowAddDepartmentModal={isShowAddDepartmentModal}
              onCloseAddDepartmentModal={() => setIsAddDepartmentModal(false)}
              onClickAddDepartmentModal={() => setIsAddDepartmentModal(true)}
            /> */}
        </Layout.MainQueryClient>
      ) : (
        <Layout.MainQueryClient
          headTitle={t('Department')}
          isHaveHeader
          onClickAdd={() => {}}>
          {/* <TableManagerDepartmentContainer
              isShowAddDepartmentModal={false}
              onCloseAddDepartmentModal={() => {}}
              onClickAddDepartmentModal={() => {}}
            /> */}
        </Layout.MainQueryClient>
      )}
    </>
  );
};

export default ManagerDepartmentPage;
