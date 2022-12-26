import { useTranslation } from '@@packages/localization/src';
import { EditSignatureContainer } from '@containers/SignatureContainer';
import Layout from '@layouts/Layout';

const EditSignaturePage = () => {
  const { t } = useTranslation();

  return (
    <Layout.MainQueryClient headTitle={t('Signatures - Update')}>
      <EditSignatureContainer />
    </Layout.MainQueryClient>
  );
};

export default EditSignaturePage;
