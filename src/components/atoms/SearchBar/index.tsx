import { InputBase } from '@mui/material';
import React from 'react';

type Props = {
  placeholder?: string;
  input?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
};

const SearchBar = ({ placeholder, input, onChange, onFocus, disabled }: Props) => {
  return <InputBase placeholder={placeholder} onChange={onChange}/>;
};

export default SearchBar;
