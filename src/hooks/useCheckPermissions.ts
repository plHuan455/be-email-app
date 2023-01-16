import { getRoleHavePermissionsById } from '@api/role';
import useLocalStorage from '@hooks/useLocalStorage';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const useCheckPermissions = (permissionCheck: string) => {
  const [currentRoleId] = useLocalStorage('current_role_id', '');
  const [result, setResult] = useState<boolean>();

  const { data: queryPermissionsList } = useQuery({
    queryKey: ['checkPermissions'],
    queryFn: () => getRoleHavePermissionsById(`${currentRoleId}`),
    onSuccess: (res) => {
      const data = res.data;

      setResult(
        data.permissions?.find((value) => value.name === permissionCheck)
          ? true
          : false,
      );
    },
  });

  return result;
};

export { useCheckPermissions };
