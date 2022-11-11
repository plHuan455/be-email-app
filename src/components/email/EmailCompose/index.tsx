import { SingleOTPInputComponent } from '@components/atoms/Input/PinInput/SingleInput';
import Receiver from '@components/atoms/Receiver';
import WindowComposeActions from '@components/atoms/WindowComposeActions';
import { Autocomplete, Box, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import EmailComposeFormGroup from '../hocs/EmailComposeFormGroup';

import avatarImg from '@assets/images/avatars/avatar-1.jpg';

import './styles.scss';

interface ReceiverData {
  avatar: string;
  mail: string;
  abbreviations: string;
}

const receiversList: ReceiverData[] = [
  { avatar: avatarImg, mail: 'giangz0009@gmail.com', abbreviations: 'GI' },
  { avatar: '', mail: 'mail1@gmail.com', abbreviations: 'T2' },
  { avatar: avatarImg, mail: 'mail2@gmail.com', abbreviations: 'T3' },
];

function EmailCompose() {
  return (
    <Box className="w-[654px] mx-auto shadow-xl rounded-3xl overflow-hidden">
      {/* Header */}
      <Box className="bg-white">
        {/* Window Compose Actions  */}
        <WindowComposeActions className="pt-3 pr-3" />
        <Box className="px-9 py-10">
          {/* Compose To */}
          <EmailComposeFormGroup label={'To:'}>
            <Autocomplete
              className="emailComposeTo"
              multiple
              id="tags-outlined"
              options={receiversList}
              getOptionLabel={(option) => option.mail}
              defaultValue={[]}
              filterSelectedOptions
              renderInput={(params) => {
                return (
                  <Box className="flex justify-between items-center">
                    <TextField
                      {...params}
                      className="outline-none border-transparent"
                    />
                    <span>Cc,From</span>
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
          </EmailComposeFormGroup>
          {/* Subject */}
          <EmailComposeFormGroup label={'Subject:'}>
            <SingleOTPInputComponent className="outline-none w-full text-black text-[18px] font-bold" />
          </EmailComposeFormGroup>
          {/* Format Bar */}
          <Box></Box>
          {/* Content */}
          <Box></Box>
          {/* Files List */}
          <Box></Box>
          {/* Greeting */}
          <Box></Box>
          {/* Logo */}
          <Box></Box>
        </Box>
      </Box>
      {/* Footer */}
      <Box className="p-6 bg-[#F1F1F6]">
        {/* manipulation */}
        <Box></Box>
        {/* Actions */}
        <Box></Box>
      </Box>
    </Box>
  );
}

export default EmailCompose;
