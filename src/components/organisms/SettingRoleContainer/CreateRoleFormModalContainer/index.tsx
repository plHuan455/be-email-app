import { createRole } from "@api/role";
import ValidateInput from "@components/atoms/Input/ValidateInput";
import ModalBase from "@components/atoms/ModalBase"
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Grid } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

const StyleButtonWrapper = styled.div`
  & .MuiLoadingButton-loading {
    color: #ffffff;
    opacity: 0.7;
  }
`;

const createSettingSchema = yup.object({
  name: yup.string().required(),
}).required();

const CreateRoleFormModalContainer: React.FC<CreateRoleFormModalContainerProps> = ({ isOpen, title, onClose }) => {
  const queryClient = useQueryClient();

  const method = useForm<CreateRoleFields>({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(createSettingSchema)
  })

  const { mutate: createRoleMutate, isLoading: isCreateRoleLoading } = useMutation({
    mutationKey: ['setting-role-create-role'],
    mutationFn: (query: { name: string }) => createRole(query),
    onSuccess: (data) => {
      toast.success('Role is created');
      queryClient.invalidateQueries({ queryKey: ['setting-role-get-header-tabs'] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? 'role creation is failed')
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
              <StyleButtonWrapper>
                <LoadingButton
                  loading={isCreateRoleLoading}
                  loadingPosition="end"
                  sx={{
                    backgroundColor: '#554CFF',
                    color: '#ffffff',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    '&:hover': {
                      backgroundColor: 'rgb(59, 53, 178)'
                    },
                    '.MuiLoadingButton-loading': {
                      color: '#ffffff'
                    }
                  }}
                  className="button-create-mui"
                  fullWidth
                  type="submit"
                >
                  Create employee
                </LoadingButton>
              </StyleButtonWrapper>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </ModalBase>
  )
}

export default CreateRoleFormModalContainer