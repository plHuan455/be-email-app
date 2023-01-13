import { useTranslation } from '@@packages/localization/src';
import UploadArea from '@components/atoms/UploadArea';

import Layout from '@layouts/Layout';
import { SelectChangeEvent, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import React, { useCallback, useEffect } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { convertPathImage } from '@utils/functions';
import { useForm } from 'react-hook-form';
import { Select } from '@components/molecules/Select';
import { debounce } from 'lodash';
import { useOutletContext } from 'react-router-dom';

interface DepartmentTemplateProps extends CRUDComponentProps<DepartmentItemProps> {}

export interface DepartmentItemProps {
  id: number;
  name: string;
  description: string;
  address: string;
  company_id: number;
}

const DepartmentTemplate: React.FC<DepartmentTemplateProps> = ({
  schema,
  formData,
  onChange,

  onClear,
  onCancel,
  onSubmit,
  disabledClear,
}) => {
  const { t } = useTranslation();

  console.log('formData -->', formData);
  const {
    register,
    handleSubmit: _handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: formData,
    resolver: schema && yupResolver(schema),
    mode: 'all',
  });

  useEffect(() => {
    setValue('address', formData.address);
    setValue('company_id', formData.company_id);
    setValue('description', formData.description);
    setValue('id', formData.id);
    setValue('name', formData.name);
  }, [formData]);

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
  const handleChangeSelect = debounce((event: SelectChangeEvent<any>) => {
    formData[event.target.name] = event.target.value;
    onChange && onChange(formData);
  }, 300);

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
          <Typography sx={{ fontWeight: 700 }}>Description</Typography>
          <TextField
            {...register('description')}
            error={Boolean(errors.description)}
            helperText={errors.description?.message?.toString()}
            name="description"
            placeholder="description"
            defaultValue={formData.description}
            onChange={handleInputChange}
            size={'small'}
          />
        </FormControl>
        <FormControl fullWidth className="py-2">
          <Typography sx={{ fontWeight: 700 }}>Address</Typography>
          <TextField
            {...register('address')}
            error={Boolean(errors.address)}
            helperText={errors.address?.message?.toString()}
            name="address"
            placeholder="address"
            defaultValue={formData.address}
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
            {t('Company')}
          </Typography>
          <Select
            {...register('company_id')}
            error={Boolean(errors.company_id)}
            helperText={errors.company_id?.message?.toString()}
            id="company_id"
            name="company_id"
            value={formData.company_id}
            onChange={handleChangeSelect}
            size="small"
            options={companies}
            mapping={{
              label: (opt) => opt.name,
              value: (opt) => opt.id,
              key: (opt) => opt.id,
            }}
          />
        </FormControl>
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
