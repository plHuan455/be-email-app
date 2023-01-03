import { addMailToBlackList } from '@api/blacklist';
import ModalBase from '@components/atoms/ModalBase';
import { async } from '@firebase/util';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormControl, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const AddBlackListModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const schema = yup.object().shape({
    email: yup.string().email().required('email is required!'),
  });

  const {
    register,
    handleSubmit: _handleSubmit,
    formState: { errors },
  } = useForm({
    // defaultValues: formData,
    resolver: schema && yupResolver(schema),
    mode: 'all',
  });

  const submitAddMailToBlacklist = async () => {
    try {
      // call create here
      const currentUserId = localStorage.getItem('current_id');
      const params = { user_email: email, user_id: Number(currentUserId) };

      await addMailToBlackList(params);
      toast.success('Add to blacklist success!');
      onClose && onClose();
      // navigate('..');
    } catch (error: any) {
      console.error(new Error(error));
      toast.error(error?.response?.message || 'Has Error');
    }
    console.log('email -->', email);
  };

  return (
    <ModalBase
      isOpen={isOpen}
      title={'Add email blacklist'}
      style={{ width: '50%' }}
      onClose={onClose}
      submitLabel="">
      <div className="w-full h-full relative">
        <FormControl fullWidth className="py-2 mb-4">
          <Typography sx={{ fontWeight: 700 }}>email</Typography>
          <TextField
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={errors.email?.message?.toString()}
            name="email"
            placeholder="email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            size={'small'}
            type="email"
          />
        </FormControl>
        <LoadingButton
          onClick={_handleSubmit(submitAddMailToBlacklist)}
          loadingPosition="end"
          sx={{
            backgroundColor: '#554CFF',
            color: '#ffffff',
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
            '&:hover': {
              backgroundColor: 'rgb(59, 53, 178)',
            },
            '.MuiLoadingButton-loading': {
              color: '#ffffff',
            },
          }}
          className="button-create-mui px-10"
          fullWidth
          type="submit">
          Add this mail to blacklist
        </LoadingButton>
      </div>
    </ModalBase>
  );
};

export default AddBlackListModal;
