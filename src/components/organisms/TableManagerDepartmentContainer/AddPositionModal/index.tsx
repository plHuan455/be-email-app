import ValidateInput from '@components/atoms/Input/ValidateInput';
import ModalBase from '@components/atoms/ModalBase';
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid } from '@mui/material';
import React from 'react';
import { Controller, FormProvider, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import { string } from 'yup';

export interface AddPositionField {
  name: string;
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

interface AddPositionModalProps {
  method: UseFormReturn<AddPositionField>;
  isFormLoading: boolean;
  isOpen: boolean;
  title: string;
  onSubmit: () => {};
  onCancel: () => {};
}

const AddPositionModal: React.FC<AddPositionModalProps> = ({
  method,
  isFormLoading,
  isOpen,
  title,
  onSubmit,
  onCancel,
}) => {
  return (
    <ModalBase isOpen={true} title="">
      <FormProvider {...method}>
        <form
          onSubmit={method.handleSubmit(onSubmit)}
          className="o-tableManagerDepartment_form">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Controller
                name="name"
                render={({ field: { value, onChange }, fieldState }) => (
                  <InputWrapper>
                    <ValidateInput
                      label="Name"
                      type="text"
                      fullWidth
                      value={value}
                      placeHolder="name"
                      errors={fieldState.error?.message}
                      onChange={onChange}
                    />
                  </InputWrapper>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                render={({ field: { value, onChange }, fieldState }) => (
                  <InputWrapper>
                    <ValidateInput
                      label="Description"
                      type="text"
                      fullWidth
                      value={value}
                      placeHolder="description"
                      errors={fieldState.error?.message}
                      onChange={onChange}
                    />
                  </InputWrapper>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address"
                render={({ field: { value, onChange }, fieldState }) => (
                  <InputWrapper>
                    <ValidateInput
                      label="Address"
                      fullWidth
                      type="text"
                      variant="select"
                      value={value}
                      placeHolder="address"
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
                  Create department
                </LoadingButton>
              </StyleButtonWrapper>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </ModalBase>
  );
};

export default AddPositionModal;
