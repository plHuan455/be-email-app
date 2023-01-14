import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useDispatch } from 'react-redux';
import { setSearchActionValue } from '@redux/Global/reducer';

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row-reverse',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 2),
  height: '100%',
  position: 'absolute',
  zIndex: 2,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    borderRadius: '8px',
    padding: theme.spacing(2, 2, 2, 2),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    // backgroundColor: '#7061e2',
    '&:hover': {
      backgroundColor: '#7061e2',
    },
    color: '#ffffff',
    [theme.breakpoints.up('sm')]: {
      '&::placeholder': {
        opacity: 0,
      },
      width: '0',
      '&:focus': {
        '&::placeholder': {
          opacity: 1,
        },
        width: '28ch',
      },
    },
  },
}));

interface SearchStartWithIconProps {
  onSearch: () => void;
}

const SearchStartWithIcon: React.FC<SearchStartWithIconProps> = ({ onSearch }) => {
  const timeToSearch = 1000;
  let searchInterval;

  const dispatch = useDispatch();

  const handleChangeSearchValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const targetEl = e.target;
    clearTimeout(searchInterval);

    searchInterval = setTimeout(() => {
      dispatch(setSearchActionValue(targetEl.value));
      onSearch();
    }, timeToSearch);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon sx={{ color: '#ffffff' }} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChangeSearchValue}
      />
    </Search>
  );
};

export default SearchStartWithIcon;
