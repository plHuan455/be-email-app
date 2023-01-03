import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  FormControl,
  IconButton,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const schema = yup.object().shape({
  name: yup.string().required('Name is required!'),
});

interface hashtagFormType {
  name: string;
}

interface Props {
  formData: hashtagFormType;
  onChange: (formData: hashtagFormType) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const EditHashtag: React.FC<Props> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
}) => {
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

  return (
    <Box>
      <FormControl
        fullWidth
        className="py-1 flex flex-row items-center bg-white rounded-lg">
        <TextField
          {...register('name')}
          error={Boolean(errors.name)}
          helperText={errors.name?.message?.toString()}
          name="name"
          placeholder="Name"
          defaultValue={formData.name}
          onChange={handleInputChange}
          size={'small'}
          sx={{
            '& input': {
              paddingRight: 0,
            },
            '& fieldset': {
              border: 'none',
            },
          }}
        />
        <Box className="flex items-center">
          <IconButton onClick={_handleSubmit(onSubmit as any)}>
            <CheckIcon sx={{ fontSize: 16 }} color="success" />
          </IconButton>
          <IconButton onClick={onCancel}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </FormControl>
    </Box>
  );
};

export default EditHashtag;
