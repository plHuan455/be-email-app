import { useTranslation } from '@@packages/localization/src';
import InnerLayoutHeaderTabs from '@components/molecules/InnerLayoutTabs';
import { TAB_DEPARTMENT_LIST } from '@constants/InnerHeaderLayoutTab';
import { PositionContainer } from '@containers/PositionContainer';
import Layout from '@layouts/Layout';
import { useNavigate, useParams } from 'react-router-dom';

const ManagerPositionPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const handleAddEmployee = () => {
    // tạm thời cho add, sau này phân quyền sau
    navigate(`/department/${params.id}/position/add`);
  };

  return (
    <>
      <Layout.MainQueryClient
        headTitle={t('Employee')}
        isHaveHeader
        onClickAdd={handleAddEmployee}
        onComback={() => navigate(-1)}
        rightHeaderTabs={
          <InnerLayoutHeaderTabs
            tabs={TAB_DEPARTMENT_LIST}
            typeOpenTabLink="replace"
          />
        }>
        <PositionContainer />
      </Layout.MainQueryClient>
    </>
  );
};

export default ManagerPositionPage;
