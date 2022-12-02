import ApiClient, { ApiResponse } from '@api/ApiClient';

export type Auth = '/auth/login';
export type AuthChangePassword = '/auth/setting';

export const login = async ({ email, password }): Promise<ApiResponse<string>> => {
  const url: Auth = `/auth/login`;
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
