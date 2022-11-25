import {
  getRole,
  getRoleHavePermissionsById,
  setRolePermissionWithQueryById,
} from '@api/role';
import SettingTabs from '@components/molecules/SettingTabs';
import TableHeader from '@components/molecules/TableManagerHeader';
import { Role } from '@page/Manager/interface';
import React, { useCallback, useEffect, useState } from 'react';
import TableSettingRole from './TableSettingRole';

import { isEmpty } from 'lodash';
import { Tab, Tabs } from '@mui/material';
import { PermissionResponse } from '@api/permission/interface';
import { PermissionQuery } from '@api/role/interface';

const SettingRolesContainer = () => {
  const [headerTabs, setHeaderTabs] = useState<any>([]);
  const [value, setValue] = useState(0);
  const [permissionsData, setPermissionsData] = useState<PermissionResponse[]>([
    {
      id: 1,
      name: 'Permission1',
      status: 'Active',
      role_permissions: null,
    },
    {
      id: 2,
      name: 'Permission2',
      status: 'Active',
      role_permissions: null,
    },
    {
      id: 3,
      name: 'Permission3',
      status: 'Active',
      role_permissions: null,
    },
    {
      id: 4,
      name: 'Permission4',
      status: 'Active',
      role_permissions: null,
    },
    {
      id: 5,
      name: 'Permission5',
      status: 'Active',
      role_permissions: null,
    },
    {
      id: 6,
      name: 'Permission6',
      status: 'Active',
      role_permissions: null,
    },
  ]);

  const handleChange = (e, newValue) => setValue(newValue);

  // useEffect(() => {
  //   (async () => {
  //     const res = await getRole();

  //     console.log('🚀 ~ file: SettingRoleContainer/index.ts ~ line 14 ~ res', res);

  //     if (!isEmpty(res.data)) {
  //       setHeaderTabs(res.data);
  //       setValue(res.data[0].id);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    if (value !== 0)
      (async () => {
        const res = await getRoleHavePermissionsById(`${value}`);

        console.log('🚀 ~ file: SettingRoleContainer/index.ts ~ line 37 ~ res', res);

        if (res.data.permissions) setPermissionsData(res.data.permissions);
      })();
  }, [value]);

  const handleChangeRow = useCallback(
    (index: number, permission: PermissionResponse) => {
      setPermissionsData((prevState) => {
        prevState[index] = permission;
        return [...prevState];
      });
    },
    [permissionsData],
  );

  console.log(
    '🚀 ~ file: SettingRoleContainer/index.ts ~ line 106 ~ res',
    permissionsData,
  );

  const cbSetPermissionData = useCallback(
    (query: PermissionQuery) => {
      (async () => {
        // const res = await setRolePermissionWithQueryById(`${value}`, query);

        // console.log(
        //   '🚀 ~ file: SettingRoleContainer/index.ts ~ line 58 ~ res',
        //   res.data,
        // );

        // if (res.data.permissions) setPermissionsData(res.data.permissions);
        setPermissionsData([
          {
            id: 4,
            name: 'Permission4',
            status: 'Active',
            role_permissions: null,
          },
          {
            id: 5,
            name: 'Permission5',
            status: 'Active',
            role_permissions: null,
          },
          {
            id: 6,
            name: 'Permission6',
            status: 'Active',
            role_permissions: null,
          },
        ]);
      })();
    },
    [value],
  );

  return (
    <div>
      <TableHeader isHaveActions={false}>
        <Tabs
          className="tableManagerTabs"
          value={value}
          onChange={handleChange}
          aria-label="disabled tabs example">
          {!isEmpty(headerTabs) &&
            headerTabs.map((item) => (
              <Tab value={item.id} key={item.id} label={item.name} />
            ))}
        </Tabs>
      </TableHeader>
      <div className="flex">
        <SettingTabs />
        <TableSettingRole
          updatePermission={cbSetPermissionData}
          data={permissionsData}
          onChangeRow={handleChangeRow}
        />
      </div>
    </div>
  );
};

export default SettingRolesContainer;
