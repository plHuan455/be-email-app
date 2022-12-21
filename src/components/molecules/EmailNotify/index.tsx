import { Badge, Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useMemo } from 'react';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';

interface Props {
  navigateNotify: () => void;
}

const EmailNotify: React.FC<Props> = ({ navigateNotify }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { notificationList } = useSelector((state: RootState) => state.notify);

  // Handler FNC
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigateNotify();
  };
  const handleClose = () => {
    navigateNotify();
  };

  // Render FNC
  const _renderNotificationItem = useMemo(() => {
    if (notificationList.length === 0) return null;

    return notificationList.map((notify, index) => (
      <MenuItem onClick={handleClose} key={index}>
        {/* <b>{notify.title}</b>:  */}
        <span>{notify.body}</span>
      </MenuItem>
    ));
  }, [notificationList]);

  return (
    <Box>
      <Tooltip title={'Notify'} placement="right">
        <Badge badgeContent={notificationList.length} color="error">
          <IconButton onClick={handleClick}>
            <NotificationsActiveIcon
              sx={{
                color: '#999999',
              }}
            />
          </IconButton>
        </Badge>
      </Tooltip>
    </Box>
  );
};

export default EmailNotify;
