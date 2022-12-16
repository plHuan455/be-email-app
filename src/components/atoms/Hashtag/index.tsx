import ModalEmailList, {
  EmailList,
  StatusOptions,
} from '@components/molecules/ModalEmailList';
import { Box, ButtonBase, Typography } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  title: string;
  status: StatusOptions;
  value: string;
  index: number;
}

const Hashtag: React.FC<Props> = ({ title, status, index, value }) => {
  const [modalStatus, setModalStatus] = useState(false);

  // Handler FNC
  const handleClickPrivateTag = (e) => {
    setModalStatus(true);
  };

  return (
    <Box key={index}>
      <ButtonBase
        onClick={handleClickPrivateTag}
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
        renderType={'tag'}
        catalog={value}
        isActive={modalStatus}
        handleChangeModalStatus={setModalStatus}
      />
    </Box>
  );
};

export default Hashtag;
