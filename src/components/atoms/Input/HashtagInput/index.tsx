import {
  Autocomplete,
  Box,
  Chip,
  FormLabel,
  InputBase,
  makeStyles,
  MenuItem,
  TextField,
} from '@mui/material';
import { rem } from '@utils/functions';
import { useMemo, useState } from 'react';

export interface HashtagOptionTypes {
  name: string;
  value: string;
}
interface HashTagInputProps {
  label?: string;
  value: HashtagOptionTypes[];
  optionList: HashtagOptionTypes[];
  placeholder?: string;
  optionRegex?: string | RegExp;
  onChange: (value: HashtagOptionTypes[]) => void;
}

const HashtagInput: React.FC<HashTagInputProps> = ({
  label,
  value,
  placeholder,
  optionList = [],
  optionRegex,
  onChange,
}) => {
  const [tempOption, setTempOption] = useState<HashtagOptionTypes>();

  // const options = useMemo(() => {
  //   if(tempOption) return [tempOption, ...optionList]
  //   return optionList;
  // }, [optionList, tempOption])

  const handleInput = (e) => {
    if (!optionRegex) return;
    const inputValue = e.target.value;
    const isMatchHashtagType = inputValue.match(optionRegex);
    const isExist = optionList.some((option) => option.value === inputValue);

    if (isMatchHashtagType && !isExist) {
      setTempOption({
        name: `#${inputValue}`,
        value: inputValue,
      });
    } else setTempOption(undefined);
  };
  return (
    <Box className="a-hashtagInput" display="flex" alignItems="center">
      {label !== undefined && <FormLabel>{label}</FormLabel>}
      <Autocomplete
        multiple
        value={value}
        options={tempOption ? [tempOption, ...optionList] : optionList}
        getOptionLabel={(option) => option.name}
        autoHighlight
        defaultValue={[]}
        filterSelectedOptions
        onChange={(_, data) => onChange(data)}
        sx={{
          ml: label !== undefined ? rem(12) : 0,
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
          '.MuiOutlinedInput-root: hover .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #1f1f1f5d',
          },
          '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #1f1f1f5d',
          },
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index: number) => (
            <Chip
              variant="outlined"
              label={option.name}
              {...getTagProps({ index })}
              sx={{
                color: '#7061e2',
                fontWeight: 600,
                borderColor: '#7061e2',
              }}
            />
          ))
        }
        renderOption={(props, option) => {
          return (
            <MenuItem {...props} className="block">
              <p className="flex gap-2 font-medium items-center">{option.name}</p>
            </MenuItem>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              padding: rem(4),
              borderRadius: rem(2),
              '.MuiInputBase-root, .MuiInputBase-root:hover': {
                backgroundColor: 'transparent',
                py: rem(4),
              },
              '.Mui-focused': {
                backgroundColor: 'transparent',
              },
            }}
            onInput={handleInput}
            className="a-hashtagInput_input"
            placeholder={placeholder}
          />
        )}
      />
    </Box>
  );
};

export default HashtagInput;
