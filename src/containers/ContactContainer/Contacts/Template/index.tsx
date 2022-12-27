import { useTranslation } from '@@packages/localization/src';
import UploadArea from '@components/atoms/UploadArea';

import Layout from '@layouts/Layout';
import { SelectChangeEvent, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { convertPathImage } from '@utils/functions';
import { useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';

interface ContactsTemplateProps extends CRUDComponentProps<SignItemProps> {}

export interface SignItemProps {
  id: number;
  first_name: string;
  last_name: string;
  mail: string;
  avatar: string;
}

const ContactsTemplate: React.FC<ContactsTemplateProps> = ({
  schema,
  formData,
  onChange,
  files,
  onChangeFile,
  onClear,
  onCancel,
  onSubmit,
  disabledClear,
  disabledSubmit,
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
          <Typography sx={{ fontWeight: 700 }}>First Name:</Typography>
          <TextField
            {...register('first_name')}
            error={Boolean(errors.first_name)}
            helperText={errors.first_name?.message?.toString()}
            name="first_name"
            placeholder="First Name"
            defaultValue={formData.first_name}
            onChange={handleInputChange}
            size={'small'}
          />
        </FormControl>
        <FormControl fullWidth className="py-2">
          <Typography sx={{ fontWeight: 700 }}>Last Name</Typography>
          <TextField
            {...register('last_name')}
            error={Boolean(errors.last_name)}
            helperText={errors.last_name?.message?.toString()}
            name="last_name"
            placeholder="Last Name"
            defaultValue={formData.last_name}
            onChange={handleInputChange}
            size={'small'}
          />
        </FormControl>
        <FormControl fullWidth className="py-2">
          <Typography sx={{ fontWeight: 700 }}>Email:</Typography>
          <TextField
            {...register('mail')}
            error={Boolean(errors.mail)}
            helperText={errors.mail?.message?.toString()}
            name="mail"
            placeholder="Email"
            defaultValue={formData.mail}
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
        disabledSubmit={disabledSubmit}
      />
    </div>
  );
};

export default ContactsTemplate;
