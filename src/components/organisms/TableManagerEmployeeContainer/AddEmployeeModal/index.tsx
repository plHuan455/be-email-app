import ValidateInput from "@components/atoms/Input/ValidateInput";
import ModalBase from "@components/atoms/ModalBase"
import { Button, Grid } from "@mui/material";
import { Controller, FormProvider, UseFormReturn } from "react-hook-form";
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

function AddEmployeeModal ({method, isOpen, title, onClose, onSubmit}: AddEmployeeModalProps) {
  return (
  <ModalBase 
    isOpen={isOpen}
    title={title} 
    style={{width: '90%'}} 
    onClose={onClose}
    submitLabel=""
  >
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Controller 
              name="fullName"
              render={({field: {value, onChange}, fieldState}) => (
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
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller 
              name="email"
              render={({field: {value, onChange}, fieldState}) => (
                <ValidateInput 
                  label="Email"
                  type="text"
                  fullWidth
                  value={value}
                  placeHolder="Email"
                  errors={fieldState.error?.message}
                  onChange={onChange}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller 
              name="position"
              render={({field: {value, onChange}, fieldState}) => (
                <ValidateInput
                  label="Position"
                  fullWidth
                  type="text"
                  value={value}
                  placeHolder="position"
                  errors={fieldState.error?.message}
                  onChange={onChange}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller 
              name="role"
              render={({field: {value, onChange}, fieldState}) => (
                <ValidateInput 
                  fullWidth
                  label="Role"
                  type="text"
                  variant="select"
                  value={value}
                  placeHolder="role"
                  errors={fieldState.error?.message}
                  onChange={onChange}
                />
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
)}

export default AddEmployeeModal