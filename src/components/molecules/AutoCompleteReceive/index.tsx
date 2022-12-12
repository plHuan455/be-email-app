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

interface Props {
  data: UserInfo[];
  defaultValue?: UserInfo[];
  isShowCcFromLabel?: boolean;
  onClickCcFromLabel?: React.MouseEventHandler<HTMLSpanElement> | undefined;
  isReadOnly?: boolean;
  onChange?:
    | ((
        event: React.SyntheticEvent<Element, Event>,
        value: UserInfo[],
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<UserInfo> | undefined,
      ) => void)
    | undefined;
  isActiveCcFrom?: boolean;
}

const AutoCompleteReceive: React.FC<Props> = ({
  data,
  defaultValue,
  isShowCcFromLabel = true,
  onClickCcFromLabel,
  isReadOnly = false,
  onChange = (e) => {},
  isActiveCcFrom = false,
}) => {
  const [tempNewUserInfo, setTempNewUserInfo] = useState<UserInfo[]>([]);

  const handleChangeInput = (e) => {
    const value = (e.target as HTMLInputElement).value.toLowerCase();

    const matchEmailRegex = value.match(emailRegex);

    if (matchEmailRegex) {
      // if input value is email type
      setTempNewUserInfo([new UserInfo('', value, value)]);
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
  return (
    <Autocomplete
      value={data}
      onChange={onChange}
      readOnly={isReadOnly}
      className="emailComposeTo"
      multiple
      id="tags-outlined"
      options={[...data, ...tempNewUserInfo]}
      getOptionLabel={(option) => option.mail}
      defaultValue={defaultValue ? [...defaultValue] : []}
      filterSelectedOptions
      autoHighlight
      renderOption={(props, option) => {
        return (
          <MenuItem {...props} className="inline-block bg-red-900">
            <Receiver data={option} haveCloseIcon={false} />
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

          return (
            <Receiver
              key={index}
              data={receiver}
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
