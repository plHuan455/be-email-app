import EmailStatusHeader from '@components/molecules/EmailStatusHeader';
import { MenuContactTypes } from '@components/organisms/ContactSlideBar';
import SettingLeftMain from '@components/organisms/SettingLeftMain';
import useLocalStorage from '@hooks/useLocalStorage';
import { Box } from '@mui/material';
import React, { useMemo, useState } from 'react';

const SettingLeftContainer = () => {
  const [slideBarExpandIndex, setSlideBarExpandIndex] = useState<number>();
  const [slideBarSelectedMenuItemIndex, setSlideBarSelectedMenuItemIndex] =
    useState<number>();

  const [role] = useLocalStorage('current_role', '');
  const IS_EMPLOYEE_ROLE = role?.toUpperCase().startsWith('EMPLOYEE');

  const menuSettingsList: MenuContactTypes[] = useMemo(() => {
    return IS_EMPLOYEE_ROLE ? menuSettingsListEmployee() : menuSettingsListManager;
  }, [IS_EMPLOYEE_ROLE]);

  return (
    <Box className="p-6">
      <EmailStatusHeader
        title="Settings"
        buttonTitle=""
        bgButtonColor="#554CFF"
        color="#827CFF"
        isComposeButton={false}
        isSearch={false}
      />
      <SettingLeftMain
        menuList={menuSettingsList}
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

const menuSettingsListEmployee = () => {
  const userRole = localStorage.getItem('current_role');
  const department_id = localStorage.getItem('department_id');

  let departmentRoute = `/manager/department/${department_id}/employee`;
  if (userRole === 'admin') {
    departmentRoute = '/manager/department';
  }

  const arr: MenuContactTypes[] = [
    {
      name: 'Profile',
      navigate: '/manager/profile',
    },
    { name: 'Signature', navigate: '/manager/signature' },
    { name: 'Department', navigate: departmentRoute },
  ];
  return arr;
};

const menuSettingsListManager: MenuContactTypes[] = [
  ...menuSettingsListEmployee(),
  { name: 'Role', navigate: '/manager/setting' },
];

export default SettingLeftContainer;
