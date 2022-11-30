import { EMAIL_API_URL } from './../../constants/EmailAPI/index';
import { Receiver } from '@layouts/InformationBar';
import ApiClient from '@api/ApiClient';
import { AxiosResponse } from 'axios';
import { GET__USER__API, USER__API } from '@constants/UserAPI';
import { CreateEmployeeParams } from './interface';

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

// CREATE EMPLOYEE
export const createEmployee = async (query: CreateEmployeeParams) => {
  const url = USER__API;
  const dataTemp = new FormData();
  dataTemp.append('avatar', query.avatar);
  dataTemp.append('user_name', query.username);
  dataTemp.append('email', query.email);
  dataTemp.append('password', query.password);
  dataTemp.append('phone_number', query.phone);
  dataTemp.append('position', query.position);
  dataTemp.append('role_id', query.role);
  dataTemp.append('department_id', query.department);

  const res = await ApiClient.postFormData(url, dataTemp )
  return res.data;
};