import IconButton from '@components/atoms/IconButton';
import {
  Button,
  colors,
  Menu,
  withStyles,
  PopoverOrigin,
  Typography,
  ButtonProps,
  Box,
  BoxProps,
} from '@mui/material';
import React, { PropsWithChildren } from 'react';

interface DropdownProps extends PropsWithChildren {
  label: React.ReactNode;
  alignMenu?: PopoverOrigin['horizontal'];
  ButtonProps?: ButtonProps;
  containerProps?: BoxProps;
  onClose?: () => void
  onClick?: () => void
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  alignMenu = 'left',
  ButtonProps,
  containerProps,
  onClose,
  onClick,

  children,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const ref = React.useRef(null);

  const handleClick = () => {
    setIsOpen(true);
    onClick && onClick()
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose()
  };

  React.useEffect(() => {
    if (ref) {
      setAnchorEl(ref.current);
    }

    return () => {
      setIsOpen(false);
      setAnchorEl(null)
    }
  }, [ref]);

  return (
    <Box {...containerProps}>
      <IconButton shape='square' ref={ref} onClick={handleClick} {...ButtonProps}>
        {label}
      </IconButton>
      <Menu
        elevation={1}
        // disableRestoreFocus={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: alignMenu,
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: alignMenu,
        }}
        anchorEl={anchorEl}
        keepMounted
        open={isOpen}
        onClose={handleClose}>
        {children}
      </Menu>
    </Box>
  );
};

export default Dropdown;
