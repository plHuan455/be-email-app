import { ReceiverData } from '@components/organisms/Email/Interface';
import { Autocomplete, Box, TextField } from '@mui/material';
import useEmailCompose from '../../../zustand/useEmailCompose';
import React, { MouseEventHandler, useEffect } from 'react';
import Receiver from '../../atoms/Receiver';

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
  const { clearReceivers, setNewReceivers } = useEmailCompose();

  useEffect(() => {
    if (!defaultValue) clearReceivers();
  }, []);

  const handleOnChangeAutocomplete: (e: any, newValue: ReceiverData[]) => void = (
    e,
    newValue,
  ) => {
    setNewReceivers(newValue);
  };

  return (
    <Autocomplete
      onChange={handleOnChangeAutocomplete}
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
              onDelete={() => props.onDelete(index)}
            />
          );
        });
      }}
    />
  );
};

export default AutoCompleteReceive;
