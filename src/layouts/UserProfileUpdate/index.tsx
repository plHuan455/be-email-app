import { useTranslation } from '@@packages/localization/src';
import { AuthResponse, AuthUpdate } from '@api/auth/interface';
import ArrowLeft from '@assets/icon/ArrowLeft';
import Icon from '@components/atoms/Icon';
import AvatarInput from '@components/atoms/Input/AvatarInput';
import ValidateInput from '@components/atoms/Input/ValidateInput';
import { AddEmployeeField } from '@components/organisms/TableManagerEmployeeContainer/AddEmployeeModal';
import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import { Controller, FormProvider, UseFormReturn } from 'react-hook-form';

import './styles.scss';

export interface UpdateUserProfileField {
  avatar?: File;
  user_name: string;
  phone_number: string;
}

interface Props {
  userInfoData: AuthUpdate;
  method: UseFormReturn<AuthUpdate>;
  onSubmit: (values: AuthUpdate) => void;
  onBackToView: () => void;
}

const UserProfileUpdate: React.FC<Props> = ({
  userInfoData,
  method,
  onSubmit,
  onBackToView,
}) => {
  // useTranslation
  const { t } = useTranslation();

  return (
    <Box className="h-full relative userUpdateProfile">
      <Box className="absolute top-0 left-0 cursor-pointer">
        <span className="inline-block p-4" onClick={() => onBackToView()}>
          <ArrowLeft width={24} height={24} />
        </span>
      </Box>
      <FormProvider {...method}>
        <form
          onSubmit={method.handleSubmit(onSubmit)}
          className="h-full flex flex-col justify-between">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <h3 className="text-[36px] font-semibold text-center">
                Update Profile
              </h3>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="avatar"
                render={({ field: { value, onChange }, fieldState }) => (
                  <div className="py-6">
                    <AvatarInput
                      id="create-employee-avatar-field"
                      onChange={(data) => onChange(data)}
                      placeholderImgSrc={
                        typeof value === 'string' ? `http://${value}` : undefined
                      }
                    />
                  </div>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="first_name"
                render={({ field: { value, onChange }, fieldState }) => (
                  <div>
                    <ValidateInput
                      label="First Name:"
                      className="text-sm text-[16px]"
                      type="text"
                      fullWidth
                      value={value}
                      placeHolder="First Name"
                      errors={fieldState.error?.message}
                      onChange={onChange}
                    />
                  </div>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="last_name"
                render={({ field: { value, onChange }, fieldState }) => (
                  <div>
                    <ValidateInput
                      label="Last Name:"
                      className="text-sm text-[16px]"
                      type="text"
                      fullWidth
                      value={value}
                      placeHolder="Last Name"
                      errors={fieldState.error?.message}
                      onChange={onChange}
                    />
                  </div>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="identity"
                render={({ field: { value, onChange }, fieldState }) => (
                  <div>
                    <ValidateInput
                      label="Identity:"
                      className="text-sm text-[16px]"
                      type="text"
                      fullWidth
                      value={value}
                      placeHolder="Identity"
                      errors={fieldState.error?.message}
                      onChange={onChange}
                    />
                  </div>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="phone_number"
                render={({ field: { value, onChange }, fieldState }) => (
                  <div>
                    <ValidateInput
                      className="text-[16px]"
                      label="Phone number"
                      type="text"
                      fullWidth
                      value={value}
                      placeHolder="Phone number"
                      errors={fieldState.error?.message}
                      onChange={onChange}
                    />
                  </div>
                )}
              />
            </Grid>
          </Grid>
          <Box className="flex justify-center">
            <Button type="submit">Submit</Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default UserProfileUpdate;
