import { useTranslation } from '@@packages/localization/src';
import UploadArea from '@components/atoms/UploadArea';

import Layout from '@layouts/Layout';
import {
  Autocomplete,
  Box,
  Button,
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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { convertPathImage, rem } from '@utils/functions';
import { useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';
import { ContactType } from '@containers/ContactContainer/Contacts/interface';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';
import { Contact } from '@redux/Contact/interface';
import AutoCompleteGroup from '@components/molecules/AutoCompleteGroup';
import HashtagInput from '@components/atoms/Input/HashtagInput';
import ModalBase from '@components/atoms/ModalBase';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ContactResponse } from '@api/contact/interface';

interface ContactsTemplateProps extends CRUDComponentProps<SignItemProps> {
  selectingContactList?: number[]
  contactList?: ContactResponse[];
  isOpenSelectContactModal?: boolean;
  onMemberFieldFocus?: () => void;
  onSelectingContactListChange?: (values: number[]) => void;
  onSelectContactModalClose?: () => void;
  onSelectContactModalConfirmClick?: () => void;
}

export interface SignItemProps {
  id: number;
  group_name: string;
  members: any[];
}

const ContactGroupTemplate: React.FC<ContactsTemplateProps> = ({
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

  contactList = [],
  selectingContactList = [],
  isOpenSelectContactModal = false,
  onMemberFieldFocus,
  onSelectingContactListChange,
  onSelectContactModalClose,
  onSelectContactModalConfirmClick,
}) => {
  useEffect(() => {
    setValue('id', formData.id);
    setValue('group_name', formData.group_name);
    setValue('members', formData.members);
  }, [formData]);

  // useSelector
  // const { contactsList } = useSelector((state: RootState) => state.contact);

  const { t } = useTranslation();

  const columns: GridColDef[] = [
    // { field: 'identify', headerName: 'Identify', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 3 },
  ];

  const convertedRows = useMemo(() => {
    return contactList.map(value => ({
      firstName: value.first_name,
      lastName: value.last_name,
      email: value.email,
      id: value.id
    }))
  }, contactList)

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
          <Box sx={{
            borderRadius: rem(8),
            backgroundColor: '#fff',
            border: '1px solid #c4c6ca',
            pl: rem(10),
            '&:has(.MuiInputBase-root.Mui-focused)': {
              borderColor: 'rgb(59, 53, 178)'
            }
          }}>
            <AutoCompleteGroup
              isOpenOption={false}
              value={formData.members}
              placeholder="Choose Contact"
              onOpen={onMemberFieldFocus}
              options={[]}
              onChange={(data) => {}}
            />

            <ModalBase isOpen={isOpenSelectContactModal} title='Select Contact' submitLabel='' onClose={onSelectContactModalClose}>
              <Box sx={{ width: '80vw' }}>
                <DataGrid
                  sx={{ height: '50vh' }}
                  rows={convertedRows}
                  columns={columns}
                  checkboxSelection
                  hideFooter
                  selectionModel={selectingContactList}
                  onSelectionModelChange={(data) => {
                    onSelectingContactListChange && onSelectingContactListChange(data as number[])
                  }}
                />
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  sx={{ mt: rem(8) }}>
                  <Button
                    sx={{
                      backgroundColor: '#dc3545',
                      '&:hover': { backgroundColor: '#bf192a' },
                    }}
                    onClick={onSelectContactModalClose}>
                    Cancel
                  </Button>
                  <Button
                    sx={{ ml: rem(20) }}
                    onClick={onSelectContactModalConfirmClick}
                    disabled={false}>
                    OK
                  </Button>
                </Box>
              </Box>
            </ModalBase>
          </Box>
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

export default ContactGroupTemplate;
