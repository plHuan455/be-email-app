import ApiClient from '@api/ApiClient';
import { ROLE_API_URL } from '@constants/RoleAPI';
import { AxiosResponse } from 'axios';
import {
  PermissionQuery,
  RoleHavePermissionResponse,
  RoleResponse,
} from './interface';

export const createRole = async (query: {
  name: string;
}): Promise<AxiosResponse<RoleResponse>> => {
  const url = `${ROLE_API_URL}`;
  const res = await ApiClient.post(url, undefined, query);

  console.log('🚀 ~ file: role/index.ts ~ line 16 ~ res', res.data);

  return res.data;
};

export const getRole = async (): Promise<AxiosResponse<RoleResponse>> => {
  const url = `${ROLE_API_URL}`;
  const res = await ApiClient.get(url, undefined, undefined);

  console.log('🚀 ~ file: role/index.ts ~ line 10 ~ res', res.data);

  return res.data;
};

export const getRoleHavePermissionsById = async (
  id: string,
): Promise<AxiosResponse<RoleHavePermissionResponse>> => {
  const url = `${ROLE_API_URL}/${id}`;

  const res = await ApiClient.get(url);

  console.log('🚀 ~ file: role/index.ts ~ line 20 ~ res', res.data);

  return res.data;
};

export const setRolePermissionWithQueryById = async (
  id: string,
  query: PermissionQuery,
): Promise<AxiosResponse<RoleHavePermissionResponse>> => {
  const url = `${ROLE_API_URL}/${id}`;

  const res = await ApiClient.put(url, undefined, query);

  console.log('🚀 ~ file: role/index.ts ~ line 32 ~ res', res.data);

  return res.data;
};
