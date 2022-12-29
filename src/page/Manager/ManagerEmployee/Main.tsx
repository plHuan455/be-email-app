import { useTranslation } from '@@packages/localization/src';
import { EmployeeContainer } from '@containers/EmployeeContainer';
import Layout from '@layouts/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManagerEmployeePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const handleAddEmployee = () => {
    const userRole = localStorage.getItem('current_role');
    if (userRole === 'admin') {
      navigate(`/manager/department/${params.id}/employee/add`);
    } else {
      toast.error('You dont have this permision!');
    }
  };

  return (
    <>
      <Layout.MainQueryClient
        headTitle={t('Employee')}
        isHaveHeader
        onClickAdd={handleAddEmployee}>
        <EmployeeContainer />
      </Layout.MainQueryClient>
    </>
  );
};

export default ManagerEmployeePage;
