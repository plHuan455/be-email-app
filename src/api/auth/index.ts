import ApiClient, { ApiResponse } from '@api/ApiClient';

export type Auth = 'login';

export const login = async ({ email, password }): Promise<ApiResponse<string>> => {
  const url: Auth = `login`;
  const res = await ApiClient.post(url, undefined, { email, password });

  return res.data;
};
