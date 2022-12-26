import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select as MUISelect,
  SelectProps as MUISelectProps,
} from '@mui/material';
import React, { Key } from 'react';

interface Mapping<T, V> {
  key?: (option: T) => Key;
  value: (option: T) => V;
  label: (option: T) => React.ReactNode;
}

interface Context<V> {
  key: Key;
  value: V;
  label: React.ReactNode;
}
interface Select<
  T extends unknown,
  V extends string | ReadonlyArray<string> | number | undefined,
> extends MUISelectProps<V> {
  options: T[];
  mapping: Mapping<T, V>;
  renderOption?: (option: T, ctx: Context<V>) => React.ReactNode;
  isLoading?: boolean;
  helperText?: string;
}

function Select<T, V extends string | ReadonlyArray<string> | number | undefined>({
  options,
  mapping,
  renderOption,
  isLoading,
  helperText,
  ...props
}: Select<T, V>) {
  if (isLoading) {
    return (
      <MUISelect {...props} defaultValue={'isLoading' as any} disabled>
        <MenuItem value={'isLoading'}>Loading...</MenuItem>
      </MUISelect>
    );
  }

  return (
    <FormControl>
      <MUISelect {...props}>
        {options && options.length > 0 ? (
          options.map((opt, index) =>
            renderOption ? (
              renderOption(opt, {
                key: (mapping['key'] && mapping['key'](opt)) || index.toString(),
                label: mapping['label'](opt) || index,
                value: mapping['value'](opt),
              })
            ) : (
              <MenuItem
                key={(mapping['key'] && mapping['key'](opt)) || index.toString()}
                value={mapping['value'](opt) || index}>
                {mapping['label'](opt) || index}
              </MenuItem>
            ),
          )
        ) : (
          <MenuItem disabled>No Option</MenuItem>
        )}
      </MUISelect>
      {helperText ? <FormHelperText error={props.error}>{helperText}</FormHelperText> : null} 
    </FormControl>
  );
}

export default Select;
