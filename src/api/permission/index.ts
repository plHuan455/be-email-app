import ApiClient from '@api/ApiClient';
import { RoleResponse } from '@api/role/interface';
import { PERMISSIONS_ALL_API_URL, PERMISSIONS_API_URL } from '@constants/PersisionsAPI';
import { AxiosResponse } from 'axios';
import { PermissionResponse } from './interface';

export const getPermissions = async (): Promise<AxiosResponse<PermissionResponse[]>> => {
  const url = `${PERMISSIONS_ALL_API_URL}`;
  const res = await ApiClient.get(url);

  console.log('🚀 ~ file: role/index.ts ~ line 16 ~ res', res.data);

  return res.data;
};

export const createPermissions = async (query: {
  name: string;
}): Promise<AxiosResponse<RoleResponse>> => {
  const url = `${PERMISSIONS_API_URL}`;
  const res = await ApiClient.post(url, undefined, query);

  console.log('🚀 ~ file: role/index.ts ~ line 16 ~ res', res.data);

  return res.data;
};
