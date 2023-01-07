import React from 'react';
import { UserReceiveInfo } from '@components/organisms/Email/Interface';
import { emailRegex } from '@constants/constants';
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteValue,
  Box,
  MenuItem,
  TextField,
} from '@mui/material';
import AutocompleteNested, {
  AutocompleteNestedValue,
  AutocompleteNestedSubMenu,
} from '../AutocompleteNested';
import SingleAvatar from '@components/atoms/SingleAvatar';
import Icon from '@components/atoms/Icon';
import { RenderButtonIcon } from '../../EmailActions';
import ContactReceive from '@components/atoms/ContactReceive';

export interface InputContactBlock
  extends AutocompleteNestedValue<UserReceiveInfo & AutocompleteNestedSubMenu> {
  contact_name: string;
}

interface AutoCompleteReceiveProps {
  className?: string;
  name: 'to' | 'cc' | 'bcc';
  value: InputContactBlock[];
  options: readonly InputContactBlock[];
  onChange?: (value: InputContactBlock[]) => void;
  onChangeOptions?: (option: InputContactBlock) => void;
}

const AutoCompleteReceive: React.FC<AutoCompleteReceiveProps> = ({
  className,
  name,
  value,
  options,
  onChange,
  onChangeOptions,
}) => {
  const [exOption, setExOption] = React.useState<InputContactBlock>();

  const isNotGroupMail = React.useCallback((str: string) => {
    return str.match(emailRegex);
  }, []);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: AutocompleteValue<InputContactBlock, true, false, false>,
    reason: AutocompleteChangeReason,
    details: AutocompleteChangeDetails<InputContactBlock> | undefined,
  ) => {
    onChange && onChange([...value]);
    if (exOption) {
      onChangeOptions && onChangeOptions(exOption);
      setExOption(undefined);
    }
  };

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = event.target.value.toLowerCase();

    if (isNotGroupMail(value)) {
      setExOption({
        id: Math.random().toString(),
        contact_name: value,
      });
    } else {
      setExOption(undefined);
    }
  };

  return (
    <AutocompleteNested
      className={`${className}`}
      name={name}
      options={exOption ? [...options, exOption] : options}
      value={value}
      onChange={handleChange}
      placeholder={''}
      renderInput={(params) => (
        <TextField {...params} onChange={handleChangeInput} placeholder={''} />
      )}
      renderSubInput={(params) => <TextField {...params} placeholder={''} />}
      getOptionLabel={(option) => option.contact_name}
      getSubOptionLabel={(option) => option.name}
      renderOption={(props, option, state) => {
        if (isNotGroupMail(option.contact_name)) {
          return (
            <MenuItem {...props}>
              <Box className="flex">
                {/* Main Content */}
                <Box className="flex relative items-center gap-2 rounded-xl w-full">
                  <SingleAvatar
                    src={''}
                    abbreviations={option.contact_name}
                    // abbreviations={''}
                    className="w-7 h-7"
                  />
                  <p className="flex-1 text-[14px] text-ellipsis overflow-hidden">
                    {option.contact_name}
                  </p>
                </Box>
              </Box>
            </MenuItem>
          );
        }
        return (
          <MenuItem {...props}>
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
      renderSubOption={(props, option, state) => {
        return (
          <MenuItem {...props}>
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
      renderTags={(list, getTagProps, state) => {
        return list.map((receiver, index) => {
          const props = getTagProps({ index });

          if (isNotGroupMail(receiver.contact_name)) {
            return (
              <Box className="flex">
                {/* Main Content */}
                <Box className="flex bg-[#F6F5FE] relative pl-7 p-2 py-1 rounded-xl mx-1 w-full">
                  <SingleAvatar
                    src={''}
                    abbreviations={receiver.contact_name}
                    // abbreviations={''}
                    className="w-6 h-6 absolute inset-y-2/4 left-0 -translate-y-1/2 -translate-x-[110%]"
                  />
                  <p className="flex-1 text-[14px] text-ellipsis overflow-hidden">
                    {receiver.contact_name}
                  </p>
                  <RenderButtonIcon
                    item={'close'}
                    onClick={props.onDelete}
                    className="hover:cursor-pointer"
                  />
                </Box>
              </Box>
            );
          }

          const totalContact = receiver.subMenu?.length;
          const countSelected =
            receiver?.subMenu?.filter?.(
              (sub) => sub.isSelected && sub.field === name,
            )?.length || 0;

          return (
            <ContactReceive
              contactName={receiver.contact_name}
              haveCloseIcon={true}
              onDelete={props.onDelete}
              endAnchor={
                totalContact ? `${countSelected}/${totalContact}` : undefined
              }
            />
          );
        });
      }}
      renderSubTags={(list, getTagProps, state) => {
        return list.map((receiver, index) => {
          const props = getTagProps({ index });

          return (
            <ContactReceive
              contactName={receiver.mail}
              haveCloseIcon={true}
              onDelete={props.onDelete}
              // endAnchor={`${countChecked}/${receiver.employeesList.length}`}
            />
          );
        });
      }}
    />
  );
};

export default AutoCompleteReceive;
