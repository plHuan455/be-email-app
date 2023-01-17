import {
  getRole,
  getRoleHavePermissionsById,
  setRolePermissionWithQueryById,
} from '@api/role';
import SettingTabs from '@components/molecules/SettingTabs';
import TableHeader from '@components/molecules/TableManagerHeader';
import { useEffect, useMemo, useState } from 'react';
import TableSettingRole from './TableSettingRole';

import { isEmpty } from 'lodash';
import { Tab, Tabs } from '@mui/material';
import { PermissionResponse } from '@api/permission/interface';
import { PermissionQuery } from '@api/role/interface';
import * as yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPermissions } from '@api/permission';
import { toast } from 'react-toastify';
import { rem } from '@utils/functions';

interface ActivePermissionTypes {
  [key: number]: string;
}

const SettingRolesContainer = () => {
  const queryClient = useQueryClient();

  const [activePermissionsHash, setActivePermissionsHash] =
    useState<ActivePermissionTypes>({});

  const [value, setValue] = useState(0);
  const [isAddPermission, setIsAddPermission] = useState<boolean>(false);

  const { data: headerTabData } = useQuery({
    queryKey: ['setting-role-get-header-tabs'],
    queryFn: getRole,
    onSuccess: (res) => {
      if (!isEmpty(res.data)) {
        setValue(res.data[0].id);
      }
    },
  });

  const { data: rolePermissionData, isLoading: isRolePermissionGetting } = useQuery({
    queryKey: ['setting-role-get-permission', value],
    queryFn: () => getRoleHavePermissionsById(`${value}`),
    onSuccess: (res) => {
      const activePermissionHash: ActivePermissionTypes = {};
      res?.data?.permissions?.forEach((value) => {
        activePermissionHash[value.id] = value.name;
      });
      setActivePermissionsHash(activePermissionHash);
    },
    enabled: value !== 0,
  });

  const { data: permissionListData } = useQuery({
    queryKey: ['setting-role-get-permission-list', isAddPermission],
    queryFn: getPermissions,
    enabled: isAddPermission && value !== 0,
  });

  const { mutate: updatePermissionMutate, isLoading: isPermissionUpdating } =
    useMutation({
      mutationKey: ['setting-role-update-permission', value],
      mutationFn: (query: PermissionQuery) =>
        setRolePermissionWithQueryById(`${value}`, query),
      onSuccess: (res) => {
        console.log(
          '🚀 ~ file: SettingRoleContainer/index.ts ~ line 58 ~ res',
          res.data,
        );
        toast.success('Update Permission Success');
        setIsAddPermission(false);
        queryClient.invalidateQueries({ queryKey: ['setting-role-get-permission'] });
      },
      onError: (err: any) => {
        toast.error('Permission Updating is failed');
      },
    });

  useEffect(() => {
    setIsAddPermission(false);
  }, [value]);

  const convertedPermissionList = useMemo(() => {
    if (!permissionListData?.data) {
      return undefined;
    }
    return [...permissionListData.data].sort((a) =>
      activePermissionsHash.hasOwnProperty(a.id) ? -1 : 1,
    );
  }, [permissionListData]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleUpdatePermission = () => {
    console.log(activePermissionsHash);
    const convertedPermissionParams = Object.keys(activePermissionsHash).map(
      (key) => ({
        id: Number(key),
        name: activePermissionsHash[key],
      }),
    );

    updatePermissionMutate({ permissions: convertedPermissionParams });
  };

  const handleChangePermissionState = (id: number, name?: string) => {
    const cloneActivePermissionHash = { ...activePermissionsHash };
    if (name === undefined) delete cloneActivePermissionHash[id];
    else {
      cloneActivePermissionHash[id] = name;
    }
    setActivePermissionsHash(cloneActivePermissionHash);
  };

  const handleClickAddPermission = () => {
    setIsAddPermission((preState) => !preState);
  };

  return (
    <div className="px-6 flex-1 overflow-hidden flex flex-col">
      <TableHeader
        plusButtonTitle="Add permission"
        onPlusClick={handleClickAddPermission}>
        <Tabs
          className="tableManagerTabs"
          value={value}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ maxWidth: `calc(100% - ${rem(342)})`, minHeight: 'auto' }}
          onChange={handleChange}
          aria-label="disabled tabs example">
          {!isEmpty(headerTabData?.data) &&
            headerTabData?.data.map((item) => (
              <Tab value={item.id} key={item.id} label={item.name} />
            ))}
        </Tabs>
      </TableHeader>
      <div className="flex flex-1 overflow-hidden">
        <SettingTabs />
        <TableSettingRole
          isLoading={isRolePermissionGetting}
          isButtonLoading={isRolePermissionGetting || isPermissionUpdating}
          dataStates={activePermissionsHash}
          updatePermission={handleUpdatePermission}
          data={
            isAddPermission
              ? convertedPermissionList
              : rolePermissionData?.data?.permissions
          }
          onChangeRow={handleChangePermissionState}
          buttonLabel={isAddPermission ? 'Add' : 'Update'}
        />
      </div>
    </div>
  );
};

export default SettingRolesContainer;
