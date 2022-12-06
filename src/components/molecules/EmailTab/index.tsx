import { getEmailManagerWithQueryParams } from '@api/email';
import { ButtonBase, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import ModalEmailList, { StatusOptions } from '../ModalEmailList';

interface Props {
  title: string;
  notiNumber: number;
  status: StatusOptions;
  type: string;
  index: number;
}

const EmailTab: React.FC<Props> = ({ title, notiNumber, status, type, index }) => {
  // useState
  const [modalStatus, setModalStatus] = useState(false);

  // Handler FUNC
  const handleOpenEmailTab = (e) => {
    setModalStatus(true);
  };

  return (
    <span key={title}>
      <ButtonBase
        onClick={handleOpenEmailTab}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5px 10px',
        }}>
        <Typography component={'p'} sx={{ color: '#554CFF', fontWeight: 'bold' }}>
          {title}
        </Typography>
        {notiNumber > 0 && (
          <Typography
            component={'p'}
            sx={{
              backgroundColor: '#ABA8D4',
              width: '14px',
              height: '18px',
              fontSize: '10px',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}>
            {notiNumber}
          </Typography>
        )}
      </ButtonBase>
      <ModalEmailList
        index={index}
        title={title}
        status={status}
        isActive={modalStatus}
        handleChangeModalStatus={setModalStatus}
      />
    </span>
  );
};

export default EmailTab;
