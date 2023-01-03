import { Button, Menu, MenuItem, MenuProps, SxProps, Theme } from "@mui/material";
import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { rem } from "@utils/functions";
import styled from "styled-components";

import UpdateIcon from '@mui/icons-material/Update';
interface MenuOptionTypes {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}
interface TableActionsMenuProps {
  isAuto?: boolean; // if true, isOpen not working
  isOpen?: boolean;
  sx?: SxProps<Theme>;
  options: MenuOptionTypes[];
  onItemClick: (value: string | number, e: React.MouseEvent<HTMLElement>) => void;
  onClose?: () => void;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    padding: rem(4),
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  },
  ".MuiButtonBase-root": {
    fontSize: rem(14),
  },
  "svg": {
    color: '#4d4b4bb3',
    fontSize: rem(18),
    marginRight: rem(8),
  }
}));

const TableActionsMenu: React.FC<TableActionsMenuProps> = ({
  isAuto = true,
  isOpen = false,
  sx,
  options,
  onClick,
  onClose,
  onItemClick,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    onClick && onClick(event);
  };
  const handleClose = () => {
    setAnchorEl(null);
    onClose && onClose();
  };

  return (<div className="m-tableActionsMenu">
    <Button variant="text" onClick={handleClick} sx={sx}>
      <MoreVertIcon sx={{ color: '#313030b3'}} />
    </Button>
    <StyledMenu
      anchorEl={anchorEl}
      open={isAuto ? open : isOpen}
      onClose={handleClose}
    >
      {options.map(option => {
        const Icon = option.icon;
        return (
          <MenuItem
            key={`table-actions-menu-${option.value}`}
            onClick={(e) => {
              onItemClick(option.value, e)
              if(isAuto) handleClose();
            }}
            disableRipple
          >
            {option.icon}
            {option.label}
          </MenuItem>
        )
      })}
    </StyledMenu>
  </div>)
}

export default TableActionsMenu;