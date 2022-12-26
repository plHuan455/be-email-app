import ContactReceive from '@components/atoms/ContactReceive';
import Icon from '@components/atoms/Icon';
import { InputContactBlock } from '@components/molecules/AutoCompleteReceive';
import {
  Autocomplete,
  AutocompleteRenderOptionState,
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { UserReceiveInfo } from '../Email/Interface';
import ClearIcon from '@mui/icons-material/Clear';

interface EmailComposeModalProps {
  inputContactBlock: InputContactBlock;
  onAdd?: React.MouseEventHandler<HTMLElement>;
  onChange?: (value: InputContactBlock) => void;
  forField?: 'to' | 'cc' | 'bcc';
}

const EmailComposeModal: React.FC<EmailComposeModalProps> = ({
  inputContactBlock,
  onAdd,
  onChange,
  forField,
}) => {
  const options = inputContactBlock.employeesList.filter(
    (employ) => !employ.field && !employ.isChecked,
  );

  const handleClick = (userReceiveInfo: UserReceiveInfo) => () => {
    userReceiveInfo.isChecked = !userReceiveInfo.isChecked;
    userReceiveInfo.field = userReceiveInfo.field ? undefined : forField;
    onChange && onChange(inputContactBlock);
  };

  const handleDelete =
    (userReceiveInfo: UserReceiveInfo) => (e: React.MouseEvent<Element, MouseEvent>) => {
      userReceiveInfo.isChecked = false;
      userReceiveInfo.field = undefined;
      onChange && onChange(inputContactBlock);
    };

  return (
    <Box
      sx={{
        width: '600px',
      }}>
      <Typography sx={{ fontWeight: 700, mb: 2 }}>
        {inputContactBlock.contact_name}
      </Typography>
      <Autocomplete
        sx={{ mb: 2 }}
        disableCloseOnSelect
        multiple
        value={inputContactBlock.employeesList.filter(
          (eml) => eml.isChecked && forField === eml.field,
        )}
        size="small"
        getOptionLabel={(option) => option.name}
        options={options}
        clearIcon={<ClearIcon fontSize="small" />}
        renderInput={(params) => {
          return (
            <Box className="flex justify-between items-center">
              <TextField
                {...params}
                className="outline-none border-transparent"
                // onChange={handleChangeInput}
              />
            </Box>
          );
        }}
        renderOption={(props, option, state) => {
          return (
            <MenuItem
              {...props}
              selected={option.isChecked}
              onClick={handleClick(option)}
              className="block">
              <p className="flex gap-2 font-medium items-center">
                <Icon
                  width={20}
                  height={20}
                  rawColor="#7061e2"
                  icon="department"
                  className="bg-slate-400/60 rounded-full p-1"
                />
                {option.name}
              </p>
            </MenuItem>
          );
        }}
        renderTags={(list, getTagProps) => {
          return list.map((receiver, index) => {
            const props = getTagProps({ index: index });

            return (
              <ContactReceive
                contactName={receiver.name}
                haveCloseIcon
                onDelete={handleDelete(receiver)}
              />
            );
          });
        }}
      />
      {/* <Button onClick={onAdd}>Add</Button> */}
    </Box>
  );
};

const RenderOption: React.FC<{
  props: React.HTMLAttributes<HTMLLIElement>;
  option: UserReceiveInfo;
  state: AutocompleteRenderOptionState;
}> = ({ props, option, state }) => {
  return null;
};

export default EmailComposeModal;
