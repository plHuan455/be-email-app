import { UserInfo } from '@components/organisms/Email/Interface';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Box,
  TextField,
} from '@mui/material';
import useEmailCompose from '../../../zustand/useEmailCompose';
import React, { MouseEventHandler, useEffect } from 'react';
import Receiver from '../../atoms/Receiver';

import './styles.scss';

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
}

const AutoCompleteReceive: React.FC<Props> = ({
  data,
  defaultValue,
  isShowCcFromLabel = true,
  onClickCcFromLabel,
  isReadOnly = false,
  onChange = (e) => {},
}) => {
  const { clearReceivers, setNewReceivers } = useEmailCompose();

  return (
    <Autocomplete
      onChange={onChange}
      readOnly={isReadOnly}
      className="emailComposeTo"
      multiple
      id="tags-outlined"
      options={data}
      getOptionLabel={(option) => option.mail}
      defaultValue={defaultValue ? [...defaultValue] : []}
      filterSelectedOptions
      renderInput={(params) => {
        if (isReadOnly) params.InputProps.endAdornment = undefined;

        return (
          <Box className="flex justify-between items-center">
            <TextField {...params} className="outline-none border-transparent" />
            {isShowCcFromLabel && (
              <span
                className="text-[#7E7E7E] text-[14px] cursor-pointer"
                onClick={onClickCcFromLabel}>
                Cc,From
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
              // onDelete={() => !isReadOnly && props.onDelete(index)}
            />
          );
        });
      }}
    />
  );
};

export default AutoCompleteReceive;
