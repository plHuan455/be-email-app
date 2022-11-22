import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

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
    padding: theme.spacing(2, 1, 2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    backgroundColor: '#282B33',
    '&:hover': {
      backgroundColor: '#282B33',
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

const SearchStartWithIcon = () => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon sx={{ color: '#ffffff' }} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};

export default SearchStartWithIcon;
