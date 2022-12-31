import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { rem } from '@utils/functions';
import { NavLink } from 'react-router-dom';
import EmailStatusHeader from '@components/molecules/EmailStatusHeader';

interface MenuItem {
  id: number;
  name: string;
  navigate?: string;
}

export interface MenuContactTypes {
  name?: string;
  icon?: React.ReactNode;
  menuItems?: any;
  navigate?: string;
}

interface ContactSlideBarProps {
  title: string;
  expandIndex?: number;
  selectedMenuItemIndex?: number;
  menuList: any[];

  onMenuItemClick: (any) => void;
  onSubMenuItemClick: (any) => void;
}

const ContactSlideBar: React.FC<ContactSlideBarProps> = ({
  title,
  expandIndex,
  selectedMenuItemIndex,
  menuList,
  onMenuItemClick,
  onSubMenuItemClick,
}) => {
  console.log('list -->', menuList);
  return (
    <Box className="o-contactSlideBar">
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            position: 'static',
            backgroundColor: 'transparent',
            p: rem(16),
            height: '100vh',
            borderRight: 0,
          },
        }}>
        <EmailStatusHeader
          title={title}
          buttonTitle="Add Contact"
          color="#827CFF"
          bgButtonColor="#554CFF"
          isComposeButton={false}
          isSearch={false}
        />
        <List>
          {menuList &&
            menuList.map((menu, menuIndex) => (
              <Box>
                <div>
                  <ListItemButton
                    onClick={() => onMenuItemClick({ index: menuIndex })}
                    sx={{
                      backgroundColor: menu.active ? '#e9e4ff' : 'transparent',
                    }}>
                    <ListItemIcon
                      sx={{
                        minWidth: 'auto',
                        mr: rem(12),
                        '& .MuiSvgIcon-root': {
                          color: '#000000DE',
                          fontSize: rem(18),
                        },
                      }}>
                      {menu.icon}
                    </ListItemIcon>
                    <ListItemText primary={menu.name} />
                    {menu.menuItems &&
                      (menu.isExpand ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                </div>
                {menu.menuItems && (
                  <Collapse in={menu.isExpand} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {menu.menuItems.map((value, index) => (
                        <div>
                          <ListItemButton
                            sx={{
                              pl: 4,
                              backgroundColor: value.active
                                ? '#e9e4ff'
                                : 'transparent',
                            }}
                            onClick={() => {
                              onSubMenuItemClick({
                                parentIndex: menuIndex,
                                childIndex: index,
                              });
                            }}>
                            <ListItemText primary={value.name} />
                          </ListItemButton>
                        </div>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Box>
            ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default ContactSlideBar;
