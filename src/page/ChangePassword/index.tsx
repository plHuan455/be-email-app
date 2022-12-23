import ImageComponent from '@components/atoms/LazyImage';
import LoginContainer, {
  Content,
  Root,
  WrapActions,
  WrapAvatar,
  WrapContainer,
  WrapContent,
  WrapInput,
  WrapLogo,
  WrapTitle,
} from '@containers/LoginContainer';
import { Avatar, Box, Button, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import * as yup from 'yup';

import logoImg from '@assets/images/logo.png';
import onboardingImg from '@assets/images/Illustrations/Onboarding/2.png';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from '@@packages/localization/src';
import { changePassword } from '@api/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Layout from '@layouts/Layout';
import ArrowLeft from '@assets/icon/ArrowLeft';

const ChangePassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const schema = yup
    .object({
      currPassword: yup.string().required(t('Current Password is required')),
      newPassword: yup.string().required(t('New Password is required')),
      confirmPassword: yup
        .string()
        .required(t('Confirm Password is required'))
        .oneOf(
          [yup.ref('newPassword'), null],
          t('Confirmation password is not correct'),
        ),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await changePassword({
        pw_current: data.currPassword,
        pw_new: data.confirmPassword,
      });

      toast.success(t('Change Password successful!'));
      navigate('/');
    } catch (error) {
      toast.error(t('An error has occurred!'));
    }
  };

  return (
    <Layout.MainHaveActions>
      <WrapContent className="bg-transparent">
        <Box className=" bg-white p-10 py-16 rounded-xl w-[400px]">
          <Box className="flex items-center mb-8">
            <Box className="cursor-pointer h-[56px]">
              <span className="inline-block p-4" onClick={() => navigate(-1)}>
                <ArrowLeft width={24} height={24} color="#554CFF" />
              </span>
            </Box>
            <h3 className="text-center font-bold text-[28px]">Change Password</h3>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-rows-2 gap-4">
            <Controller
              name="currPassword"
              control={control}
              render={({ field }) => (
                <WrapInput>
                  <label>Current Password</label>
                  <TextField
                    {...field}
                    type={'password'}
                    placeholder={t('Enter Current Password')}
                    error={!!errors.currPassword?.message}
                    helperText={errors.currPassword?.message}
                  />
                </WrapInput>
              )}
            />
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <WrapInput>
                  <label>New Password</label>
                  <TextField
                    {...field}
                    type={'password'}
                    placeholder={t('Enter New Password')}
                    error={!!errors.newPassword?.message}
                    helperText={errors.newPassword?.message}
                  />
                </WrapInput>
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <WrapInput>
                  <label>Confirm Password</label>
                  <TextField
                    {...field}
                    type={'password'}
                    placeholder={t('Enter Confirm Password')}
                    error={!!errors.confirmPassword?.message}
                    helperText={errors.confirmPassword?.message}
                  />
                </WrapInput>
              )}
            />

            <WrapActions>
              <Button size="large" type="submit">
                {t('Change Password')}
              </Button>
            </WrapActions>
          </form>
        </Box>
        <p>2022 Metanode, Inc</p>
      </WrapContent>
    </Layout.MainHaveActions>
  );
};

export default ChangePassword;
