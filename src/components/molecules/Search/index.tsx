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
  '&:hover': {
    '& .searchInputBase': {
      backgroundColor: '#7061e2',
    },
    '& .searchIcon': {
      color: 'white',
    },
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
  transition: '0.4s',
  transform: 'translateY(1.5px)',
  svg: {
    color: '#999999',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    borderRadius: '8px',
    padding: theme.spacing(2, 2, 2, 2),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    transition: '0.4s',
    // backgroundColor: '#7061e2',
    '&:hover': {
      backgroundColor: '#7061e2',
    },
    '&:focus': {
      backgroundColor: '#7061e2',
      '& + .searchIconWrapper .searchIcon': {
        color: 'white',
      },
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
  const [isFocus, setIsFocus] = useState<boolean>(false);

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
      <SearchIconWrapper className="searchIconWrapper">
        <SearchIcon
          className="searchIcon"
          sx={{
            color: isFocus ? 'white !important' : '#999999',
          }}
        />
      </SearchIconWrapper>
      <StyledInputBase
        className="searchInputBase"
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChangeSearchValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </Search>
  );
};

export default SearchStartWithIcon;
