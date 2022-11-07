import Icon, { SVGIconProps } from '@components/atoms/Icon';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useTranslation } from '@@packages/localization';
import { sideBarRouter } from '@page/MainRoute';
import { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';

interface MenuData {
  title: string;
  url?: string;
  enabled: boolean;
  topLevel: boolean;
  icon: ReactNode;
  subMenuItems?: Array<any>;
}

interface IButtonIcon {
  item: SVGIconProps['icon'];
  width?: number;
  height?: number;
}

const RenderButtonIcon: React.FC<IButtonIcon> = ({
  item,
  width = 20,
  height = 20,
}) => {
  const { t } = useTranslation();
  return (
    <IconButton>
      <Icon icon={item} width={width} height={height} color={'grey-5'} />
    </IconButton>
  );
};

const iconList: {
  [key: string]: SVGIconProps['icon'];
} = {
  '/ui-management': 'settings',
  '/access-control': 'lock',
};

const SideBar = () => {
  const { t } = useTranslation();

  const newSideBar = useMemo((): Array<MenuData | undefined> => {
    if (sideBarRouter) {
      return sideBarRouter.map((val) => {
        if (!val) return undefined;
        const newObj: MenuData = {
          title: val.path ? t(String(val.path.split('/').pop()).capitalize()) : '',
          url: val.path,
          enabled: true,
          topLevel: true,
          icon: <RenderButtonIcon item={val.path ? iconList[val.path] : 'bell'} />,
          subMenuItems: undefined,
        };
        if (val.children) {
          newObj.subMenuItems = val.children.map((data) => {
            const newSubMenuObj = {
              title: data.path
                ? t(
                    String(
                      data.path
                        .split('/')
                        .pop()
                        ?.split('-')
                        .map((val) => val.capitalize())
                        .join(' '),
                    ),
                  )
                : '',
              url: `${data.path}`,
              enabled: true,
              icon: <RenderButtonIcon item="dot" width={10} height={10} />,
            };
            return newSubMenuObj;
          });
        }
        return newObj;
      });
    }
    return [];
  }, [sideBarRouter]);

  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (url: string) => () => {
      navigate(url);
    },
    [navigate],
  );

  return (
    <Sidebar width="270px" className="overflow-auto" backgroundColor="white">
      <Menu>
        {newSideBar.map((elm) => {
          if (!elm) return null;
          return !elm.subMenuItems ? (
            <MenuItem icon={elm.icon} key={elm.url}>
              {elm.title}
            </MenuItem>
          ) : (
            <SubMenu
              key={elm.url}
              label={elm.title}
              className={'font-semibold'}
              icon={elm.icon}>
              {elm.subMenuItems.map((item) => {
                return (
                  <MenuItem
                    icon={item.icon}
                    key={item.url}
                    onClick={handleNavigate(item.url)}>
                    <Typography color={'black'} fontWeight={500}>
                      {item.title}
                    </Typography>
                  </MenuItem>
                );
              })}
            </SubMenu>
          );
        })}
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
