import { useTranslation } from '@@packages/localization/src';
import UploadArea from '@components/atoms/UploadArea';

import Layout from '@layouts/Layout';
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import React, { useCallback, useEffect } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { convertPathImage } from '@utils/functions';
import { useForm } from 'react-hook-form';
import { Select } from '@components/molecules/Select';
import { debounce, isEmpty } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { getRole } from '@api/role';
import { getAllPositionInDepartment } from '@api/deparment';
import { useParams } from 'react-router-dom';

interface DepartmentTemplateProps extends CRUDComponentProps<DepartmentItemProps> {
  editMode?: boolean;
}

export interface DepartmentItemProps {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  identity: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone_number: string;
  position: string;
  role_id: string;
  department_id: string;
  sex: string;
  national: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  number: string;
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
  editMode,
}) => {
  const { t } = useTranslation();

  const params = useParams();

  console.log('editMode -->', editMode);
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

  const { data: rolesList } = useQuery({
    queryKey: ['get-roles'],
    queryFn: getRole,
  });
  const { data: positionsList } = useQuery({
    queryKey: ['get-all-positions'],
    queryFn: () => getAllPositionInDepartment(+(params.idDepartment ?? 0)),
    onSuccess: (res) => {
      if (!formData.position)
        if (!isEmpty(res.data)) {
          formData.position = res.data[0].name;

          onChange && onChange(formData);
        }
    },
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
    <div className="w-full relative flex flex-col flex-1 overflow-hidden">
      <div className="flex px-4 h-[85%] overflow-hidden">
        <div className="w-full h-full overflow-scroll">
          <FormControl fullWidth className="py-2">
            <Typography sx={{ fontWeight: 700 }}>{t('First Name')} :</Typography>
            <TextField
              {...register('first_name')}
              error={Boolean(errors.first_name)}
              helperText={errors.first_name?.message?.toString()}
              name="first_name"
              placeholder={t('First Name')}
              defaultValue={formData.first_name}
              onChange={handleInputChange}
              size={'small'}
            />
          </FormControl>
          <FormControl fullWidth className="py-2">
            <Typography sx={{ fontWeight: 700 }}>{t('Last Name')}:</Typography>
            <TextField
              {...register('last_name')}
              error={Boolean(errors.last_name)}
              helperText={errors.last_name?.message?.toString()}
              name="last_name"
              placeholder={t('Last Name')}
              defaultValue={formData.last_name}
              onChange={handleInputChange}
              size={'small'}
            />
          </FormControl>
          <FormControl fullWidth className="py-2">
            <Typography sx={{ fontWeight: 700 }}>{t('Identity')}:</Typography>
            <TextField
              {...register('identity')}
              error={Boolean(errors.identity)}
              helperText={errors.identity?.message?.toString()}
              name="identity"
              placeholder={t('Identity')}
              defaultValue={formData.identity}
              onChange={handleInputChange}
              size={'small'}
            />
          </FormControl>
          <FormControl fullWidth className="py-2">
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ fontWeight: 700, color: 'black' }}>
              {t('Gender')}:
            </FormLabel>
            <RadioGroup
              {...register('sex')}
              className="flex-row gap-4"
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={formData.sex}
              name="sex"
              onChange={handleChangeSelect}>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth className="py-2">
            <Typography sx={{ fontWeight: 700 }}>{t('Email')}:</Typography>
            <TextField
              {...register('email')}
              error={Boolean(errors.email)}
              helperText={errors.email?.message?.toString()}
              name="email"
              placeholder={t('Email')}
              defaultValue={formData.email}
              onChange={handleInputChange}
              size={'small'}
              autoComplete="new-email"
              disabled={editMode}
            />
          </FormControl>
          {!editMode && (
            <FormControl fullWidth className="py-2">
              <Typography sx={{ fontWeight: 700 }}>{t('Password')}:</Typography>
              <TextField
                {...register('password')}
                type={'password'}
                error={Boolean(errors.password)}
                helperText={errors.password?.message?.toString()}
                name="password"
                placeholder={t('Password')}
                defaultValue={formData.password}
                onChange={handleInputChange}
                size={'small'}
                autoComplete="new-password"
              />
            </FormControl>
          )}
          {!editMode && (
            <FormControl fullWidth className="py-2">
              <Typography sx={{ fontWeight: 700 }}>
                {t('Confirm Password')}:
              </Typography>
              <TextField
                {...register('confirmPassword')}
                type={'password'}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword?.message?.toString()}
                name="confirmPassword"
                placeholder={t('Confirm Password')}
                defaultValue={formData.confirmPassword}
                onChange={handleInputChange}
                size={'small'}
                autoComplete="new-password"
              />
            </FormControl>
          )}
          <FormControl fullWidth className="py-2">
            <Typography sx={{ fontWeight: 700 }}>{t('Phone Number')}:</Typography>
            <TextField
              {...register('phone_number')}
              type={'phone_number'}
              error={Boolean(errors.phone_number)}
              helperText={errors.phone_number?.message?.toString()}
              name="phone_number"
              placeholder={t('Phone Number')}
              defaultValue={formData.phone_number}
              onChange={handleInputChange}
              size={'small'}
            />
          </FormControl>
          <FormControl sx={{ width: '50%' }} className="py-2">
            <Typography sx={{ fontWeight: 700 }}>{t('National')} :</Typography>
            <TextField
              {...register('national')}
              error={Boolean(errors.national)}
              helperText={errors.national?.message?.toString()}
              name="national"
              placeholder={t('National')}
              defaultValue={formData.national}
              onChange={handleInputChange}
              size={'small'}
            />
          </FormControl>
          <FormControl sx={{ width: '50%' }} className="py-2 pl-2">
            <Typography sx={{ fontWeight: 700 }}>{t('City')} :</Typography>
            <TextField
              {...register('city')}
              error={Boolean(errors.city)}
              helperText={errors.city?.message?.toString()}
              name="city"
              placeholder={t('City')}
              defaultValue={formData.city}
              onChange={handleInputChange}
              size={'small'}
            />
          </FormControl>
          <FormControl sx={{ width: '50%' }} className="py-2">
            <Typography sx={{ fontWeight: 700 }}>{t('District')} :</Typography>
            <TextField
              {...register('district')}
              error={Boolean(errors.district)}
              helperText={errors.district?.message?.toString()}
              name="district"
              placeholder={t('District')}
              defaultValue={formData.district}
              onChange={handleInputChange}
              size={'small'}
            />
          </FormControl>
          <FormControl sx={{ width: '50%' }} className="py-2 pl-2">
            <Typography sx={{ fontWeight: 700 }}>{t('Ward')} :</Typography>
            <TextField
              {...register('ward')}
              error={Boolean(errors.ward)}
              helperText={errors.ward?.message?.toString()}
              name="ward"
              placeholder={t('Ward')}
              defaultValue={formData.ward}
              onChange={handleInputChange}
              size={'small'}
            />
          </FormControl>
          <FormControl sx={{ width: '50%' }} className="py-2">
            <Typography sx={{ fontWeight: 700 }}>{t('Street')} :</Typography>
            <TextField
              {...register('street')}
              error={Boolean(errors.street)}
              helperText={errors.street?.message?.toString()}
              name="street"
              placeholder={t('Street')}
              defaultValue={formData.street}
              onChange={handleInputChange}
              size={'small'}
            />
          </FormControl>
          <FormControl sx={{ width: '50%' }} className="py-2 pl-2">
            <Typography sx={{ fontWeight: 700 }}>{t('Number')} :</Typography>
            <TextField
              {...register('number')}
              error={Boolean(errors.number)}
              helperText={errors.number?.message?.toString()}
              name="number"
              placeholder={t('Number')}
              defaultValue={formData.number}
              onChange={handleInputChange}
              size={'small'}
            />
          </FormControl>
          {!editMode && (
            <FormControl fullWidth className="py-2">
              <Typography sx={{ fontWeight: 700 }}>{t('Position')}:</Typography>
              {/* <TextField
                {...register('position')}
                type={'position'}
                error={Boolean(errors.position)}
                helperText={errors.position?.message?.toString()}
                name="position"
                placeholder="position"
                defaultValue={formData.position}
                onChange={handleInputChange}
                size={'small'}
              /> */}
              <Select
                {...register('position')}
                error={Boolean(errors.position)}
                helperText={errors.position?.message?.toString()}
                id="position"
                name="position"
                onChange={handleChangeSelect}
                size="small"
                defaultValue={formData.position}
                options={positionsList?.data ?? []}
                mapping={{
                  label: (opt) => opt.name,
                  value: (opt) => opt.name,
                  key: (opt) => opt.id,
                }}
              />
            </FormControl>
          )}
          {!editMode && (
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}>
                {t('Role')}
              </Typography>
              <Select
                {...register('role_id')}
                error={Boolean(errors.role_id)}
                helperText={errors.role_id?.message?.toString()}
                id="role_id"
                name="role_id"
                onChange={handleChangeSelect}
                size="small"
                value={+getValues('role_id')}
                options={rolesList?.data ?? []}
                mapping={{
                  label: (opt) => opt.name,
                  value: (opt) => opt.id,
                  key: (opt) => opt.id,
                }}
              />
            </FormControl>
          )}
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
