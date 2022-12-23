import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { rem } from '@utils/functions';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MenuContactTypes } from '../ContactSlideBar';

interface Props {
  expandIndex?: number;
  selectedMenuItemIndex?: number;
  menuList: MenuContactTypes[];
  onMenuTitleClick: (index: number) => void;
  onMenuItemClick: (index: number) => void;
}

const SettingLeftMain: React.FC<Props> = ({
  expandIndex,
  selectedMenuItemIndex,
  menuList,
  onMenuTitleClick,
  onMenuItemClick,
}) => {
  return (
    <Box className="0-SettingLeftMain">
      <List>
        {menuList.map((menu, menuIndex) => (
          <Box>
            <NavLink to={menu.navigate ?? '#'}>
              {({ isActive }) => (
                <ListItemButton
                  onClick={() => onMenuTitleClick(menuIndex)}
                  sx={{
                    paddingInline: '0 !important',
                    backgroundColor:
                      isActive && menu.navigate !== undefined
                        ? '#e9e4ff'
                        : 'transparent',
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
                  <ListItemText
                    sx={{ span: { fontWeight: 700 } }}
                    primary={menu.name}
                  />
                  {menu.menuItems !== undefined &&
                    (menuIndex === expandIndex ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              )}
            </NavLink>
            {menu.menuItems !== undefined && (
              <Collapse in={menuIndex === expandIndex} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menu.menuItems.map((value, index) => (
                    <NavLink to={value.navigate ?? '#'}>
                      <ListItemButton
                        sx={{
                          pl: 4,
                          backgroundColor:
                            index === selectedMenuItemIndex &&
                            expandIndex === menuIndex
                              ? '#e9e4ff'
                              : 'transparent',
                        }}
                        onClick={() => {
                          onMenuItemClick(index);
                        }}>
                        <ListItemText
                          sx={{
                            span: {
                              fontWeight: 600,
                            },
                          }}
                          primary={value.name}
                        />
                      </ListItemButton>
                    </NavLink>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default SettingLeftMain;
