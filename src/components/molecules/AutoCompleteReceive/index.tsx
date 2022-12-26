import { UserInfo, UserReceiveInfo } from '@components/organisms/Email/Interface';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteRenderOptionState,
  Box,
  MenuItem,
  menuItemClasses,
  TextField,
} from '@mui/material';
import useEmailCompose from '../../../zustand/useEmailCompose';
import React, { MouseEventHandler, useEffect, useMemo, useState } from 'react';
import Receiver from '../../atoms/Receiver';

import './styles.scss';
import { emailRegex } from '@constants/constants';

import { isEmpty } from 'lodash';
import ContactReceive from '@components/atoms/ContactReceive';
import Icon from '@components/atoms/Icon';
import Dropdown from '../Dropdown';
import { EmailComposeModal } from '@components/organisms/Modal';

export interface InputContactBlock {
  contact_name: string;
  employeesList: UserReceiveInfo[];
}

interface Props {
  value: InputContactBlock[];
  data: InputContactBlock[];
  defaultValue?: InputContactBlock[];
  isReadOnly?: boolean;
  onChange?:
    | ((
        event: React.SyntheticEvent<Element, Event>,
        value: InputContactBlock[],
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<InputContactBlock> | undefined,
      ) => void)
    | undefined;
  onChangeValue?: (value: InputContactBlock[]) => void;
  fullWidth?: boolean;
  forField?: 'to' | 'cc' | 'bcc';
}

const AutoCompleteReceive: React.FC<Props> = ({
  value,
  data,
  defaultValue,
  isReadOnly = false,
  onChange = (e) => {},
  onChangeValue,
  fullWidth,
  forField,
}) => {
  const [tempNewUserInfo, setTempNewUserInfo] = useState<InputContactBlock[]>([]);
  const [isFocusInput, setIsFocusInput] = React.useState(false);
  const [isOpenSub, setIsOpenSub] = React.useState(false);

  const handleChangeInput = (e) => {
    const value = (e.target as HTMLInputElement).value.toLowerCase();

    const matchEmailRegex = value.match(emailRegex);

    if (matchEmailRegex) {
      // if input value is email type
      setTempNewUserInfo([
        {
          contact_name: value,
          employeesList: [new UserReceiveInfo('', value, value, false)],
        },
      ]);
    } else {
      // if input value not email type
      if (!isEmpty(tempNewUserInfo)) setTempNewUserInfo([]);
    }
  };

  const handleDeleteReceiver = (cb, index) => {
    return (e) => {
      if (!isReadOnly) {
        cb(index);
        setTempNewUserInfo([]);
      }
    };
  };

  const handleDeleteContact = (
    inputContactBlocks: InputContactBlock[],
    index: number,
  ) => {
    const contactBlock = inputContactBlocks[index];
    if (contactBlock) {
      contactBlock.employeesList.forEach((employ) => {
        if (employ.field === forField) {
          employ.isChecked = false;
          employ.field = undefined;
        }
      });
      inputContactBlocks.splice(index, 1);
      onChangeValue && onChangeValue([...inputContactBlocks]);
    }
  };

  return (
    <Autocomplete
      fullWidth={fullWidth}
      disableCloseOnSelect
      open={isFocusInput}
      value={value}
      onChange={onChange}
      readOnly={isReadOnly}
      className="emailComposeTo"
      multiple
      id="tags-outlined"
      options={[...data, ...tempNewUserInfo]}
      getOptionLabel={(option) => option.contact_name}
      defaultValue={defaultValue ? defaultValue : []}
      filterSelectedOptions
      autoHighlight
      renderOption={(props, option, state) => (
        <RenderOption
          forField={forField}
          props={props}
          option={option}
          options={[...data, ...tempNewUserInfo]}
          state={state}
          value={value}
          onChangeValue={onChangeValue}
          onClick={() => {
            console.log('onClick');
            setIsFocusInput(true);
            setIsOpenSub(true);
          }}
          onClose={() => {
            setIsOpenSub(false);
          }}
        />
      )}
      renderInput={(params) => {
        if (isReadOnly) params.InputProps.endAdornment = undefined;

        return (
          <Box className="flex justify-between items-center">
            <TextField
              {...params}
              className="outline-none border-transparent"
              onChange={handleChangeInput}
              focused={isFocusInput}
              onFocus={() => setIsFocusInput(true)}
              onBlur={() => {
                if (!isOpenSub) {
                  setIsFocusInput(false);
                }
              }}
            />
          </Box>
        );
      }}
      renderTags={(list, getTagProps) => {
        return list.map((receiver, index) => {
          const props = getTagProps({ index: index });

          const countChecked = receiver.employeesList.filter((employ) => {
            return employ.isChecked && forField === employ.field;
          }).length;

          if (receiver.contact_name.match(emailRegex))
            return (
              <Receiver
                key={index}
                data={receiver.employeesList[0]}
                haveCloseIcon={!isReadOnly}
                onDelete={handleDeleteReceiver(() => {
                  handleDeleteContact(list, index);
                }, index)}
              />
            );

          return (
            <ContactReceive
              contactName={receiver.contact_name}
              haveCloseIcon={!isReadOnly}
              onDelete={handleDeleteReceiver(() => {
                handleDeleteContact(list, index);
              }, index)}
              endAnchor={`${countChecked}/${receiver.employeesList.length}`}
            />
          );
        });
      }}
    />
  );
};

const RenderOption: React.FC<{
  props: React.HTMLAttributes<HTMLLIElement>;
  options: InputContactBlock[];
  option: InputContactBlock;
  state: AutocompleteRenderOptionState;
  value: InputContactBlock[];
  onClick?: () => void;
  onClose?: () => void;
  onChangeValue?: (value: InputContactBlock[]) => void;
  forField?: 'to' | 'cc' | 'bcc';
}> = ({
  props,
  options,
  option,
  state,
  value,
  onChangeValue,
  onClick,
  onClose,
  forField,
}) => {
  if (option.contact_name.match(emailRegex))
    return (
      <MenuItem {...props} className="block">
        <Receiver data={option.employeesList[0]} haveCloseIcon={false} />
      </MenuItem>
    );

  const isSelected = option.employeesList.some(
    (employ) => employ.isChecked && employ.field === forField,
  );

  const handleChange = (inputContactBlock: InputContactBlock) => {
    const countSelected = inputContactBlock.employeesList.filter(
      (eml) => eml.isChecked,
    ).length;
    const isSelect = value.findIndex((v) => v === inputContactBlock);

    // nếu ko có employ được chọn
    if (countSelected === 0) {
      // nếu employ có trong value thì xóa
      if (isSelect !== -1) {
        value.splice(isSelect, 1);
        onChangeValue && onChangeValue([...value]);
      }
      return;
    }

    // nếu có employ được chọn và contact chưa có trong value
    // thêm contact vào value
    if (countSelected > 0 && isSelect === -1) {
      value.push(inputContactBlock);
      onChangeValue && onChangeValue([...value]);

      return;
    }

    // nếu có employ được chọn và contact có trong value
    // cập nhật lại value
    if (countSelected > 0 && isSelect !== -1) {
      onChangeValue && onChangeValue([...value]);
      return;
    }
  }

  return (
    <Dropdown
      containerProps={{ sx: { width: '100%' } }}
      onClose={onClose}
      onClick={onClick}
      ButtonProps={{
        fullWidth: true,
        variant: 'text',
        color: 'inherit',
        sx: {
          justifyContent: 'flex-start',
          backgroundColor: isSelected ? '#e9e4ff' : 'inherit',
        },
      }}
      label={
        <p className="flex gap-2 font-medium items-center">
          <Icon
            width={20}
            height={20}
            rawColor="#7061e2"
            icon="department"
            className="bg-slate-400/60 rounded-full p-1"
          />
          {option.contact_name}
        </p>
      }>
      <MenuItem
        {...props}
        sx={{
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&.Mui-focusVisible': {
            backgroundColor: 'transparent',
          },
        }}
        disableRipple>
        <EmailComposeModal
          inputContactBlock={option}
          forField={forField}
          onChange={handleChange}
        />
      </MenuItem>
    </Dropdown>
  );
};

export default AutoCompleteReceive;
