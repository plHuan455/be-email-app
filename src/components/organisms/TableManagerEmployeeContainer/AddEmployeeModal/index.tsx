import SelectInput from "@components/atoms/Input/SelectInput";
import ValidateInput from "@components/atoms/Input/ValidateInput";
import ModalBase from "@components/atoms/ModalBase"
import { Button, Grid } from "@mui/material";
import { Controller, FormProvider, UseFormReturn } from "react-hook-form";
import styled from "styled-components";

export interface AddEmployeeField {
  fullName: string;
  email: string;
  position: string;
  role: string;
}
interface AddEmployeeModalProps {
  method: UseFormReturn<AddEmployeeField>
  isOpen: boolean;
  title: string;
  onSubmit: (values: AddEmployeeField) => void;
  onClose: () => void;
}


const InputWrapper = styled.div`
  .input {
    font-size: 16px;
  }
`;

function AddEmployeeModal({ method, isOpen, title, onClose, onSubmit }: AddEmployeeModalProps) {
  return (
    <ModalBase
      isOpen={isOpen}
      title={title}
      style={{ width: '90%' }}
      onClose={onClose}
      submitLabel=""
    >
      <FormProvider {...method}>
        <form className="o-tableManagerEmployee_form" onSubmit={method.handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Controller
                name="fullName"
                render={({ field: { value, onChange }, fieldState }) => (
                  <InputWrapper>
                    <ValidateInput
                      label="Full Name"
                      className="text-sm"
                      type="text"
                      fullWidth
                      value={value}
                      placeHolder="Full Name"
                      errors={fieldState.error?.message}
                      onChange={onChange}
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
                name="position"
                render={({ field: { value, onChange }, fieldState }) => (
                  <InputWrapper>
                    <ValidateInput
                      label="Position"
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
                    value={value}
                    onChange={onChange}
                    label="Role"
                    options={[
                      { value: 'Admin', label: 'Admin' },
                      { value: 'Employee', label: 'Employee' },
                      { value: 'Manager', label: 'Manager' },
                      { value: 'Manager 02', label: 'Manager 02' },
                      { value: 'Blocked', label: 'Blocked' },
                    ]} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button className="button-create-mui" fullWidth type="submit">Create employee</Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </ModalBase>
  )
}

export default AddEmployeeModal