import { useTranslation } from '@@packages/localization/src';
import UploadArea from '@components/atoms/UploadArea';

import Layout from '@layouts/Layout';
import {
  Checkbox,
  FormHelperText,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { convertPathImage } from '@utils/functions';
import { useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';
import { ContactType } from '@containers/ContactContainer/Contacts/interface';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';
import { Contact } from '@redux/Contact/interface';

interface ContactsTemplateProps extends CRUDComponentProps<SignItemProps> {}

export interface SignItemProps {
  id: number;
  group_name: string;
  members: any[];
}

const ContactSharingGroupsTemplate: React.FC<ContactsTemplateProps> = ({
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
  useEffect(() => {
    setValue('id', formData.id);
    setValue('group_name', formData.group_name);
    setValue('members', formData.members);
  }, [formData]);

  // useSelector
  const { contactsList } = useSelector((state: RootState) => state.contact);

  const { t } = useTranslation();

  const {
    setValue,
    register,
    handleSubmit: _handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    resolver: schema && yupResolver(schema),
    mode: 'all',
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

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
          <Typography sx={{ fontWeight: 700 }}>Group Name:</Typography>
          <TextField
            {...register('group_name')}
            error={Boolean(errors.group_name)}
            helperText={errors.group_name?.message?.toString()}
            name="group_name"
            placeholder="First Name"
            defaultValue={formData.group_name}
            onChange={handleInputChange}
            size={'small'}
          />
        </FormControl>
        <FormControl fullWidth className="py-2">
          <Typography sx={{ fontWeight: 700 }}>Members :</Typography>
          {/* <TextField
            {...register('last_name')}
            error={Boolean(errors.last_name)}
            helperText={errors.last_name?.message?.toString()}
            name="last_name"
            placeholder="Last Name"
            defaultValue={formData.last_name}
            onChange={handleInputChange}
            size={'small'}
          /> */}
          <Select
            displayEmpty
            labelId=""
            name="members"
            placeholder="Member"
            multiple
            value={formData.members}
            defaultValue={contactsList}
            error={Boolean(errors.members)}
            onChange={handleInputChange}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}>
            {contactsList.map((contact) => {
              return (
                <MenuItem key={contact.id} value={contact.mail}>
                  <Checkbox checked={formData.members.indexOf(contact.mail) > -1} />
                  <ListItemText
                    primary={`${contact.first_name} ${contact.last_name}`}
                  />
                </MenuItem>
              );
            })}
          </Select>
          {errors.members?.message?.toString() && (
            <FormHelperText>{errors.members?.message?.toString()}</FormHelperText>
          )}
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

export default ContactSharingGroupsTemplate;
