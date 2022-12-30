import EmailStatusHeader from '@components/molecules/EmailStatusHeader';
import { MenuContactTypes } from '@components/organisms/ContactSlideBar';
import SettingLeftMain from '@components/organisms/SettingLeftMain';
import useLocalStorage from '@hooks/useLocalStorage';
import { Box } from '@mui/material';
import React, { useMemo, useState } from 'react';

const BlackListSubNav = () => {
  const [slideBarExpandIndex, setSlideBarExpandIndex] = useState<number>();
  const [slideBarSelectedMenuItemIndex, setSlideBarSelectedMenuItemIndex] =
    useState<number>();

  const subBarItem = useMemo(() => {
    const arr: MenuContactTypes[] = [
      {
        name: 'User Blacklist',
        navigate: '/black-list/user',
      },
      { name: 'System Blacklist', navigate: '/black-list/system' },
    ];
    return arr;
  }, []);

  return (
    <Box className="p-6">
      <EmailStatusHeader
        title="Blacklist"
        buttonTitle=""
        bgButtonColor="#554CFF"
        color="#827CFF"
        isComposeButton={false}
        isSearch={false}
      />
      <SettingLeftMain
        menuList={subBarItem}
        expandIndex={slideBarExpandIndex}
        selectedMenuItemIndex={slideBarSelectedMenuItemIndex}
        onMenuTitleClick={(index) => {
          console.log(index);
          setSlideBarExpandIndex(slideBarExpandIndex === index ? undefined : index);
          setSlideBarSelectedMenuItemIndex(undefined);
        }}
        onMenuItemClick={(index) =>
          setSlideBarSelectedMenuItemIndex(
            slideBarSelectedMenuItemIndex === index ? undefined : index,
          )
        }
      />
    </Box>
  );
};

export default BlackListSubNav;
