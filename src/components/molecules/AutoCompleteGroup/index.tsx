import { Autocomplete, Avatar, Box, Chip, MenuItem, TextField, Typography } from "@mui/material";
import { rem } from "@utils/functions";
import React, { useMemo, useState } from "react";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SingleAvatar from "@components/atoms/SingleAvatar";
export interface AutoCompleteGroupValueTypes {
  id?: number; // has id when it is group (isGroup = true)
  isGroup: boolean;
  name: string;
  avatar?: string;
  data: (string)[];
}

interface AutoCompleteGroupProps {
  value: AutoCompleteGroupValueTypes[];
  options: AutoCompleteGroupValueTypes[];
  autoAddOptionMatchRegex?: RegExp;
  onGroupClick?: (e: React.MouseEvent, option: AutoCompleteGroupValueTypes) => void;
  onChange: (value: AutoCompleteGroupValueTypes[]) => void;
  onChipClick?: (option: AutoCompleteGroupValueTypes) => void;
  onChipDelete?: (option: AutoCompleteGroupValueTypes) => void;
}

interface OptionItemProps {
  children: React.ReactNode;
}

const OptionItem: React.FC<OptionItemProps> = ({ children }) => {
  const [isShowInput, setIsShowInput] = useState<boolean>(false);

  return (
    <Box className="m-autoCompleteGroup-optionItem" sx={{ position: 'relative' }}>
      <Typography onClick={() => setIsShowInput(preState => !preState)}>
        {children}
      </Typography>
      {isShowInput && <Box sx={{ position: 'absolute', top: '100%' }}>adskjlfh dafjkldhs fjkasdhf dkhsafsdafadsjfh</Box>}
    </Box>
  )
}

const AutoCompleteGroup: React.FC<AutoCompleteGroupProps> = ({
  value,
  options,
  autoAddOptionMatchRegex,
  onGroupClick,
  onChange,
  onChipClick,
  onChipDelete,
}) => {
  const [autoOption, setAutoOption] = useState<AutoCompleteGroupValueTypes>();

  const convertedValueHash = useMemo(() => {
    let hash: { [key: number | string]: true } = {};
    value.forEach(option => {
      if (option.id === undefined) {
        hash[option.name] = true;
        return;
      }
      hash[option.id] = true;
    })
    return hash;
  }, [value])

  const handleInputChange = (e) => {
    if (!autoAddOptionMatchRegex) return;
    const inputValue: string = e.target.value;
    if (inputValue.match(autoAddOptionMatchRegex)) {
      setAutoOption({
        isGroup: false,
        data: [],
        name: inputValue
      })
    } else {
      setAutoOption(undefined);
    }
  }

  return (
    <Box className="m-autoCompleteGroup">
      <Autocomplete
        multiple
        value={value}
        options={autoOption ? [autoOption, ...options] : options}
        getOptionLabel={(option) => option.name}
        autoHighlight
        defaultValue={[]}
        filterSelectedOptions
        isOptionEqualToValue={(option) => {
          if (option.isGroup) return option.id === undefined ? false : convertedValueHash[option.id];
          return convertedValueHash[option.name]
        }}
        onChange={(_, data) => onChange(data)}
        sx={{
          // ml: label !== undefined ? rem(12) : 0,
          width: '100%',
          flexGrow: 1,
          '.Mui-focused': {
            backgroundColor: 'transparent',
          },
          '.MuiAutocomplete-option': {
            padding: rem(8),
          },
          '& fieldset': {
            border: '1px solid #1f1f1f5d',
          },
          '& .MuiOutlinedInput-root': {
            pl: 0
          },
          '.MuiOutlinedInput-root: hover .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #1f1f1f5d',
          },
          '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #1f1f1f5d',
          },
          '& .MuiFormControl-root': {
            p: 0
          },
          '& .MuiButtonBase-root .MuiChip-icon': {
            color: '#7061E2',
            pl: rem(4),
            fontSize: rem(18)
          }
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index: number) => {
            const props = getTagProps({ index });
            return(
            <Chip
              variant="outlined"
              icon={option.isGroup ? <HomeWorkIcon /> : undefined}
              label={`${option.name}${option.isGroup ? ` (${option.data.length})` : ''}`}
              {...props}
              onDelete={(e) => { 
                props.onDelete(e);
                onChipDelete &&  onChipDelete(option);
              }}
              sx={{
                color: '#7061e2',
                fontWeight: 600,
                borderColor: '#7061e2'
              }}
              onClick={() => { onChipClick && onChipClick(option) }}
            />
          )})
        }
        renderOption={(props, option) => {
          return (
            <MenuItem
              {...props}
              onClick={(e) => {
                if (option.isGroup) {
                  onGroupClick && onGroupClick(e, option);
                  return;
                }
                props.onClick && props.onClick(e);
              }}
              className="block"
            >
              {/* <OptionItem>{createOptionName(option)}</OptionItem> */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: rem(8) }}>
                  {Boolean(option.isGroup) ?
                    <HomeWorkIcon sx={{ color: '#7d71d2', pl: rem(2), fontSize: rem(28) }} />
                    : (
                      <SingleAvatar
                        src={''}
                        abbreviations={option.name}
                        // abbreviations={''}
                        className="w-7 h-7"
                      />
                    )
                  }
                </Box>
                <Typography>{option.name}</Typography>
              </Box>
            </MenuItem>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            sx={{
              px: rem(4),
              py: 0,
              '.MuiInputBase-root, .MuiInputBase-root:hover': {
                backgroundColor: 'transparent',
                py: 0,
              },
              '.Mui-focused': {
                backgroundColor: 'transparent',
              },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 0
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 0
                },
                '.MuiOutlinedInput-notchedOutline': {
                  border: 0,
                }
              },
            }}
            onInput={handleInputChange}
            className="a-hashtagInput_input"
          // placeholder={placeholder}
          />
        )}
      />
    </Box>
  )
}

export default AutoCompleteGroup;