import { AxiosResponse } from 'axios';
import ApiClient from '@api/ApiClient';
const BLACKLIST_API_URL = '/user/blacklist';

interface AddMailToBlackListParams {
  user_id?: number;
  user_email: string;
}

export const addMailToBlackList = async (
  params: AddMailToBlackListParams,
): Promise<AxiosResponse<any>> => {
  const url = `${BLACKLIST_API_URL}`;
  const res = await ApiClient.post(url, undefined, params);
  return res.data;
};

export const deleteEmailBlacklist = async (
  id: number,
): Promise<AxiosResponse<any>> => {
  const url = `${BLACKLIST_API_URL}/${id}`;
  const res = await ApiClient.delete(url, undefined);
  return res.data;
};
