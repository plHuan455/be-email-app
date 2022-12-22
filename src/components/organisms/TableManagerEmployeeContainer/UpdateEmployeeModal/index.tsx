import LoadingButton from '@mui/lab/LoadingButton';
import AvatarInput from '@components/atoms/Input/AvatarInput';
import SelectInput, { OptionTypes } from '@components/atoms/Input/SelectInput';
import ValidateInput from '@components/atoms/Input/ValidateInput';
import ModalBase from '@components/atoms/ModalBase';
import { Button, Grid } from '@mui/material';
import { rem } from '@utils/functions';
import { Controller, FormProvider, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';

export interface UpdateEmployeeFields {
  id: number;
  avatar?: File | string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  position?: string;
  role?: string;
  department?: string;
}
interface UpdateEmployeeModalProps {
  submitLabel: string;
  method: UseFormReturn<UpdateEmployeeFields>;
  isOpen: boolean;
  isFormLoading: boolean;
  title: string;
  roleList: OptionTypes[];
  departmentList: OptionTypes[];
  onSubmit: (values: UpdateEmployeeFields) => void;
  onClose: () => void;
}

const InputWrapper = styled.div`
  .input {
    font-size: 16px;
  }
`;

const StyleButtonWrapper = styled.div`
  & .MuiLoadingButton-loading {
    color: #ffffff;
    opacity: 0.7;
  }
`;

const StyleModalWrapper = styled.div`
  height: calc(100vh - ${rem(110)});
  overflow: auto;
`;

function UpdateEmployeeModal({
  submitLabel,
  method,
  isOpen,
  isFormLoading,
  title,
  roleList,
  departmentList,
  onClose,
  onSubmit,
}: UpdateEmployeeModalProps) {
  return (
    <ModalBase
      isOpen={isOpen}
      title={title}
      style={{ width: '90%' }}
      onClose={onClose}
      submitLabel="">
      <FormProvider {...method}>
        <StyleModalWrapper>
          <form
            className="o-tableManagerEmployee_form"
            onSubmit={method.handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Controller
                  name="avatar"
                  render={({ field: { value, onChange }, fieldState }) => (
                    <InputWrapper>
                      <AvatarInput
                        id="update-employee-avatar-field"
                        placeholderImgSrc={value instanceof File ? undefined : value}
                        onChange={(data) => onChange(data)}
                      />
                    </InputWrapper>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  render={({ field: { value, onChange }, fieldState }) => (
                    <InputWrapper>
                      <ValidateInput
                        id="update-employee-email"
                        label="Email"
                        type="text"
                        fullWidth
                        value={value}
                        placeHolder="Email"
                        errors={fieldState.error?.message}
                        onChange={onChange}
                      />
                    </InputWrapper>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="phone"
                  render={({ field: { value, onChange }, fieldState }) => (
                    <InputWrapper>
                      <ValidateInput
                        label="Phone number"
                        id="update-employee-phone"
                        type="text"
                        fullWidth
                        value={value}
                        placeHolder="Phone number"
                        errors={fieldState.error?.message}
                        onChange={onChange}
                      />
                    </InputWrapper>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="position"
                  render={({ field: { value, onChange }, fieldState }) => (
                    <InputWrapper>
                      <ValidateInput
                        label="Position"
                        id="update-employee-position"
                        fullWidth
                        type="text"
                        className="text-emerald-400"
                        value={value}
                        placeHolder="position"
                        errors={fieldState.error?.message}
                        onChange={onChange}
                      />
                    </InputWrapper>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="role"
                  render={({ field: { value, onChange }, fieldState }) => (
                    <SelectInput
                      id="update-employee-role"
                      value={value}
                      onChange={onChange}
                      label="Role"
                      options={roleList}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="department"
                  render={({ field: { value, onChange }, fieldState }) => (
                    <SelectInput
                      value={value}
                      onChange={onChange}
                      label="Department"
                      options={departmentList}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="username"
                  render={({ field: { value, onChange }, fieldState }) => (
                    <InputWrapper>
                      <ValidateInput
                        label="Username"
                        className="text-sm"
                        type="text"
                        fullWidth
                        value={value}
                        placeHolder="Username"
                        errors={fieldState.error?.message}
                        onChange={onChange}
                      />
                    </InputWrapper>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  render={({ field: { value, onChange }, fieldState }) => (
                    <InputWrapper>
                      <ValidateInput
                        label="Password"
                        id="update-employee-password"
                        className="text-sm"
                        type="password"
                        fullWidth
                        value={value}
                        placeHolder="Password"
                        errors={fieldState.error?.message}
                        onChange={onChange}
                      />
                    </InputWrapper>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <StyleButtonWrapper>
                  <LoadingButton
                    loading={isFormLoading}
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
                    className="button-create-mui"
                    fullWidth
                    type="submit">
                    {submitLabel}
                  </LoadingButton>
                </StyleButtonWrapper>
              </Grid>
            </Grid>
          </form>
        </StyleModalWrapper>
      </FormProvider>
    </ModalBase>
  );
}

export default UpdateEmployeeModal;
