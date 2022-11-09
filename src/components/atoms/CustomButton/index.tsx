import { ButtonBase, Typography } from '@mui/material';
import React from 'react';
import { TSVGIcon } from '../Icon';

type Props = {
  label: string;
  bgButtonColor: string;
  textColor: string;
  textSize?: number;
  width?: number;
  height?: number;
  isAfterIcon?: boolean;
  afterIcon?: React.ReactNode;
  isBeforeIcon?: boolean;
  beforeIcon?: React.ReactNode;
  isHasSlash?: boolean;
};

const CustomButton = (props: Props) => {
  return (
    <ButtonBase
      sx={{
        width: `${props.width}px`,
        height: `${props.height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: `${props.bgButtonColor}`,
        borderRadius: '6px',
        color: `${props.textColor}`,
        padding: '6px 10px',
      }}>
      {props.isBeforeIcon && props.beforeIcon}
      <Typography
        component={'p'}
        sx={{
          borderRight: `${props.isHasSlash ? '1px solid #fff' : 'none'}`,
          fontSize: `${props.textSize ? props.textSize : 12}px`,
          lineHeight: `${props.textSize ? props.textSize : 12}px`,
          paddingRight: '10px',
        }}>
        {props.label}
      </Typography>
      {props.isAfterIcon && props.afterIcon}
    </ButtonBase>
  );
};

export default CustomButton;
