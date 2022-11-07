import { FormControlLabel, Switch } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

type Props = { isActive: boolean };

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      '& + .MuiSwitch-track': {
        backgroundColor: '#2ACE31',
      },
      '.MuiSwitch-thumb': {
        backgroundColor: '#fff',
      },
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    backgroundColor: '#EF2020',
    '&:before, &:after': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
      color: '#fff',
      fontSize: '20px',
      zIndex: 100000,
      backgroundColor: '#fff',
    },
    '&:before': {
      content: 'Add',
      left: 12,
    },
    '&:after': {
      content: 'Off',
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const CustomSwitcher = (props: Props) => {
  return <Android12Switch defaultChecked={props.isActive} />;
};

export default CustomSwitcher;
