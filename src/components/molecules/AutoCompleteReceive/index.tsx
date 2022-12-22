import { UserInfo } from '@components/organisms/Email/Interface';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Box,
  MenuItem,
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

export interface InputContactBlock {
  contact_name: string;
  employeesList: UserInfo[];
}

interface Props {
  value: InputContactBlock[];
  data: InputContactBlock[];
  defaultValue?: InputContactBlock[];
  isShowCcFromLabel?: boolean;
  onClickCcFromLabel?: React.MouseEventHandler<HTMLSpanElement> | undefined;
  isReadOnly?: boolean;
  onChange?:
    | ((
        event: React.SyntheticEvent<Element, Event>,
        value: InputContactBlock[],
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<InputContactBlock> | undefined,
      ) => void)
    | undefined;
  isActiveCcFrom?: boolean;
}

const AutoCompleteReceive: React.FC<Props> = ({
  value,
  data,
  defaultValue,
  isShowCcFromLabel = true,
  onClickCcFromLabel,
  isReadOnly = false,
  onChange = (e) => {},
  isActiveCcFrom = false,
}) => {
  const [tempNewUserInfo, setTempNewUserInfo] = useState<InputContactBlock[]>([]);

  const handleChangeInput = (e) => {
    const value = (e.target as HTMLInputElement).value.toLowerCase();

    const matchEmailRegex = value.match(emailRegex);

    if (matchEmailRegex) {
      // if input value is email type
      setTempNewUserInfo([
        {
          contact_name: value,
          employeesList: [new UserInfo('', value, value)],
        },
      ]);
    } else {
      // if input value not email type
      if (!isEmpty(tempNewUserInfo)) setTempNewUserInfo([]);
    }
  };

  console.log(tempNewUserInfo);

  const handleDeleteReceiver = (cb, index) => {
    return (e) => {
      if (!isReadOnly) {
        cb(index);
        setTempNewUserInfo([]);
      }
    };
  };

  return (
    <Autocomplete
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
      renderOption={(props, option) => {
        if (option.contact_name.match(emailRegex))
          return (
            <MenuItem {...props} className="block">
              <Receiver data={option.employeesList[0]} haveCloseIcon={false} />
            </MenuItem>
          );

        return (
          <MenuItem {...props} className="block">
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
          </MenuItem>
        );
      }}
      renderInput={(params) => {
        if (isReadOnly) params.InputProps.endAdornment = undefined;

        return (
          <Box className="flex justify-between items-center">
            <TextField
              {...params}
              className="outline-none border-transparent"
              onChange={handleChangeInput}
            />
            {isShowCcFromLabel && (
              <span
                className={`text-[#7E7E7E] text-[14px] border rounded-md p-2 py-1 cursor-pointer ${
                  isActiveCcFrom && 'font-bold border-2'
                }`}
                onClick={onClickCcFromLabel}>
                Cc,Bcc
              </span>
            )}
          </Box>
        );
      }}
      renderTags={(list, getTagProps) => {
        return list.map((receiver, index) => {
          const props = getTagProps({ index: index });

          if (receiver.contact_name.match(emailRegex))
            return (
              <Receiver
                key={index}
                data={receiver.employeesList[0]}
                haveCloseIcon={!isReadOnly}
                onDelete={handleDeleteReceiver(props.onDelete, index)}
              />
            );

          return (
            <ContactReceive
              contactName={receiver.contact_name}
              haveCloseIcon={!isReadOnly}
              onDelete={handleDeleteReceiver(props.onDelete, index)}
            />
          );
        });
      }}
    />
  );
};

export default AutoCompleteReceive;
