import {
  iconButtonClasses,
  Button,
  ButtonProps,
  alpha,
  styled
} from '@mui/material';
import React from 'react';
import { makeStyles } from 'tss-react/mui';

const getSize = {
  "small": '5px',
  "medium": '8px',
  "large": '12px',
}

const IconButtonStyled = styled(Button)<IconButtonProps>((({theme, size, shape}) => ({
  borderRadius: shape === 'circle' ? '50%' : theme.spacing(1),
  minWidth: 'auto',
  padding: getSize[size || 'medium']
})))

interface IconButtonProps extends ButtonProps {
  shape?: 'square' | 'circle'
}

const IconButton: React.FC<IconButtonProps> = (props) => {

  return <IconButtonStyled {...props} />;
};

IconButton.defaultProps = {
  shape: 'circle',
}

export default IconButton;
