import { useTranslation } from '@@packages/localization/src';
import { AuthResponse, AuthUpdate } from '@api/auth/interface';
import AvatarInput from '@components/atoms/Input/AvatarInput';
import SelectInput from '@components/atoms/Input/SelectInput';
import ValidateInput from '@components/atoms/Input/ValidateInput';
import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar, Box } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import Grid from '@mui/material/Unstable_Grid2';

interface Props {
  userInfoData: AuthUpdate;
}

const UserProfile: React.FC<Props> = ({ userInfoData }) => {
  const { avatar, user_name, email, phone_number, position, role, department } =
    userInfoData;

  // UserTranslate
  const { t } = useTranslation();

  return (
    <Box className="h-full flex flex-col">
      <h3 className="text-center font-bold text-[32px] mb-4">{t('User Info')}</h3>
      <Box className="flex justify-center mb-6">
        <Avatar
          id="create-employee-avatar-field"
          src={typeof avatar === 'string' ? `http://${avatar}` : undefined}
          alt={user_name}
          sx={{ width: 80, height: 80 }}
        />
      </Box>
      <Grid container spacing={2} rowSpacing={4}>
        <Grid xs={6}>
          <p className="flex">
            <b className="min-w-[35%] text-[18px]">{t('Full Name:')}</b>
            <span className="flex-1 text-[18px] font-bold opacity-60 pl-4">
              {user_name}
            </span>
          </p>
        </Grid>
        <Grid xs={6}>
          <p className="flex">
            <b className="min-w-[35%] text-[18px]">{t('Email:')}</b>
            <span className="flex-1 text-[18px] font-bold opacity-60 pl-4">
              {email}
            </span>
          </p>
        </Grid>
        <Grid xs={6}>
          <p className="flex">
            <b className="min-w-[35%] text-[18px]">{t('Phone Number:')}</b>
            <span className="flex-1 text-[18px] font-bold opacity-60 pl-4">
              {phone_number}
            </span>
          </p>
        </Grid>
        <Grid xs={6}>
          <p className="flex">
            <b className="min-w-[35%] text-[18px]">{t('Position:')}</b>
            <span className="flex-1 text-[18px] font-bold opacity-60 pl-4">
              {position}
            </span>
          </p>
        </Grid>
        <Grid xs={6}>
          <p className="flex">
            <b className="min-w-[35%] text-[18px]">{t('Role:')}</b>
            <span className="flex-1 text-[18px] font-bold opacity-60 pl-4">
              {role}
            </span>
          </p>
        </Grid>
        <Grid xs={6}>
          <p className="flex">
            <b className="min-w-[35%] text-[18px]">{t('Department:')}</b>
            <span className="flex-1 text-[18px] font-bold opacity-60 pl-4">
              {department}
            </span>
          </p>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
