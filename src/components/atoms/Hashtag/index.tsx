import ModalEmailList, {
  EmailList,
  StatusOptions,
} from '@components/molecules/ModalEmailList';
import { Box, ButtonBase, Typography } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  title: string;
  status: StatusOptions;
  // emailData: EmailList[];
  index: number;
}

const Hashtag: React.FC<Props> = ({ title, status, index }) => {
  const [modalStatus, setModalStatus] = useState(false);

  return (
    <Box key={index}>
      <ButtonBase
        onClick={() => setModalStatus(true)}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5px 10px',
        }}>
        <Typography component={'p'} sx={{ color: '#4BAAA2', fontWeight: 'bold' }}>
          {title}
        </Typography>
      </ButtonBase>
      <ModalEmailList
        title={title}
        status={status}
        // emailData={emailData}
        isActive={modalStatus}
        handleChangeModalStatus={setModalStatus}
      />
    </Box>
  );
};

export default Hashtag;
