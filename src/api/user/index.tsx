import { EMAIL_API_URL } from './../../constants/EmailAPI/index';
import { Receiver } from '@layouts/InformationBar';
import ApiClient from '@api/ApiClient';
import { AxiosResponse } from 'axios';
import { GET__USER__API, USER__API } from '@constants/UserAPI';

// export interface Receiver {}

interface FileType {
  email_id: number;
  path: string;
}

export interface CreateUserParam {
  name: string;
  email: string;
  position: string;
  avatar: string;
}
export interface UserResponse {
  user_name: string;
  position: string;
  avatar: string;
}

//GET EMAIL WITH STATUS
export const getUserWithEmail = async (
  email: string,
): Promise<AxiosResponse<UserResponse>> => {
  const url = GET__USER__API;
  const res = await ApiClient.get(url, { value: email }, {});
  return res.data;
};

//GET ALL EMAIL
export const getAllUser = async (): Promise<AxiosResponse<UserResponse>> => {
  const url = USER__API;
  const res = await ApiClient.get(url, undefined, {});
  return res.data;
};
