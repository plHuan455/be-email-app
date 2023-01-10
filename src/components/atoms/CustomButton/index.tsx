import { ButtonBase, Typography } from '@mui/material';
import React from 'react';
import { TSVGIcon } from '../Icon';

type Props = {
  label: string;
  bgButtonColor: string;
  color: string;
  className?: string;
  classNameLabel?: string;
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
  isFullWidth?: boolean;
  type?: 'submit' | 'button';
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const CustomButton = ({ type = 'button', ...props }: Props) => {
  return (
    <ButtonBase
      type={type}
      className={props.className}
      sx={{
        gap: '4px',
        width: `${props.isFullWidth ? '100%' : props.width}px`,
        height: `${props.height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: `${props.bgButtonColor}`,
        borderRadius: '6px',
        color: `${props.color}`,
        padding: `${props.padding ? props.padding : '6px 10px'}`,
      }}
      onClick={props.onClick}>
      {props.isBeforeIcon && props.beforeIcon}
      {props.label && (
        <Typography
          component={'p'}
          className={props.classNameLabel}
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
      )}
      {props.isAfterIcon && props.afterIcon}
    </ButtonBase>
  );
};

export default CustomButton;
