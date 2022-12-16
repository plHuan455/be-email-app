import { Box, Collapse, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { rem } from "@utils/functions";
import { NavLink } from "react-router-dom";

interface MenuItem {
  id: number;
  name: string;
  navigate?: string;
}

export interface MenuContactTypes {
  name?: string;
  icon?: React.ReactNode;
  menuItems?: MenuItem[];
  navigate?: string;
}

interface ContactSlideBarProps {
  title: string;
  expandIndex?: number;
  selectedMenuItemIndex?: number;
  menuList: MenuContactTypes[];
  onMenuTitleClick: (index: number) => void;
  onMenuItemClick: (index: number) => void;
}

const ContactSlideBar: React.FC<ContactSlideBarProps> = ({
  title,
  expandIndex,
  selectedMenuItemIndex,
  menuList,
  onMenuTitleClick,
  onMenuItemClick,
}) => {
  return (
    <Box className="o-contactSlideBar">
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            position: 'static',
            backgroundColor: 'transparent',
            p: rem(16),
            height: "100vh"
          }
        }}
      >
        <Box className="o-contactSlideBar_title">
          <Typography
            variant="h2"
            sx={{
              color: '#827CFF',
              fontSize: rem(24),
              fontWeight: 700,
              lineHeight: rem(30),
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box className="o-contactSlideBar_listTitle" mt={rem(24)}>
          <Typography
            variant="h5"
            sx={{
              color: '#000000DE',
              fontSize: rem(16),
              lineHeight: rem(24)
            }}
          >
            My contacts
          </Typography>
        </Box>
        <List>
          {menuList.map((menu, menuIndex) => (
            <Box >
              <NavLink to={menu.navigate ?? ''}>
                {({ isActive }) => (
                  <ListItemButton
                    onClick={() => onMenuTitleClick(menuIndex)}
                    sx={{backgroundColor: isActive && menu.navigate !== undefined ? '#e9e4ff' : 'transparent'}}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 'auto',
                        mr: rem(12),
                        '& .MuiSvgIcon-root': {
                          color: '#000000DE',
                          fontSize: rem(18),
                        }
                      }}
                    >
                      {menu.icon}
                    </ListItemIcon>
                    <ListItemText primary={menu.name} />
                    {menu.menuItems !== undefined && (menuIndex === expandIndex ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                )}
              </NavLink>
              {menu.menuItems !== undefined && <Collapse in={menuIndex === expandIndex} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menu.menuItems.map((value, index) => (
                    <NavLink to={value.navigate ?? ''}>
                      <ListItemButton
                        sx={{
                          pl: 4,
                          backgroundColor: index === selectedMenuItemIndex && expandIndex === menuIndex ? '#e9e4ff' : 'transparent'
                        }}
                        onClick={() => { onMenuItemClick(index) }}
                      >
                        <ListItemText primary={value.name} />
                      </ListItemButton>
                    </NavLink>
                  ))}
                </List>
              </Collapse>}
            </Box>
          ))}
        </List>
      </Drawer>
    </Box>
  )
}

export default ContactSlideBar