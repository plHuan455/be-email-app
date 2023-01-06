import { InputContactBlock } from '@components/molecules/Autocomplete';
import EmailReplyMess from '@components/molecules/EmailReplyMess';
import React, { useState } from 'react';
import ReplyMessLayoutContainer from './ReplyMessLayout';

const useEmailReplyMess = () => {
  const [isShowLayout, setIsShowLayout] = useState<boolean>(false);

  // handler FNC
  const handleCloseLayout = () => {
    setIsShowLayout(false);
  };

  const handleOpenLayout = () => {
    setIsShowLayout(true);
  };

  return {
    isShowLayout,
    handleCloseLayout,
    handleOpenLayout,
  };
};

interface InputProps {
  onClickInput: () => void;
}

const Input: React.FC<InputProps> = ({ onClickInput }) => {
  return <EmailReplyMess onClickInput={onClickInput} />;
};

interface LayoutModalProps {
  isShow: boolean;
  receiversList: InputContactBlock[];
  onOpen: () => void;
  onClose: () => void;
}

const LayoutModal: React.FC<LayoutModalProps> = ({
  isShow,
  receiversList,
  onOpen,
  onClose,
}) => {
  console.log(receiversList);
  return (
    <ReplyMessLayoutContainer
      receiversList={receiversList}
      isShow={isShow}
      onClose={onClose}
      onOpen={onOpen}
    />
  );
};

const EmailReplyMessMain = {
  Input,
  LayoutModal,
};

export default EmailReplyMessMain;
export { useEmailReplyMess };
