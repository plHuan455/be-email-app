import { useTranslation } from '@@packages/localization/src';
import UploadArea from '@components/atoms/UploadArea';

import Layout from '@layouts/Layout';
import { SelectChangeEvent, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import React, { useCallback } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { convertPathImage } from '@utils/functions';
import { useForm } from 'react-hook-form';

interface SignatureTemplateProps extends CRUDComponentProps<SignItemProps> {}

export interface SignItemProps {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  avatar: string;
}

const SignatureTemplate: React.FC<SignatureTemplateProps> = ({
  schema,
  formData,
  onChange,
  files,
  onChangeFile,
  onClear,
  onCancel,
  onSubmit,
  disabledClear,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit: _handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    resolver: schema && yupResolver(schema),
    mode: 'all',
  });

  const handleInputChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<any>,
    ) => {
      console.log('input change -->', e.target.value);
      console.log('input name -->', e.target.name);

      if (!e.target.name) {
        e.target.name = 'avatar';
      }

      onChange &&
        onChange({
          ...formData,
          [e.target.name]: e.target.value,
        });
    },
    [formData],
  );

  const handleOnChangeFile = (key: string) => (fItem?: FileList) => {
    if (files) {
      files[key] = fItem;
      onChangeFile && onChangeFile({ ...files });
    }
  };

  return (
    <div className="w-full h-full relative">
      <div className="px-4">
        <FormControl fullWidth className="py-2">
          <Typography sx={{ fontWeight: 700 }}>Name</Typography>
          <TextField
            {...register('name')}
            error={Boolean(errors.name)}
            helperText={errors.name?.message?.toString()}
            name="name"
            placeholder="Name"
            defaultValue={formData.name}
            onChange={handleInputChange}
            size={'small'}
          />
        </FormControl>
        <FormControl fullWidth className="py-2">
          <Typography sx={{ fontWeight: 700 }}>Position</Typography>
          <TextField
            {...register('position')}
            error={Boolean(errors.position)}
            helperText={errors.position?.message?.toString()}
            name="position"
            placeholder="Position"
            defaultValue={formData.position}
            onChange={handleInputChange}
            size={'small'}
          />
        </FormControl>
        <FormControl fullWidth className="py-2">
          <Typography sx={{ fontWeight: 700 }}>Phone Number</Typography>
          <TextField
            {...register('phone')}
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message?.toString()}
            name="phone"
            placeholder="phone number"
            defaultValue={formData.phone}
            onChange={handleInputChange}
            size={'small'}
          />
        </FormControl>
        <FormControl fullWidth className="py-2">
          <Typography sx={{ fontWeight: 700 }}>Email Address</Typography>
          <TextField
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={errors.email?.message?.toString()}
            name="email"
            placeholder="your email"
            defaultValue={formData.email}
            onChange={handleInputChange}
            size={'small'}
          />
        </FormControl>

        <FormControl fullWidth className="py-2">
          <Typography sx={{ fontWeight: 700, marginBottom: 4 }}>
            Upload Avatar
          </Typography>
          <UploadArea
            containerId="sign__image"
            onChange={handleInputChange}
            defaultValue={[convertPathImage(formData.avatar)]}
            fileSelected={files?.avatar}
            onFileChange={handleOnChangeFile('avatar')}
            dragDrop
            preview
          />
        </FormControl>
      </div>

      <Layout.GroupButton
        onClear={onClear}
        onCancel={onCancel}
        onSubmit={_handleSubmit(onSubmit as any)}
        disabledClear={disabledClear}
        disabledSticky
      />
    </div>
  );
};

export default SignatureTemplate;
