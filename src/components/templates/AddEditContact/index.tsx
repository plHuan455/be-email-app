import AvatarInput from "@components/atoms/Input/AvatarInput";
import BasePhoneInput from "@components/atoms/Input/BasePhoneInput";
import UploadArea from "@components/atoms/UploadArea"
import Layout from "@layouts/Layout"
import { FormControl, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { rem } from "@utils/functions";
import { Controller, FormProvider, UseFormReturn } from "react-hook-form";

export interface ContactFields {
  phone?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar: {file?: File; defaultUrl?: string};
}

interface AddEditContactProps {
  method: UseFormReturn<ContactFields>
  onSubmit: (values: ContactFields) => void;
  onCancel?: () => void;
}

const AddEditContact: React.FC<AddEditContactProps> = ({
  method,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="t-addEditContact w-full h-full relative">
      <FormProvider {...method} >
        <form className="px-4" onSubmit={method.handleSubmit(onSubmit)}>
          <Box>
            <Controller
              name="avatar"
              render={({field: {value, onChange}}) => (
                <AvatarInput
                  placeholderImgSrc={value.defaultUrl} 
                  onChange={onChange}
                />
              )}
            />
          </Box>
          <Controller
            name="firstName" 
            render={({field: {value, onChange}, fieldState}) => (
              <FormControl fullWidth className="py-2">
                <Typography sx={{ fontWeight: 700 }}>First Name:</Typography>
                <TextField
                  helperText={fieldState.error?.message}
                  error={Boolean(fieldState.error?.message)}
                  required
                  onChange={onChange}
                  value={value}
                  placeholder="First Name"
                  // defaultValue={formData.first_name}
                  // onChange={handleInputChange}
                  size={'small'}
                />
              </FormControl>
            )}
          />
          <Controller 
            name="lastName"
            render={({field: {value, onChange}, fieldState}) => (
              <FormControl fullWidth className="py-2">
                <Typography sx={{ fontWeight: 700 }}>Last Name</Typography>
                <TextField
                  // {...register('last_name')}
                  // error={Boolean(errors.last_name)}
                  // helperText={errors.last_name?.message?.toString()}
                  helperText={fieldState.error?.message}
                  error={Boolean(fieldState.error?.message)}
                  value={value}
                  onChange={onChange}
                  placeholder="Last Name"
                  // defaultValue={formData.last_name}
                  // onChange={handleInputChange}
                  size={'small'}
                />
              </FormControl>
            )}
          />
          <Controller 
            name="email"
            render={({field: {value, onChange}, fieldState}) => (
              <FormControl fullWidth className="py-2">
                <Typography sx={{ fontWeight: 700 }}>Email:</Typography>
                <TextField
                  // {...register('mail')}
                  // error={Boolean(errors.mail)}
                  // helperText={errors.mail?.message?.toString()}
                  helperText={fieldState.error?.message}
                  error={Boolean(fieldState.error?.message)}
                  value={value}
                  onChange={onChange}
                  placeholder="Email"
                  type="email"
                  // defaultValue={formData.mail}
                  // onChange={handleInputChange}
                  size={'small'}
                />
              </FormControl>
            )}
          />
          <Controller 
            name="phone"
            render={({field: {value, onChange}, fieldState}) => (
              <FormControl fullWidth className="py-2" sx={{'& .country-list': { bottom: rem(50)}}}>
                <Typography sx={{ fontWeight: 700 }}>Phone number:</Typography>
                <BasePhoneInput
                  value={value}
                  onChange={onChange}
                />
              </FormControl>
            )}
          />
          {/* <FormControl fullWidth className="py-2">
            <Typography sx={{ fontWeight: 700, marginBottom: 4 }}>
              Upload Avatar
            </Typography>
            <UploadArea
              containerId="sign__image"
              // onChange={handleInputChange}
              defaultValue={[convertPathImage(formData.avatar)]}
              fileSelected={files?.avatar}
              // onFileChange={handleOnChangeFile('avatar')}
              dragDrop
              preview
            />
          </FormControl> */}
        </form>
      </FormProvider>
      <Layout.GroupButton
      onCancel={onCancel}
      onSubmit={() => method.handleSubmit(onSubmit)()}
      disabledClear={true}
      // disabledSubmit={disabledSubmit}
      />
    </div>
  )
}

export default AddEditContact