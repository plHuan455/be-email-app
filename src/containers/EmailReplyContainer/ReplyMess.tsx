import EmailReplyMess from '@components/molecules/EmailReplyMess';
import React, { useState } from 'react';
import ReplyMessLayoutContainer from './ReplyMessLayout';

const EmailReplyMessContainer = () => {
  const [isShowLayout, setIsShowLayout] = useState<boolean>(false);

  // handler FNC
  const handleCloseLayout = () => {
    setIsShowLayout(false);
  };

  const handleOpenLayout = () => {
    setIsShowLayout(true);
  };

  return (
    <>
      <EmailReplyMess onClickInput={handleOpenLayout} />
      <ReplyMessLayoutContainer
        isShow={isShowLayout}
        onClose={handleCloseLayout}
        onOpen={handleOpenLayout}
      />
    </>
  );
};

export default EmailReplyMessContainer;
