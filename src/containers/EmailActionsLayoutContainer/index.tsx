import EmailActionsLayout from '@components/organisms/EmailActionsLayout';
import React, { useState } from 'react';

const useEmailActionLayout = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  // Handler FNC
  const handleOnOpen = () => {
    setIsShow(true);
  };

  const handleOnClose = () => {
    console.log('click');
    setIsShow(false);
  };

  return {
    isShow,
    handleOnClose,
    handleOnOpen,
  };
};

interface Props {
  isShow: boolean;
  onClose: () => void;
}

const EmailActionLayoutContainer: React.FC<Props> = ({ isShow, onClose }) => {
  return (
    <>
      <EmailActionsLayout isShow={isShow} onClose={onClose} />
    </>
  );
};

export default EmailActionLayoutContainer;
export { useEmailActionLayout };
