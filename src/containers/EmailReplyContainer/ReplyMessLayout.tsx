import React, { useContext } from 'react';
import { EmailComposeContext } from '@containers/MainWrapperContainer';
import EmailReplyMessLayout from '@components/molecules/EmailReplyMessLayout';

interface Props {
  isShow: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ReplyMessLayoutContainer: React.FC<Props> = ({ isShow, onClose, onOpen }) => {
  const {
    inputContactBlocks,
    setInputContactBlocks,
    method,
    tabColor,
    triggerClearData,
    onMinimizeEmailClick,
    onSendEmail,
    onCloseEmail,
  } = useContext(EmailComposeContext);

  if (!method) return null;

  return (
    <>
      <EmailReplyMessLayout
        isShow={isShow}
        onOpen={onOpen}
        onClose={onClose}
        method={method}
      />
    </>
  );
};

export default ReplyMessLayoutContainer;
