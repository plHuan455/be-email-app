import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import { useTranslation } from '@@packages/localization';
import BannerImg from '@assets/images/banner.png';
import BannerImg2x from '@assets/images/@2x/banner@2x.png';
import BannerImg3x from '@assets/images/@3x/banner@3x.png';
const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

function LoginContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const auth = useAuth();

  const submitLogin = async ({ email, password }) => {
    try {
      // const res = await login({ email, password });
      // console.log({ res });
      auth.signin({ name: 'test' }, 'test', () => {
        navigate('/');
      });
      // if (res?.message === 'success') {
      // toast.success(t('Đăng nhập thành công!'));
      // navigate('/');
      // }
    } catch (error: any) {
      toast.error(t('Tài khoản chưa tồn tại hoặc sai thông tin đăng nhập'));
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    submitLogin({ email: data.email, password: data.password });
    // handleLogin(data);
  };

  // if (auth.token) return <Navigate to={'/'} replace={true} />;

  return (
    <Root>
      <WrapContent className="bg-app">
        <Box alignSelf={'center'}>
          <ImageComponent.Image
            height={65}
            width={200}
            imageProps={{ srcSet: `${BannerImg2x} 2x , ${BannerImg3x} 3x` }}
            src={BannerImg}
            alt="logo"
          />
        </Box>
        <Content className="grid grid-rows-2 gap-4">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-rows-2 gap-4">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder={t('txtEmail')}
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type={'password'}
                  placeholder={t('Password')}
                  error={!!errors.password?.message}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Button size="large" type="submit">
              {t('Login')}
            </Button>
          </form>
        </Content>
      </WrapContent>
    </Root>
  );
}

export default LoginContainer;

import styled from 'styled-components';
import ImageComponent from '@components/atoms/LazyImage';
import { Box } from '@mui/system';
import { useAuth } from '@context/AppContext';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

export const Root = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

export const WrapContent = styled.div`
  width: 360px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 25px 30px -13px rgb(40 40 40 / 40%);
`;

export const Logo = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
`;
export const WrapInput = styled.div`
  width: 100%;
  display: flex;
  margin: 6px 0;
  flex-direction: column;
`;

export const CheckBox = styled.input`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

export const Label = styled.p`
  flex: 1;
  margin-left: 5px;
  font-weight: 500;
  font-size: 14px;
`;

export const Title = styled.p`
  width: 100%;
  text-align: center;
  margin-bottom: 4px;
  color: rgb(64, 144, 120);
  cursor: pointer;
`;

export const TextError = styled.p`
  margin: 6px 0;
  color: #bf1650;
  ::before {
    display: inline;
    content: '⚠ ';
  }
`;
