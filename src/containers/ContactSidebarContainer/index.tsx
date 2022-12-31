import { contactDummy } from '@assets/dummyData/contact';
import ContactSlideBar from '@components/organisms/ContactSlideBar';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactSidebarContainer = () => {
  const navigate = useNavigate();

  const [listSubNav, setListSubNav] = useState<any>();

  useEffect(() => {
    const l = contactDummy.map((parenItem, parentIdx) => {
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
  }, []);

  const hanldeMenuItemClick = useCallback(
    (data: any) => {
      const { index } = data;
      const lSubNav = [...listSubNav];

      const l = lSubNav.map((parenItem: any, parentIdx: number) => {
        const currExpand = parenItem.isExpand;

        if (parentIdx === index) {
          if (parenItem.menuItems) {
            // const lSub = parenItem.menuItems.map((sub, subIdx) => {
            //   return { ...sub };
            // });
            return { ...parenItem, isExpand: !currExpand };
          } else {
            return { ...parenItem, isExpand: !currExpand, active: true };
          }
        }
        // return { ...parenItem };
        else {
          if (parenItem.menuItems) {
            const lSub = parenItem.menuItems.map((sub) => {
              if (lSubNav[index].menuItems) return { ...sub };
              return { ...sub, active: false };
            });
            return { ...parenItem, menuItems: lSub };
          } else {
            return { ...parenItem };
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
      const l = listSubNav.map((item: any, index: number) => {
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
    <ContactSlideBar
      title={'Contact'}
      menuList={listSubNav}
      onMenuItemClick={hanldeMenuItemClick}
      onSubMenuItemClick={handleSubMenuItemClick}
    />
  );
};

export default ContactSidebarContainer;
