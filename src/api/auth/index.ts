import ApiClient, { ApiResponse } from '@api/ApiClient';

export type Auth = '/auth/login';

export const login = async ({ email, password }): Promise<ApiResponse<string>> => {
  const url: Auth = `/auth/login`;
  const res = await ApiClient.post(url, undefined, { email, password });
  return res.data;
};
