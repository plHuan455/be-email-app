import {
  Autocomplete,
  AutocompleteRenderGetTagProps,
  Avatar,
  Box,
  Chip,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { rem } from '@utils/functions';
import React, { useMemo, useRef, useState } from 'react';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SingleAvatar from '@components/atoms/SingleAvatar';
export interface AutoCompleteGroupValueTypes {
  id?: number; // has id when it is group (isGroup = true)
  isGroup: boolean;
  name: string;
  avatar?: string;
  data: string[];
  selectedDataLabelAfter?: string;
}

interface AutoCompleteGroupProps {
  isOpenOption?: boolean;
  value: AutoCompleteGroupValueTypes[];
  options: AutoCompleteGroupValueTypes[];
  autoAddOptionMatchRegex?: RegExp;
  isDisable?: boolean;
  placeholder?: string;
  onGroupClick?: (option: AutoCompleteGroupValueTypes, e?: React.MouseEvent, ) => void;
  onChange: (value: AutoCompleteGroupValueTypes[]) => void;
  onChipClick?: (option: AutoCompleteGroupValueTypes) => void;
  onChipDelete?: (option: AutoCompleteGroupValueTypes) => void;
  onClose?: () => void;
  onOpen?: () => void;
}

interface AutoCompleteGroupTagsProps {
  values: AutoCompleteGroupValueTypes[];
  getTagProps: AutocompleteRenderGetTagProps;
  onChipClick?: (option: AutoCompleteGroupValueTypes) => void;
  onChipDelete?: (option: AutoCompleteGroupValueTypes) => void;
}

const AutoCompleteGroupTags: React.FC<AutoCompleteGroupTagsProps> = ({
  values,
  getTagProps,
  onChipClick,
  onChipDelete,
}) => {
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const cloneValue = [...values];

  return (
    <>
      {cloneValue.splice(0, 2).map((option, index: number) => {
        const props = getTagProps({ index });
        return (
          <Chip
            variant="outlined"
            icon={option.isGroup ? <HomeWorkIcon /> : undefined}
            label={`${option.name}${option.selectedDataLabelAfter ?? ''}`}
            {...props}
            onDelete={(e) => {
              props.onDelete(e);
              onChipDelete && onChipDelete(option);
            }}
            sx={{
              color: '#7061e2',
              fontWeight: 600,
              borderColor: '#7061e2',
            }}
            onClick={() => {
              onChipClick && onChipClick(option);
            }}
          />
        );
      })}
      {cloneValue.length > 0 && !isShowMore && (
        <Chip
          variant="outlined"
          label={`${cloneValue.length} more receivers`}
          sx={{
            color: '#7061e2',
            fontWeight: 600,
            borderColor: '#7061e2',
            cursor: 'pointer',
          }}
          onClick={() => setIsShowMore(true)}
        />
      )}
      {cloneValue.length > 0 && isShowMore && (
        <>
          {cloneValue.map((option, index) => {
            const props = getTagProps({ index });
            return (
              <Chip
                variant="outlined"
                icon={option.isGroup ? <HomeWorkIcon /> : undefined}
                label={`${option.name}${option.selectedDataLabelAfter ?? ''}`}
                {...props}
                onDelete={(e) => {
                  props.onDelete(e);
                  onChipDelete && onChipDelete(option);
                }}
                sx={{
                  color: '#7061e2',
                  fontWeight: 600,
                  borderColor: '#7061e2',
                }}
                onClick={() => {
                  onChipClick && onChipClick(option);
                }}
              />
            );
          })}
          <Chip
            variant="outlined"
            label={`Hidden`}
            sx={{
              color: '#7061e2',
              fontWeight: 600,
              borderColor: '#7061e2',
              cursor: 'pointer',
            }}
            onClick={() => setIsShowMore(false)}
          />
        </>
      )}
    </>
  );
};

const AutoCompleteGroup: React.FC<AutoCompleteGroupProps> = ({
  value,
  placeholder,
  isOpenOption,
  options,
  autoAddOptionMatchRegex,
  isDisable = false,
  onGroupClick,
  onChange,
  onChipClick,
  onChipDelete,
  onClose,
  onOpen
}) => {
  const [autoOption, setAutoOption] = useState<AutoCompleteGroupValueTypes>();

  const convertedValueHash = useMemo(() => {
    let hash: { [key: number | string]: true } = {};
    value.forEach((option) => {
      if (option.id === undefined) {
        hash[option.name] = true;
        return;
      }
      hash[option.id] = true;
    });
    return hash;
  }, [value]);

  const handleInputChange = (e) => {
    if (!autoAddOptionMatchRegex) return;
    const inputValue: string = e.target.value;
    if (inputValue.match(autoAddOptionMatchRegex)) {
      setAutoOption({
        isGroup: false,
        data: [],
        name: inputValue,
      });
    } else {
      setAutoOption(undefined);
    }
  };

  return (
    <Box className="m-autoCompleteGroup">
      <Autocomplete
        open={isOpenOption}
        onClose={onClose}
        onOpen={onOpen}
        disabled={isDisable}
        multiple
        value={value}
        options={autoOption ? [autoOption, ...options] : options}
        getOptionLabel={(option) => option.name}
        autoHighlight
        defaultValue={[]}
        filterSelectedOptions
        isOptionEqualToValue={(option) => {
          if (option.isGroup)
            return option.id === undefined ? false : convertedValueHash[option.id];
          return convertedValueHash[option.name];
        }}
        onChange={(e, data) => {
          const willChangeValue = data[data.length -1];
          if(willChangeValue?.isGroup && data.length > value.length) {
            onGroupClick && onGroupClick(willChangeValue)
          } else {
            onChange(data);
          }
        }}
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
            pl: 0,
          },
          '.MuiOutlinedInput-root: hover .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #1f1f1f5d',
          },
          '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #1f1f1f5d',
          },
          '& .MuiFormControl-root': {
            p: 0,
          },
          '& .MuiButtonBase-root .MuiChip-icon': {
            color: '#7061E2',
            pl: rem(4),
            fontSize: rem(18),
          },
        }}
        renderTags={(value, getTagProps) => (
          <AutoCompleteGroupTags
            values={value}
            getTagProps={getTagProps}
            onChipClick={onChipClick}
            onChipDelete={onChipDelete}
          />
        )}
        renderOption={(props, option) => {
          return (
            <MenuItem
              {...props}
              sx={{
                '&.Mui-focused': {
                  backgroundColor: 'rgba(0, 0, 0, 0.12)'
                }
              }}
              key={props.id}
              onClick={(e) => {
                if (option.isGroup) {
                  onGroupClick && onGroupClick(option, e);
                  // inputRef.current && inputRef.current.focus()
                  return;
                }
                props.onClick && props.onClick(e);
              }}
              className="block">
              {/* <OptionItem>{createOptionName(option)}</OptionItem> */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: rem(8) }}>
                  {Boolean(option.isGroup) ? (
                    <HomeWorkIcon
                      sx={{ color: '#7d71d2', pl: rem(2), fontSize: rem(28) }}
                    />
                  ) : (
                    <SingleAvatar
                      src={''}
                      abbreviations={option.name}
                      // abbreviations={''}
                      className="w-7 h-7"
                    />
                  )}
                </Box>
                <Typography>{option.name}{`${option.isGroup ? ` (${option.data.length})`: ''}`}</Typography>
              </Box>
            </MenuItem>
          );
        }}
        renderInput={(params) => {
          return (
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
                  border: 0,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 0,
                },
                '.MuiOutlinedInput-notchedOutline': {
                  border: 0,
                },
              },
            }}
            onInput={handleInputChange}
            className="a-hashtagInput_input"
            placeholder={placeholder}
          />
        )}}
      />
    </Box>
  );
};

export default AutoCompleteGroup;
