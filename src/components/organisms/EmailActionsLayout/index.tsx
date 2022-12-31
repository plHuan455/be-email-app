import { Box, IconButton } from '@mui/material';
import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import EmailReplyMessMain, {
  useEmailReplyMess,
} from '@containers/EmailReplyContainer/ReplyMess';

import styles from './styles.module.scss';

interface Props {
  isShow: boolean;
  onClose: () => void;
}

const EmailActionsLayout: React.FC<Props> = ({ isShow, onClose }) => {
  const { handleCloseLayout, handleOpenLayout, isShowLayout } = useEmailReplyMess();

  if (!isShow) return null;

  return (
    <Box className="O-EmailActionsLayout fixed top-0 bottom-0 left-0 right-0 z-[100]">
      <Box className="w-full h-full">
        <Box
          className="absolute top-0 left-0 w-full h-full bg-slate-600/50"
          onClick={onClose}></Box>
        <Box
          className={`${styles.mainCompose} absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-6 px-8 rounded-2xl  border border-[#E3E3E3] bg-white h-[90%] w-[70%]`}>
          <Box className="w-full h-full relative border-2 border-[#E3E3E3] rounded-2xl overflow-hidden">
            <Box className="w-full h-full flex flex-col">
              <Box className="flex-1"></Box>
              <Box>
                <EmailReplyMessMain.Input onClickInput={handleOpenLayout} />
              </Box>
            </Box>
          </Box>
          {/* Close Btn */}
          <Box className="absolute top-0 right-0">
            <IconButton onClick={onClose}>
              <CancelIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <EmailReplyMessMain.LayoutModal
        isShow={isShowLayout}
        onClose={handleCloseLayout}
        onOpen={handleOpenLayout}
      />
    </Box>
  );
};

export default EmailActionsLayout;
