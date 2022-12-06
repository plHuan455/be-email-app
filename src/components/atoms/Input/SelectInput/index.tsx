import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import classNames from 'classnames';
import React from 'react';

export interface OptionTypes {
  value: string;
  label: string;
}

export interface SelectInputProps {
  id?: string;
  className?: string;
  value: string;
  name?: string;
  label?: string;
  options: OptionTypes[];
  onChange?: (value: string) => void;
}

function SelectInput ({ id, className, name, value, label, options, onChange} : SelectInputProps) {
  const handleChange = (e: SelectChangeEvent) => {
    if(onChange && e.target) {
      onChange(e.target.value);
    }
  }
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <Select
        size="small"
        labelId="demo-simple-select-label"
        id={id}
        className={classNames("py-1 mt-1", className)}
        name={name}
        value={value}
        fullWidth
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={`select-input-${name}-${option.value}}`} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select> 
    </>
  );
}

export default SelectInput;
