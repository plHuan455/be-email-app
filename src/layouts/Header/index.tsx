import Icon from '@components/atoms/Icon';
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import LogoPNG from '@assets/images/logo.png';
import React from 'react';
import Dropdown from '@components/atoms/AvatarDropDown';
import { useAppSelector } from '@redux/configureStore';
import { useAuth } from '@context/AppContext';
import { toast } from 'react-toastify';
import { useTranslation } from '@@packages/localization';

const useStyles = makeStyles()((theme: Theme) => ({
  wrapperHeader: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    height: theme.spacing(20),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: theme.customShadows[2],
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  wrapperLogo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    backgroundColor: '#E2E2EA',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1),
  },
  wrapRight: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  wrapUserInfo: {
    display: 'flex',
    marginLeft: theme.spacing(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    marginLeft: theme.spacing(4),
  },
}));

interface HeaderProps {
  toggleIcon?: React.ReactNode;
  onToggleMobileSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleIcon, onToggleMobileSidebar }) => {
  const theme = useTheme();
  const { classes, cx } = useStyles();

  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const auth = useAuth();

  const menuConfig = [
    {
      id: 1,
      name: 'Logout',
      url: '/logout',
      cb: () =>
        auth.signout(() => {
          toast.success(
            t(
              'Tạm biệt, nhưng bạn sẽ luôn ở trong ký ức của tôi và tôi sẽ luôn trân trọng những kỷ niệm mà tôi đã tạo ra với bạn!',
            ),
          );
        }),
    },
  ];

  return (
    <Container maxWidth={false} className={cx(classes.wrapperHeader)}>
      {/* Logo */}
      <Box className={cx(classes.wrapperLogo)}>
        <Box className={cx(classes.logo)}>
          <img src={LogoPNG} width={32} height={32} alt="Logo" loading="lazy" />
        </Box>
        <Typography
          variant="h5"
          sx={{ marginLeft: theme.spacing(2), fontWeight: 700 }}>
          EM-VENTURES
        </Typography>
      </Box>

      {/* User */}
      <Box className={cx(classes.wrapRight)}>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}>
          <Icon icon="bell" />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}>
          <MenuItem onClick={handleClose}>Empty</MenuItem>
        </Menu>
        <Box className={cx(classes.wrapUserInfo)}>
          <Dropdown menu={menuConfig}></Dropdown>
        </Box>
      </Box>

      {/* Toggle Mobile Sidebar */}
      <IconButton
        sx={{
          display: 'none',
          [theme.breakpoints.down('md')]: {
            display: 'flex',
          },
        }}
        onClick={onToggleMobileSidebar}>
        {toggleIcon}
      </IconButton>
    </Container>
  );
};

export default Header;
