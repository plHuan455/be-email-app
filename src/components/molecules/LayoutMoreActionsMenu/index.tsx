import React, { useMemo, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';

// ICON
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

type LayoutMoreActionType = {
  [key in KeyLayoutMoreAction]: LayoutMoreActionIconType;
};

export interface LayoutMoreActionInputType {
  type: KeyLayoutMoreAction;
  onClick: () => void;
}

interface LayoutMoreActionIconType {
  icon: React.ReactNode;
  value: string;
}

export type KeyLayoutMoreAction = 'info' | 'edit' | 'delete';

const LAYOUT_MORE_ACTION_DEFAULT: LayoutMoreActionType = {
  info: {
    icon: <InfoIcon />,
    value: 'Info',
  },
  edit: {
    icon: <EditIcon />,
    value: 'Edit',
  },
  delete: {
    icon: <DeleteIcon />,
    value: 'Delete',
  },
};

interface LayoutMoreActionMenuProps {
  moreActionsList: LayoutMoreActionInputType[];
}

const LayoutMoreActionMenu: React.FC<LayoutMoreActionMenuProps> = ({
  moreActionsList,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const _renderMoreActionsList = useMemo(() => {
    return moreActionsList.map((action) => {
      const actionMain = LAYOUT_MORE_ACTION_DEFAULT[action.type];

      return (
        <MenuItem
          key={action.type}
          onClick={(e) => {
            action.onClick();
            handleClose(e);
          }}
          sx={{
            svg: {
              color: '#999999',
            },
          }}>
          {actionMain.icon}
          <span className="inline-block text-[#888888] font-semibold pl-3">
            {actionMain.value}
          </span>
        </MenuItem>
      );
    });
  }, [moreActionsList]);

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        {_renderMoreActionsList}
      </Menu>
    </div>
  );
};

export default LayoutMoreActionMenu;
