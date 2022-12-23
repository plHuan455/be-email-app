import SignatureContainer from '@containers/SignatureContainer';
import Layout from '@layouts/Layout';
import SignatureLayout from '@layouts/Signature';
import React from 'react';

const SignaturePage = () => {
  return (
    <Layout.MainHaveActions headTitle="Signature">
      <SignatureLayout />
    </Layout.MainHaveActions>
  );
};

export default SignaturePage;
