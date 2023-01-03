import { addMailToBlackList } from '@api/blacklist';
import ModalBase from '@components/atoms/ModalBase';
import { async } from '@firebase/util';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const ModalConfirmDelete = ({ isOpen, onClose, onConfirm, title }) => {
  return (
    <ModalBase
      isOpen={isOpen}
      title={title}
      style={{ width: '350px' }}
      onClose={onClose}
      submitLabel="">
      <div className="w-full h-full relative">
        <Typography sx={{ fontWeight: 500 }}>
          Are you sure you want to delete this?
        </Typography>
        <Box className="w-full flex mt-6">
          <Button
            onClick={onClose}
            sx={{
              backgroundColor: '#e13434',
              ':hover': { backgroundColor: '#9f1717' },
            }}
            className="w-full mx-2">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            sx={{ backgroundColor: '#554CFF' }}
            className="w-full mx-2">
            Confirm
          </Button>
        </Box>
      </div>
    </ModalBase>
  );
};

export default ModalConfirmDelete;
