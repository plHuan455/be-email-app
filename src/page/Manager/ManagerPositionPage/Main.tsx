import { useTranslation } from '@@packages/localization/src';
import { DepartmentResponse } from '@api/deparment/interface';
import InnerLayoutHeaderTabs from '@components/molecules/InnerLayoutTabs';
import { LayoutMoreActionInputType } from '@components/molecules/LayoutMoreActionsMenu';
import { TAB_DEPARTMENT_LIST } from '@constants/InnerHeaderLayoutTab';
import { PositionContainer } from '@containers/PositionContainer';
import Layout from '@layouts/Layout';
import { AxiosResponse } from 'axios';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

interface OutletContextType {
  departmentQueryData: AxiosResponse<DepartmentResponse[], any> | undefined;
  moreActionsList: LayoutMoreActionInputType[];
}

const ManagerPositionPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const { moreActionsList } = useOutletContext<OutletContextType>();

  const handleAddEmployee = () => {
    // tạm thời cho add, sau này phân quyền sau
    navigate(`/departments/department/${params.idDepartment}/position/add`);
  };

  return (
    <>
      <Layout.MainQueryClient
        headTitle={t('Positions')}
        isHaveHeader
        onClickAdd={handleAddEmployee}
        rightHeaderTabs={
          <InnerLayoutHeaderTabs
            tabs={TAB_DEPARTMENT_LIST}
            typeOpenTabLink="replace"
          />
        }
        moreActionsList={moreActionsList}>
        <PositionContainer />
      </Layout.MainQueryClient>
    </>
  );
};

export default ManagerPositionPage;
