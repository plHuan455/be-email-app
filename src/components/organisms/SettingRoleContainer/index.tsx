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
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getPermissions } from '@api/permission';
import { toast } from 'react-toastify';
import CreatePermissionFormModal, { CreatePermissionFields } from './CreatePermissionFormModal';

const responsePermissionsData: PermissionResponse[] = [
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
];

const createPermissionSchema   = yup.object({
  name: yup.string().required(),
}).required();

const SettingRolesContainer = () => {
  const [value, setValue] = useState(0);
  const [isAddPermission, setIsAddPermission] = useState<boolean>(false);

  const [permissionsState, setPermissionsState] = useState<PermissionResponse[]>([
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

  // const {mutate: createPermissionMutate} = useMutation({
  //   mutationKey: ['setting-role-create-permission'],
  //   mutationFn: (query: { name: string }) => createPermissions(query),
  //   onSuccess: (data) => {
  //     toast.success('Permission was created');
  //   }
  // })

  const {data: headerTabData} = useQuery({
    queryKey: ['setting-role-get-header-tabs'],
    queryFn: getRole,
    onSuccess: (res) => {
      if (!isEmpty(res.data)) {
        setValue(res.data[0].id);
      }
    },
  })

  const {data: rolePermissionData} = useQuery({
    queryKey: ['setting-role-get-permission', value],
    queryFn: () => getRoleHavePermissionsById(`${value}`),
    onSuccess: (res) => {
      if (res.data.permissions) setPermissionsState(res.data.permissions);
      else setPermissionsState([]);
    },
    enabled: value !== 0
  });

  const {data: permissionListData} = useQuery({
    queryKey: ['setting-role-get-permission-list', isAddPermission],
    queryFn: getPermissions,
    onSuccess: (res) => {
      if(!res?.data) return;
      const newPermissionState: PermissionResponse[] = res.data.map(value => {
        // A permission status is Active
        if(rolePermissionData?.data?.permissions?.some(permissionState => permissionState.id === value.id)){
          return value;
        }
        return {...value, status: 'deny'};
      })
      setPermissionsState(newPermissionState.sort((a, b) => a.status === 'Active' ? -1 : 1));
    },
    enabled: isAddPermission && value !== 0,
  })

  const {mutate: updatePermissionMutate} = useMutation({
    mutationKey: ['setting-role-update-permission', value],
    mutationFn: (query: PermissionQuery) => setRolePermissionWithQueryById(`${value}`, query),
    onSuccess: (res) => {
      console.log(
        '🚀 ~ file: SettingRoleContainer/index.ts ~ line 58 ~ res',
        res.data,
      );
      toast.success('Update Permission Success');
      setIsAddPermission(false);
      setPermissionsState(res?.data?.permissions ?? []);
    },
    onError: (err: any) => {
      toast.error('Permission Updating is failed')
    }
  })

  useEffect(() => {
    setIsAddPermission(false);
  }, [value])
 
  const handleChange = (e, newValue) => setValue(newValue);

  const handleChangeRow = useCallback(
    (index: number, permission: PermissionResponse) => {
      setPermissionsState((prevState) => {
        prevState[index] = permission;
        return [...prevState];
      });
    },
    [permissionsState],
  );

  console.log(
    '🚀 ~ file: SettingRoleContainer/index.ts ~ line 106 ~ res',
    permissionsState,
  );

  const handleClickAddPermission = () => {
    if(!isAddPermission){
      setIsAddPermission(true);
      return;
    }

    setIsAddPermission(false);
    setPermissionsState(rolePermissionData?.data?.permissions ?? []);
  }

  return (
    <div>
      <TableHeader plusButtonTitle="Add permission" onPlusClick={handleClickAddPermission}>
        <Tabs
          className="tableManagerTabs"
          value={value}
          onChange={handleChange}
          aria-label="disabled tabs example">
          {!isEmpty(headerTabData?.data) &&
            headerTabData?.data.map((item) => (
              <Tab value={item.id} key={item.id} label={item.name} />
            ))}
        </Tabs>
      </TableHeader>
      <div className="flex">
        <SettingTabs />
        <TableSettingRole
          updatePermission={updatePermissionMutate}
          data={permissionsState}
          onChangeRow={handleChangeRow}
          buttonLabel={isAddPermission ? "Add" : "Update"}
        />
      </div>
    </div>
  );
};

export default SettingRolesContainer;
