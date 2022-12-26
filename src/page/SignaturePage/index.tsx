import SignatureContainer from '@containers/SignatureContainer';
import Layout from '@layouts/Layout';
import SignatureLayout from '@layouts/Signature';
import React, { useState } from 'react';

const SignaturePage = () => {
  const [isOpenAddSignature, setIsOpenAddSignature] = useState<boolean>();
  return (
    <Layout.MainHaveActions headTitle="Signature" onClickAdd={() => setIsOpenAddSignature(true)}>
      <SignatureLayout isOpenAddSignature={isOpenAddSignature} onCloseAddSignature={() => setIsOpenAddSignature(false)} />
    </Layout.MainHaveActions>
  );
};

export default SignaturePage;
