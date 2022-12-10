import { Badge, Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import React from 'react';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const EmailNotify = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title={'Notify'} placement="right">
        <Badge badgeContent={1} color="error">
          <IconButton onClick={handleClick}>
            <NotificationsActiveIcon
              sx={{
                color: '#999999',
              }}
            />
          </IconButton>
        </Badge>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          '& .MuiPaper-root': {
            border: '1px solid #e5e7eb',
            paddingInline: 0,
          },
        }}>
        <MenuItem onClick={handleClose}>
          Giang Đỗ vừa gửi cho bạn 1 tin nhắn
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Phượng Nguyễn vừa gửi cho bạn 1 tin nhắn
        </MenuItem>
        <MenuItem className="justify-center">
          <span
            className="inline-block text-center underline w-full text-[#554CFF] hover:opacity-70"
            onClick={handleClose}>
            Show More
          </span>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default EmailNotify;
