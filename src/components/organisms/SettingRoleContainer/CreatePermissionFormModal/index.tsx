import ValidateInput from "@components/atoms/Input/ValidateInput";
import ModalBase from "@components/atoms/ModalBase"
import { Button, Grid } from "@mui/material";
import { Controller, FormProvider, UseFormReturn } from "react-hook-form";
import styled from "styled-components";

export interface CreatePermissionFields {
  name: string;
}
interface CreatePermissionFormModalProps {
  method: UseFormReturn<CreatePermissionFields>
  isOpen: boolean;
  title: string;
  onSubmit: (values: CreatePermissionFields) => void;
  onClose: () => void;
}


const InputWrapper = styled.div`
  .input {
    font-size: 16px;
  }
`;

const CreatePermissionFormModal: React.FC<CreatePermissionFormModalProps> = ({ method, isOpen, title, onClose, onSubmit }) => {
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
                name="name"
                render={({ field: { value, onChange }, fieldState }) => (
                  <InputWrapper>
                    <ValidateInput
                      label="Role name"
                      className="text-sm"
                      type="text"
                      fullWidth
                      value={value}
                      placeHolder="Enter role name ..."
                      errors={fieldState.error?.message}
                      onChange={onChange}
                    />
                  </InputWrapper>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button className="button-create-mui" fullWidth type="submit">Create Permission</Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </ModalBase>
  )
}

export default CreatePermissionFormModal