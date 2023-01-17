import { useTranslation } from '@@packages/localization/src';
import { DepartmentResponse } from '@api/deparment/interface';
import InnerLayoutHeaderTabs from '@components/molecules/InnerLayoutTabs';
import { LayoutMoreActionInputType } from '@components/molecules/LayoutMoreActionsMenu';
import { PERMISSIONS } from '@constants/constants';
import { TAB_DEPARTMENT_LIST } from '@constants/InnerHeaderLayoutTab';
import { PositionContainer } from '@containers/PositionContainer';
import { useCheckPermissions } from '@hooks/useCheckPermissions';
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

  const isCanCreate = useCheckPermissions(PERMISSIONS.SYSTEM_POSITION_CREATE);

  return (
    <>
      <Layout.MainQueryClient
        headTitle={t('Positions')}
        isHaveHeader
        onClickAdd={isCanCreate ? handleAddEmployee : undefined}
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
