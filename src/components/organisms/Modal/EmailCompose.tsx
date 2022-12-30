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
  const focusVisibleReceiveRef = React.useRef<UserReceiveInfo>();
  const searchValueRef = React.useRef('');

  const value = inputContactBlock.employeesList.filter(
    (eml) => eml.isChecked && forField === eml.field,
  );

  const options = inputContactBlock.employeesList.filter(
    (employ) => !employ.field && !employ.isChecked,
  );

  const handleClick = (userReceiveInfo: UserReceiveInfo) => {
    userReceiveInfo.isChecked = !userReceiveInfo.isChecked;
    userReceiveInfo.field = userReceiveInfo.field ? undefined : forField;
    onChange && onChange(inputContactBlock);
  };

  const handleDelete =
    (userReceiveInfo: UserReceiveInfo) =>
    (e: React.MouseEvent<Element, MouseEvent>) => {
      userReceiveInfo.isChecked = false;
      userReceiveInfo.field = undefined;
      onChange && onChange(inputContactBlock);
    };

  const handleClear = () => {
    const employees = inputContactBlock.employeesList;
    employees.forEach((v) => {
      v.field = undefined;
      v.isChecked = false;
    });
    searchValueRef.current = '';
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
        value={value}
        size="small"
        getOptionLabel={(option) => option.name}
        options={options}
        filterOptions={(options) => {
          return options.filter((v) => {
            return v.mail.includes(searchValueRef.current);
          });
        }}
        clearIcon={<ClearIcon onClick={handleClear} fontSize="small" />}
        renderInput={(params) => {
          const {
            inputProps: { value: _value, ...inputProps },
            ...props
          } = params;
          return (
            <Box className="flex justify-between items-center">
              <TextField
                {...props}
                inputProps={{
                  ...inputProps,
                }}
                value={searchValueRef.current}
                className="outline-none border-transparent"
                onChange={(e) => {
                  searchValueRef.current = e.target.value;
                }}
                onKeyDown={(e) => {
                  const focusVisibleReceive = focusVisibleReceiveRef.current;
                  if (e.code === 'Enter' && focusVisibleReceive) {
                    // const newContact = { ...inputContactBlock }
                    focusVisibleReceive.field = forField;
                    focusVisibleReceive.isChecked = true;
                    onChange && onChange(inputContactBlock);
                    searchValueRef.current = '';
                    focusVisibleReceiveRef.current = undefined;
                    return;
                  }

                  if (
                    e.code === 'Backspace' &&
                    (e.target as any).value === '' &&
                    value.length > 0
                  ) {
                    const deletedEmploy = value[value.length - 1];
                    if (deletedEmploy) {
                      deletedEmploy.field = undefined;
                      deletedEmploy.isChecked = false;
                    }
                    onChange && onChange(inputContactBlock);
                    focusVisibleReceiveRef.current = undefined;
                    return;
                  }
                }}
              />
            </Box>
          );
        }}
        renderOption={(props, option, state) => {
          return (
            <RenderOption
              props={props}
              option={option}
              state={state}
              onClick={handleClick}
              onFocusVisibleChange={(v) => {
                focusVisibleReceiveRef.current = v;
              }}
            />
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

const config = { attributes: true, childList: true, subtree: true };

const RenderOption: React.FC<{
  props: React.HTMLAttributes<HTMLLIElement>;
  option: UserReceiveInfo;
  state: AutocompleteRenderOptionState;
  onClick?: (userReceiveInfo: UserReceiveInfo) => void;
  onFocusVisibleChange?: (userReceiveInfo?: UserReceiveInfo) => void;
}> = ({ props, option, state, onClick, onFocusVisibleChange }) => {
  const menuItemRef = React.useRef<HTMLLIElement>(null);

  const callback: MutationCallback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type !== 'attributes') return;

      const ele = mutation.target as HTMLLIElement;
      if (
        ele.classList.contains('Mui-focused') &&
        ele.classList.contains('Mui-focusVisible')
      ) {
        onFocusVisibleChange && onFocusVisibleChange(option);
      } else {
        onFocusVisibleChange && onFocusVisibleChange(undefined);
      }
    }
  };

  React.useEffect(() => {
    const observer = new MutationObserver(callback);

    if (menuItemRef.current) {
      observer.observe(menuItemRef.current, config);
    }

    return () => {
      // Later, you can stop observing
      observer.disconnect();
    };
  }, [menuItemRef.current]);

  return (
    <MenuItem
      {...props}
      ref={menuItemRef}
      selected={option.isChecked}
      onClick={() => onClick && onClick(option)}
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
};

export default EmailComposeModal;
