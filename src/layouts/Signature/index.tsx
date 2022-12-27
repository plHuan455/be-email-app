import { SignatureContainer } from '@containers/SignatureContainer';
import Layout from '@layouts/Layout';
import React from 'react';

interface SignatureLayoutProps {
  isOpenAddSignature?: boolean;
  onCloseAddSignature?: () => void;
}

const SignatureLayout: React.FC<SignatureLayoutProps> = ({
  isOpenAddSignature,
  onCloseAddSignature,
}) => {
  return <div>Null</div>;
};

export default SignatureLayout;
