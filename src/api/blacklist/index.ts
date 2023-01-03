import ApiClient from '@api/ApiClient';
import { async } from '@firebase/util';
import { AxiosResponse } from 'axios';

const MAIN_API = '/v1/api/user/blacklist';

const BLACKLIST_API = {
  post: MAIN_API,
  delete: MAIN_API,
  get: MAIN_API,
};

export const AddBlacklist = async (
  user_email: string,
): Promise<AxiosResponse<any>> => {
  const res = await ApiClient.post(BLACKLIST_API.post, undefined, { user_email });

  return res.data;
};
