import { ReceiverData } from '@components/email/Interface';
import { Autocomplete, Box, TextField } from '@mui/material';
import React, { MouseEventHandler, useEffect } from 'react';
import Receiver from '../Receiver';

import './styles.scss';

interface Props {
  data: ReceiverData[];
  defaultValue?: ReceiverData[];
  isShowCcFromLabel?: boolean;
  onClickCcFromLabel?: React.MouseEventHandler<HTMLSpanElement> | undefined;
  isReadOnly?: boolean;
}

const AutoCompleteReceive: React.FC<Props> = ({
  data,
  defaultValue,
  isShowCcFromLabel = true,
  onClickCcFromLabel,
  isReadOnly = false,
}) => {
  return (
    <Autocomplete
      readOnly={isReadOnly}
      className="emailComposeTo"
      multiple
      id="tags-outlined"
      options={data}
      getOptionLabel={(option) => option.mail}
      defaultValue={defaultValue ? [...defaultValue] : []}
      filterSelectedOptions
      renderInput={(params) => {
        return (
          <Box className="flex justify-between items-center">
            <TextField {...params} className="outline-none border-transparent" />
            {isShowCcFromLabel && (
              <span
                className="text-[#7E7E7E] text-[14px]"
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
              onDelete={() => props.onDelete(index)}
            />
          );
        });
      }}
    />
  );
};

export default AutoCompleteReceive;
