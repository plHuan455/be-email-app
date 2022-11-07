import { ButtonBase } from '@mui/material';
import React from 'react';

type Props = { isFullWidth: boolean; backgroundColor: String; onClick: () => void };

const ResetButton = (props: Props) => {
  return (
    <ButtonBase
      onClick={() => props.onClick()}
      sx={{
        width: `${props.isFullWidth ? '100%' : 'auto'}`,
        height: '37px',
        backgroundColor: `${props.backgroundColor}`,
        color: '#fff',
        fontSize: '16px',
        borderRadius: '20px',
        marginTop: '10px',
      }}>
      Reset
    </ButtonBase>
  );
};

export default ResetButton;
