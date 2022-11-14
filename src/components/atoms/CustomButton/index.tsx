import { ButtonBase, Typography } from '@mui/material';
import React from 'react';
import { TSVGIcon } from '../Icon';

type Props = {
  label: string;
  bgButtonColor: string;
  textColor: string;
  padding?: string;
  textSize?: number;
  fontWeight?: number;
  width?: number;
  height?: number;
  isAfterIcon?: boolean;
  afterIcon?: React.ReactNode;
  isBeforeIcon?: boolean;
  beforeIcon?: React.ReactNode;
  isHasSlash?: boolean;
  onClick?: Function;
};

const CustomButton = (props: Props) => {
  return (
    <ButtonBase
      sx={{
        gap: '4px',
        width: `${props.width}px`,
        height: `${props.height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: `${props.bgButtonColor}`,
        borderRadius: '6px',
        color: `${props.textColor}`,
        padding: `${props.padding ? props.padding : '6px 10px'}`,
      }}>
      {props.isBeforeIcon && props.beforeIcon}
      <Typography
        component={'p'}
        sx={{
          flex: 1,
          textAlign: 'center',
          borderRight: `${props.isHasSlash ? '1px solid #fff' : 'none'}`,
          fontSize: `${props.textSize ? props.textSize : 12}px`,
          fontWeight: `${props.fontWeight ? props.fontWeight : 500}`,
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
