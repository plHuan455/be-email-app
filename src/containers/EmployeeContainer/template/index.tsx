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
import { Select } from '@components/molecules/Select';
import { debounce } from 'lodash';

interface DepartmentTemplateProps extends CRUDComponentProps<DepartmentItemProps> {}

export interface DepartmentItemProps {
  id: number;
  avatar: string;
  user_name: string;
  email: string;
  password: string;
  phone_number: string;
  position: string;
  role_id: string;
  department_id: string;
}

const DepartmentTemplate: React.FC<DepartmentTemplateProps> = ({
  schema,
  formData,
  files,
  onChangeFile,
  onChange,
  onClear,
  onCancel,
  onSubmit,
  disabledClear,
}) => {
  const { t } = useTranslation();

  console.log('formdata -->', formData);
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

  const handleChangeSelect = debounce((event: SelectChangeEvent<any>) => {
    formData[event.target.name] = event.target.value;
    onChange && onChange(formData);
  }, 300);

  return (
    <div className="w-full h-full relative">
      <div className="flex px-4 h-5/6 overflow-hidden">
        <div className="w-full h-full overflow-scroll">
          <FormControl fullWidth className="py-2">
            <Typography sx={{ fontWeight: 700 }}>Name</Typography>
            <TextField
              {...register('user_name')}
              error={Boolean(errors.user_name)}
              helperText={errors.user_name?.message?.toString()}
              name="user_name"
              placeholder="Name"
              defaultValue={formData.user_name}
              onChange={handleInputChange}
              size={'small'}
            />
          </FormControl>
          <FormControl fullWidth className="py-2">
            <Typography sx={{ fontWeight: 700 }}>email</Typography>
            <TextField
              {...register('email')}
              error={Boolean(errors.email)}
              helperText={errors.email?.message?.toString()}
              name="email"
              placeholder="email"
              defaultValue={formData.email}
              onChange={handleInputChange}
              size={'small'}
              autoComplete="new-email"
            />
          </FormControl>
          <FormControl fullWidth className="py-2">
            <Typography sx={{ fontWeight: 700 }}>password</Typography>
            <TextField
              {...register('password')}
              type={'password'}
              error={Boolean(errors.password)}
              helperText={errors.password?.message?.toString()}
              name="password"
              placeholder="password"
              defaultValue={formData.password}
              onChange={handleInputChange}
              size={'small'}
              autoComplete="new-password"
            />
          </FormControl>
          <FormControl fullWidth className="py-2">
            <Typography sx={{ fontWeight: 700 }}>phone_number</Typography>
            <TextField
              {...register('phone_number')}
              type={'phone_number'}
              error={Boolean(errors.phone_number)}
              helperText={errors.phone_number?.message?.toString()}
              name="phone_number"
              placeholder="phone_number"
              defaultValue={formData.phone_number}
              onChange={handleInputChange}
              size={'small'}
            />
          </FormControl>
          <FormControl fullWidth className="py-2">
            <Typography sx={{ fontWeight: 700 }}>position</Typography>
            <TextField
              {...register('position')}
              type={'position'}
              error={Boolean(errors.position)}
              helperText={errors.position?.message?.toString()}
              name="position"
              placeholder="position"
              defaultValue={formData.position}
              onChange={handleInputChange}
              size={'small'}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Typography
              sx={{
                fontWeight: 700,
                mb: 2,
              }}>
              {t('role_id')}
            </Typography>
            <Select
              {...register('role_id')}
              error={Boolean(errors.role_id)}
              helperText={errors.role_id?.message?.toString()}
              id="role_id"
              name="role_id"
              defaultValue={formData.role_id}
              onChange={handleChangeSelect}
              size="small"
              options={companies}
              mapping={{
                label: (opt) => opt.name,
                value: (opt) => opt.id.toString(),
                key: (opt) => opt.id,
              }}
            />
          </FormControl>
          {/* 
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Typography
              sx={{
                fontWeight: 700,
                mb: 2,
              }}>
              {t('department_id')}
            </Typography>
            <Select
              {...register('department_id')}
              error={Boolean(errors.department_id)}
              helperText={errors.department_id?.message?.toString()}
              id="department_id"
              name="department_id"
              defaultValue={formData.department_id}
              onChange={handleChangeSelect}
              size="small"
              options={companies}
              mapping={{
                label: (opt) => opt.name,
                value: (opt) => opt.id.toString(),
                key: (opt) => opt.id,
              }}
            />
          </FormControl> */}

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
      </div>

      <Layout.GroupButton
        onClear={onClear}
        onCancel={onCancel}
        onSubmit={_handleSubmit(onSubmit as any)}
        disabledClear={disabledClear}
      />
    </div>
  );
};

export default DepartmentTemplate;

interface CompanyProps {
  id: number;
  name: string;
}

const companies: CompanyProps[] = [
  {
    id: 1,
    name: 'Company A',
  },
  {
    id: 2,
    name: 'Company B',
  },
  {
    id: 3,
    name: 'Company C',
  },
];
