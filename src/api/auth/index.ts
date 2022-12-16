import ApiClient, { ApiResponse } from '@api/ApiClient';
import { AuthResponse, AuthUpdate } from './interface';

export type Auth = '/v1/api/author/login';
export type AuthChangePassword = '/auth/setting';
export const GetAuthProfile = '/api/user';
export const UpdateAuthProfile = '/api/user/profile';

const CURR_EMAIL = localStorage.getItem('current_email') || '';

export const login = async ({ email, password }): Promise<ApiResponse<string>> => {
  const url: Auth = `/v1/api/author/login`;
  const res = await ApiClient.post(url, undefined, { email, password });
  return res.data;
};

export const changePassword = async ({
  pw_current,
  pw_new,
}): Promise<ApiResponse<string>> => {
  const url: AuthChangePassword = `/auth/setting`;
  const res = await ApiClient.put(url, undefined, { pw_current, pw_new });

  return res.data;
};

export const getUserInfo = async (): Promise<ApiResponse<AuthUpdate>> => {
  const url = `${GetAuthProfile}/cond`;

  const res = await ApiClient.get(url, undefined, { value: CURR_EMAIL });

  return res.data;
};

export const updateAuthProfile = async (
  id: string | null,
  query: AuthUpdate,
): Promise<ApiResponse<AuthUpdate>> => {
  const url = `${UpdateAuthProfile}`;

  const res = await ApiClient.put(url, undefined, query);

  return res.data;
};
