import { createRole } from "@api/role";
import ValidateInput from "@components/atoms/Input/ValidateInput";
import ModalBase from "@components/atoms/ModalBase"
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Controller, FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import * as yup from 'yup';

export interface CreateRoleFields {
  name: string;
}
interface CreateRoleFormModalContainerProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
}


const InputWrapper = styled.div`
  .input {
    font-size: 16px;
  }
`;


const createSettingSchema = yup.object({
  name: yup.string().required(),
}).required();

const CreateRoleFormModalContainer: React.FC<CreateRoleFormModalContainerProps> = ({ isOpen, title, onClose }) => {
  const method = useForm<CreateRoleFields>({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(createSettingSchema)
  })
  
  const {mutate: createRoleMutate} = useMutation({
    mutationKey: ['setting-role-create-role'],
    mutationFn: (query: { name: string }) => createRole(query),
    onSuccess: (data) => {
      toast.success('Role is created');
    },
    onError: (err: any) => {
      toast.error('role creation is failed')
    }
  });

  const handleSubmit = (values) => {
    createRoleMutate(values);
  }
  
  return (
    <ModalBase
      isOpen={isOpen}
      title={title}
      style={{ width: '90%' }}
      onClose={onClose}
      submitLabel=""
    >
      <FormProvider {...method}>
        <form className="o-tableManagerEmployee_form" onSubmit={method.handleSubmit(handleSubmit)}>
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
              <Button className="button-create-mui" fullWidth type="submit">Create role</Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </ModalBase>
  )
}

export default CreateRoleFormModalContainer