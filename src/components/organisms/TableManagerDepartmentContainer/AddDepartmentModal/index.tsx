import ValidateInput from "@components/atoms/Input/ValidateInput";
import ModalBase from "@components/atoms/ModalBase"
import { Button, Grid } from "@mui/material";
import { Controller, FormProvider, UseFormReturn } from "react-hook-form";
import styled from "styled-components";

export interface AddDepartmentField {
  name: string;
  description: string;
  number: number;
  address: string;
}
interface AddDepartmentModalProps {
  method: UseFormReturn<AddDepartmentField>
  isOpen: boolean;
  title: string;
  onSubmit: (values: AddDepartmentField) => void;
  onClose: () => void;
}

const InputWrapper = styled.div`
  .input {
    font-size: 16px;
  }
`;

function AddDepartmentModal ({method, isOpen, title, onClose, onSubmit}: AddDepartmentModalProps) {
  return (
  <ModalBase 
    isOpen={isOpen}
    title={title} 
    style={{width: '90%'}} 
    onClose={onClose}
    submitLabel=""
  >
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(onSubmit)} className="o-tableManagerDepartment_form">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Controller 
              name="name"
              render={({field: {value, onChange}, fieldState}) => (
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
              render={({field: {value, onChange}, fieldState}) => (
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
              render={({field: {value, onChange}, fieldState}) => (
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
            <Button className="button-create-mui" fullWidth   type="submit">Create department</Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  </ModalBase>
)}

export default AddDepartmentModal