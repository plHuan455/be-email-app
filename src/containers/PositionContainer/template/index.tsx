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
import { useQuery } from '@tanstack/react-query';
import { getRole } from '@api/role';
import { getAllPositionInDepartment } from '@api/deparment';
import { useParams } from 'react-router-dom';

interface PositionTemplateProps extends CRUDComponentProps<PositionItemProps> {}

export interface PositionItemProps {
  id: number;
  name: string;
  describe: string;
  department_id: string;
}

const PositionTemplate: React.FC<PositionTemplateProps> = ({
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

  const params = useParams();

  const {
    register,
    handleSubmit: _handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    resolver: schema && yupResolver(schema),
    mode: 'all',
  });

  console.log(errors);

  const { data: rolesList } = useQuery({
    queryKey: ['get-roles'],
    queryFn: getRole,
  });
  const { data: positionsList } = useQuery({
    queryKey: ['get-all-positions'],
    queryFn: () => getAllPositionInDepartment(+(params.idDepartment ?? 0)),
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
            <Typography sx={{ fontWeight: 700 }}>Name:</Typography>
            <TextField
              {...register('name')}
              error={Boolean(errors.name)}
              helperText={errors.name?.message?.toString()}
              name="name"
              placeholder="name"
              defaultValue={formData.name}
              onChange={handleInputChange}
              size={'small'}
            />
          </FormControl>
          <FormControl fullWidth className="py-2">
            <Typography sx={{ fontWeight: 700 }}>Describe:</Typography>
            <TextField
              {...register('describe')}
              error={Boolean(errors.describe)}
              helperText={errors.describe?.message?.toString()}
              name="describe"
              placeholder="describe"
              defaultValue={formData.describe}
              onChange={handleInputChange}
              size={'small'}
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

export default PositionTemplate;

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
