import ApiClient, { ApiResponse, CuSAxiosResponse } from '@api/ApiClient';
import { AuthResponse, AuthUpdate } from './interface';

export type Auth = '/authentication/login';
export type AuthChangePassword = '/authentication/setting';
export const AuthProfile = '/user/setting/profile';

const CURR_EMAIL = localStorage.getItem('current_email') || '';

export const login = async ({
  email,
  password,
}): Promise<CuSAxiosResponse<string>> => {
  const url: Auth = `/authentication/login`;
  const res = await ApiClient.post(url, undefined, { email, password });
  return res.data;
};

export const changePassword = async ({
  pw_current,
  pw_new,
}): Promise<ApiResponse<string>> => {
  const url: AuthChangePassword = `/authentication/setting`;
  const res = await ApiClient.put(url, undefined, { pw_current, pw_new });

  return res.data;
};

export const getUserInfo = async (): Promise<ApiResponse<AuthUpdate>> => {
  const url = `${AuthProfile}`;

  const res = await ApiClient.get(url);

  return res.data;
};

export const updateAuthProfile = async (
  query: AuthUpdate,
): Promise<ApiResponse<AuthUpdate>> => {
  const url = `${AuthProfile}`;

  const res = await ApiClient.put(url, undefined, query);

  return res.data;
};
