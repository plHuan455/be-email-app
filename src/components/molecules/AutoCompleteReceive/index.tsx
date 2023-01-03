import { UserInfo, UserReceiveInfo } from '@components/organisms/Email/Interface';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteRenderOptionState,
  Box,
  MenuItem,
  menuItemClasses,
  TextField,
} from '@mui/material';
import useEmailCompose from '../../../zustand/useEmailCompose';
import React, {
  MouseEventHandler,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';
import Receiver from '../../atoms/Receiver';

import './styles.scss';
import { emailRegex } from '@constants/constants';

import { isEmpty } from 'lodash';
import ContactReceive from '@components/atoms/ContactReceive';
import Icon from '@components/atoms/Icon';
import Dropdown from '../Dropdown';
import { EmailComposeModal } from '@components/organisms/Modal';
import SingleAvatar from '@components/atoms/SingleAvatar';

export interface InputContactBlock {
  id: string;
  contact_name: string;
  employeesList: UserReceiveInfo[];
}

interface Props {
  value: InputContactBlock[];
  data: InputContactBlock[];
  className?: string;
  defaultValue?: InputContactBlock[];
  isReadOnly?: boolean;
  onChange?:
    | ((
        event: React.SyntheticEvent<Element, Event>,
        value: InputContactBlock[],
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<InputContactBlock> | undefined,
      ) => void)
    | undefined;
  onChangeValue?: (value: InputContactBlock[]) => void;
  fullWidth?: boolean;
  forField?: 'to' | 'cc' | 'bcc';
}

const AutoCompleteReceive: React.FC<Props> = ({
  className,
  value,
  data,
  defaultValue,
  isReadOnly = false,
  onChange = (e) => {},
  onChangeValue,
  fullWidth,
  forField,
}) => {
  const id = useId();
  const [tempNewUserInfo, setTempNewUserInfo] = useState<InputContactBlock[]>([]);
  const [newUserInfo, setNewUserInfo] = useState<InputContactBlock>();
  const [isFocusInput, setIsFocusInput] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const focusVisibleContactRef = React.useRef<InputContactBlock>();

  const handleChangeInput = (e) => {
    const value = (e.target as HTMLInputElement).value.toLowerCase();

    const matchEmailRegex = value.match(emailRegex);

    if (matchEmailRegex) {
      // if input value is email type
      const newContactBlock = {
        id: id,
        contact_name: value,
        employeesList: [new UserReceiveInfo('', value, value, false)],
      };

      setNewUserInfo(newContactBlock);
      // setTempNewUserInfo([newContactBlock]);

      // const newValue = [...value]
      // newValue.push(newContactBlock)
      // onChangeValue && onChangeValue(newValue);
    } else {
      setNewUserInfo(undefined);
      setTempNewUserInfo([]);
    }
  };

  const handleDeleteReceiver = (cb, index, inputContactBlock: InputContactBlock) => {
    return (e) => {
      if (!isReadOnly) {
        cb(index);
        setTempNewUserInfo((cur) => {
          const findIndex = cur.findIndex(
            (v) => v.contact_name === inputContactBlock.contact_name,
          );

          if (findIndex !== -1) cur.splice(findIndex, 1);

          return cur;
        });
      }
    };
  };

  const handleDeleteContact = (
    inputContactBlocks: InputContactBlock[],
    index: number,
  ) => {
    const contactBlock = inputContactBlocks[index];
    if (contactBlock) {
      contactBlock.employeesList.forEach((employ) => {
        if (employ.field === forField) {
          employ.isChecked = false;
          employ.field = undefined;
        }
      });
      inputContactBlocks.splice(index, 1);
      onChangeValue && onChangeValue([...inputContactBlocks]);
    }
  };

  const options = useMemo(() => {
    if (newUserInfo) {
      return [...data, ...tempNewUserInfo, newUserInfo];
    }

    return [...data, ...tempNewUserInfo];
  }, [newUserInfo, data, tempNewUserInfo]);

  React.useEffect(() => {
    setNewUserInfo(undefined);
    setTempNewUserInfo([]);
  }, [value]);

  return (
    <Autocomplete
      fullWidth={fullWidth}
      disableCloseOnSelect
      open={isFocusInput}
      value={value}
      onChange={onChange}
      readOnly={isReadOnly}
      className={`${className} emailComposeTo`}
      multiple
      id="email-compose"
      options={options}
      getOptionLabel={(option) => option.contact_name}
      defaultValue={defaultValue ? defaultValue : []}
      // filterSelectedOptions
      autoHighlight
      renderOption={(props, option, state) => (
        <RenderOption
          forField={forField}
          props={props}
          option={option}
          options={data}
          state={state}
          value={value}
          onChangeValue={onChangeValue}
          onClick={() => {
            setIsFocusInput(true);
            setIsOpen(true);
          }}
          onClose={() => {
            setIsOpen(false);
          }}
          onFocusVisibleChange={(v) => {
            focusVisibleContactRef.current = v;
          }}
        />
      )}
      renderInput={(params) => {
        if (isReadOnly) params.InputProps.endAdornment = undefined;

        return (
          <Box className="flex justify-between items-center">
            <TextField
              {...params}
              className="outline-none border-transparent"
              onChange={handleChangeInput}
              focused={isFocusInput}
              onFocus={() => setIsFocusInput(true)}
              onBlur={() => {
                if (!isOpen) {
                  setIsFocusInput(false);
                }
              }}
              onKeyDown={(e) => {
                const focusVisibleContact = focusVisibleContactRef.current;
                if (e.code === 'Enter') {
                  e.preventDefault();
                  if (focusVisibleContact && focusVisibleContact.employeesList[0]) {
                    const employ = focusVisibleContact.employeesList[0];
                    employ.field = forField;
                    employ.isChecked = true;
                    value.push(focusVisibleContact);
                    onChangeValue && onChangeValue(value);
                    focusVisibleContactRef.current = undefined;
                    return;
                  }

                  if (newUserInfo && newUserInfo.employeesList[0]) {
                    const employ = newUserInfo.employeesList[0];
                    employ.field = forField;
                    employ.isChecked = true;
                    value.push(newUserInfo);
                    onChangeValue && onChangeValue(value);

                    setTempNewUserInfo((cur) => {
                      cur.push(newUserInfo);
                      return cur;
                    });
                    setNewUserInfo(undefined);
                  }

                  return;
                }

                if (
                  e.code === 'Backspace' &&
                  (e.target as any).value === '' &&
                  value.length > 0
                ) {
                  const deletedEmploy = value[value.length - 1];
                  if (deletedEmploy) {
                    deletedEmploy.employeesList.forEach((employ) => {
                      employ.field = undefined;
                      employ.isChecked = false;
                    });
                  }
                  value.pop();
                  onChangeValue && onChangeValue(value);
                  focusVisibleContactRef.current = undefined;
                  return;
                }
              }}
            />
          </Box>
        );
      }}
      renderTags={(list, getTagProps) => {
        return list.map((receiver, index) => {
          const props = getTagProps({ index: index });

          const countChecked = (receiver?.employeesList || []).filter((employ) => {
            return employ.isChecked && forField === employ.field;
          }).length;

          if (receiver.contact_name.match(emailRegex))
            return (
              <Receiver
                key={index}
                data={receiver.employeesList[0]}
                haveCloseIcon={!isReadOnly}
                onDelete={handleDeleteReceiver(
                  () => {
                    handleDeleteContact(list, index);
                  },
                  index,
                  receiver,
                )}
              />
            );

          return (
            <ContactReceive
              contactName={receiver.contact_name}
              haveCloseIcon={!isReadOnly}
              onDelete={handleDeleteReceiver(
                () => {
                  handleDeleteContact(list, index);
                },
                index,
                receiver,
              )}
              endAnchor={`${countChecked}/${receiver.employeesList.length}`}
            />
          );
        });
      }}
    />
  );
};

const config = { attributes: true, childList: true, subtree: true };

const RenderOption: React.FC<{
  openDropdown?: boolean;
  props: React.HTMLAttributes<HTMLLIElement>;
  options: InputContactBlock[];
  option: InputContactBlock;
  state: AutocompleteRenderOptionState;
  value: InputContactBlock[];
  forField?: 'to' | 'cc' | 'bcc';
  onClick?: () => void;
  onClose?: () => void;
  onChangeValue?: (value: InputContactBlock[]) => void;
  onFocusVisibleChange?: (inputContactBlock?: InputContactBlock) => void;
}> = ({
  openDropdown = false,
  props,
  options,
  option,
  state,
  value,
  forField,
  onChangeValue,
  onClick,
  onClose,
  onFocusVisibleChange,
}) => {
  const menuItemRef = React.useRef<HTMLLIElement>(null);

  const isSelected = option.employeesList.some(
    (employ) => employ.isChecked && employ.field === forField,
  );

  const handleClose = () => {
    onClose && onClose();
  };

  const handleChange = (inputContactBlock: InputContactBlock) => {
    try {
      const employeesList = inputContactBlock.employeesList;
      if (employeesList.length === 0) return;

      const countSelected = inputContactBlock.employeesList.filter(
        (eml) => eml.isChecked,
      ).length;
      const isSelect = value.findIndex((v) => v === inputContactBlock);

      // nếu ko có employ được chọn
      if (countSelected === 0) {
        // nếu employ có trong value thì xóa
        if (isSelect !== -1) {
          value.splice(isSelect, 1);
          onChangeValue && onChangeValue(value);
        }
        return;
      }

      // nếu có employ được chọn và contact chưa có trong value
      // thêm contact vào value
      if (countSelected > 0 && isSelect === -1) {
        value.push(inputContactBlock);
        onChangeValue && onChangeValue(value);

        return;
      }

      // nếu có employ được chọn và contact có trong value
      // cập nhật lại value
      if (countSelected > 0 && isSelect !== -1) {
        onChangeValue && onChangeValue(value);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  if (option.contact_name.match(emailRegex))
    return (
      <MenuItem
        {...props}
        ref={menuItemRef}
        onClick={() => {
          const isSelect = value.findIndex((v) => v === option);

          if (isSelect === -1) {
            value.push(option);
            option.employeesList[0].field = forField;
            option.employeesList[0].isChecked = true;
            onChangeValue && onChangeValue(value);
            return;
          }

          option.employeesList[0].field = undefined;
          option.employeesList[0].isChecked = false;
          value.splice(isSelect, 1);
          onChangeValue && onChangeValue(value);
        }}
        sx={{
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&.Mui-focusVisible': {
            backgroundColor: 'transparent',
          },
        }}
        disableRipple>
        <Box className="flex">
          {/* Main Content */}
          <Box className="flex relative items-center gap-2 rounded-xl w-full">
            <SingleAvatar
              src={option.employeesList[0].avatar}
              abbreviations={option.employeesList[0].getAbbreviations()}
              // abbreviations={''}
              className="w-7 h-7"
            />
            <p className="flex-1 text-[14px] text-ellipsis overflow-hidden">
              {option.employeesList[0].mail}
            </p>
          </Box>
        </Box>
        {/* <Receiver data={option.employeesList[0]} haveCloseIcon={false} /> */}
      </MenuItem>
    );

  return (
    <MenuItem
      {...props}
      // ref={menuItemRef}
      sx={{
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '&.Mui-focusVisible': {
          backgroundColor: 'transparent',
        },
      }}
      disableRipple>
      <Dropdown
        containerProps={{ sx: { width: '100%' } }}
        onClose={handleClose}
        onClick={onClick}
        ButtonProps={{
          disableRipple: true,
          fullWidth: true,
          variant: 'text',
          color: 'inherit',
          sx: {
            justifyContent: 'flex-start',
            backgroundColor: 'transparent',
            '&:hover, &:focus': {
              backgroundColor: 'transparent',
            },
            padding: 0,
          },
        }}
        label={
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
        }>
        <EmailComposeModal
          inputContactBlock={option}
          forField={forField}
          onChange={handleChange}
        />
      </Dropdown>
    </MenuItem>
  );
};

export default AutoCompleteReceive;
