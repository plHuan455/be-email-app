import React, { useContext, useEffect } from 'react';
import { EmailComposeContext } from '@containers/MainWrapperContainer';
import EmailReplyMessLayout from '@components/molecules/EmailReplyMessLayout';
import { InputContactBlock } from '@components/molecules/Autocomplete';
import { EmailComposeFields } from '@components/templates/EmailCompose2';
import dayjs from 'dayjs';
import { UserReceiveInfo } from '@components/organisms/Email/Interface';

interface Props {
  isShow: boolean;
  receiversList: InputContactBlock[];

  onOpen: () => void;
  onClose: () => void;
}

const ReplyMessLayoutContainer: React.FC<Props> = ({
  isShow,
  receiversList,
  onClose,
  onOpen,
}) => {
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

  // Handler FNC
  const handleOnSubmit = (values: EmailComposeFields) => {
    onSendEmail({ ...values, sendAt: dayjs(Date.now()).utc() });
    onClose();
  };

  if (!method) return null;

  useEffect(() => {
    method.setValue('contactBlock', receiversList);
  }, [receiversList]);

  return (
    <>
      <EmailReplyMessLayout
        isShow={isShow}
        receivesList={receiversList}
        onOpen={onOpen}
        onClose={onClose}
        method={method}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default ReplyMessLayoutContainer;
