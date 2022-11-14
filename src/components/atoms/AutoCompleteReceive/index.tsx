import { Autocomplete, Box, TextField } from '@mui/material';
import React from 'react';
import { UserInfo } from '../OptionalAvatar';
import Receiver from '../Receiver';

import './styles.scss';

export interface ReceiverData {
  avatar: string;
  mail: string;
  abbreviations: string;
}

interface Props {
  data: ReceiverData[];
}

const AutoCompleteReceive: React.FC<Props> = ({ data }) => {
  return (
    <Autocomplete
      className="emailComposeTo"
      multiple
      id="tags-outlined"
      options={data}
      getOptionLabel={(option) => option.mail}
      defaultValue={[...data]}
      filterSelectedOptions
      renderInput={(params) => {
        return (
          <Box className="flex justify-between items-center">
            <TextField {...params} className="outline-none border-transparent" />
            {/* <span>Cc,From</span> */}
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
