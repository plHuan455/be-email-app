import { Box, IconButton, TextField } from '@mui/material';
import React from 'react';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

interface Props {
  onClickInput: () => void;
}

const EmailReplyMess: React.FC<Props> = ({ onClickInput }) => {
  return (
    <Box className="absolute bottom-0 left-0 bg-white w-full">
      <Box className="flex w-full p-2">
        <IconButton
          className="bg-transparent text-[#7D7E80] hover:text-[#5724C5] hover:bg-transparent"
          onClick={() => console.log('click')}>
          <SendOutlinedIcon fontSize="small" />
        </IconButton>
        <TextField
          onClick={onClickInput}
          className="flex-1"
          sx={{
            '& input': {
              paddingBlock: 2,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default EmailReplyMess;
