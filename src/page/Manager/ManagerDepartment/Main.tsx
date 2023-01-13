import { useTranslation } from '@@packages/localization/src';
import { DepartmentContainer } from '@containers/DepartmentContainer';
import Layout from '@layouts/Layout';
import { useNavigate, useOutletContext } from 'react-router-dom';

const ManagerDepartmentPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Layout.MainQueryClient
      headTitle={t('Department')}
      isHaveHeader
      onClickAdd={() => navigate('/department/add')}>
      <DepartmentContainer />
    </Layout.MainQueryClient>
  );
};

export default ManagerDepartmentPage;
