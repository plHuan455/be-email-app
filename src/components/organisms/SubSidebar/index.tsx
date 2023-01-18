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
import { NavLink, useNavigate } from 'react-router-dom';
import EmailStatusHeader from '@components/molecules/EmailStatusHeader';
import { SubSidebarItem } from '@constants/subMenus';
import { useCallback, useEffect, useRef, useState } from 'react';

interface SubSidebarProps {
  menus: SubSidebarItem[];
  title: string;
  headerBtnTitle?: string;
  onClickCompose?: () => void;
}

const SubSidebar: React.FC<SubSidebarProps> = ({
  title,
  menus,
  headerBtnTitle = 'Compose',
  onClickCompose,
}) => {
  const navigate = useNavigate();

  const [listSubNav, setListSubNav] = useState<any>();

  const refActive = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refActive.current) {
      refActive.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [refActive.current]);

  useEffect(() => {
    const l = menus.map((parenItem, parentIdx) => {
      if (parentIdx === 0) {
        if (parenItem.menuItems) {
          const lSub = parenItem.menuItems.map((childItem, childIdx) => {
            return { ...childItem, active: childIdx === 0 };
          });
          return { ...parenItem, isExpand: true, menuItems: lSub };
        } else {
          return { ...parenItem, isExpand: false, active: true };
        }
      } else {
        if (parenItem.menuItems) {
          const lSub2 = parenItem.menuItems.map((childItem) => {
            return { ...childItem, active: false };
          });
          return { ...parenItem, isExpand: false, menuItems: lSub2 };
        } else {
          return { ...parenItem, isExpand: false, active: false };
        }
      }
    });

    setListSubNav(l);
  }, [menus]);

  const hanldeMenuItemClick = useCallback(
    (data: any) => {
      const { index } = data;
      const lSubNav = [...listSubNav];

      const l = lSubNav.map((parentItem, parentIdx) => {
        const currExpand = parentItem.isExpand;

        if (parentIdx === index) {
          if (parentItem.menuItems) {
            return { ...parentItem, isExpand: !currExpand };
          } else {
            return { ...parentItem, isExpand: !currExpand, active: true };
          }
        } else {
          if (parentItem.menuItems) {
            const lSub = parentItem.menuItems.map((sub) => {
              if (lSubNav[index].menuItems) return { ...sub };
              return { ...sub, active: false };
            });
            return { ...parentItem, menuItems: lSub };
          } else {
            if (lSubNav[index].menuItems) return { ...parentItem };
            return { ...parentItem, active: false };
          }
        }
      });
      if (l[index].navigate) {
        navigate(l[index].navigate);
      }
      setListSubNav(l);
    },
    [listSubNav],
  );

  const handleSubMenuItemClick = useCallback(
    (data: any) => {
      const { parentIndex, childIndex } = data;
      const l = listSubNav.map((item, index) => {
        if (parentIndex === index) {
          const jSub = item.menuItems.map((sub, subIdx) => {
            return { ...sub, active: subIdx === childIndex };
          });
          return { ...item, menuItems: jSub };
        } else {
          if (item.menuItems) {
            const jSub2 = item.menuItems.map((sub) => {
              return { ...sub, active: false };
            });
            return { ...item, menuItems: jSub2 };
          }
          return { ...item, active: false };
        }
      });
      navigate(l[parentIndex].menuItems[childIndex].navigate);
      setListSubNav(l);
    },
    [listSubNav],
  );

  return (
    <Box className="o-contactSlideBar py-4 px-2">
      <Drawer
        variant="permanent"
        className="flex flex-col"
        sx={{
          '& .MuiDrawer-paper': {
            position: 'static',
            backgroundColor: 'transparent',
            p: rem(8),
            height: '100vh',
            borderRight: 0,
          },
        }}>
        <EmailStatusHeader
          title={title}
          buttonTitle={headerBtnTitle ?? ''}
          color="#827CFF"
          bgButtonColor="#554CFF"
          isComposeButton={true}
          isSearch={false}
          onClickCompose={onClickCompose}
        />
        <List className="flex-1 overflow-scroll">
          {listSubNav &&
            listSubNav.map((menu, menuIndex) => (
              <Box>
                <div>
                  {menu.navigate ? (
                    <NavLink to={menu.navigate}>
                      {({ isActive }) => (
                        <ListItemButton
                          ref={isActive ? refActive : null}
                          sx={{
                            backgroundColor: isActive ? '#e9e4ff' : 'transparent',
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
                      )}
                    </NavLink>
                  ) : (
                    <ListItemButton
                      onClick={() => hanldeMenuItemClick({ index: menuIndex })}
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
                  )}
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
                              ml: rem(12)
                            }}
                            onClick={() => {
                              handleSubMenuItemClick({
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

export default SubSidebar;
