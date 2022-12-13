import { EMAIL_API_URL } from './../../constants/EmailAPI/index';
import { Receiver } from '@layouts/InformationBar';
import ApiClient, { CuSAxiosResponse } from '@api/ApiClient';
import { AxiosResponse } from 'axios';
import {
  GET__USER__API,
  UPLOAD_FILE,
  USER__API,
  USER__API__GET,
} from '@constants/UserAPI';
import {
  CreateEmployeeParams,
  DeleteUserResponse,
  UpdateEmployeeParams,
} from './interface';

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
  id: number;
  avatar: string;
  contacts: any;
  department_id: number;
  email: string;
  user_id: number;
  mail_storage: string;
  manager: number;
  password: string;
  phone_number: string;
  position: string;
  role_id: number;
  user_name: string;
  role: string;
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
export const getAllUser = async (query?: {
  page: number;
  limit: number;
}): Promise<CuSAxiosResponse<UserResponse[]>> => {
  const url = USER__API;
  const res = await ApiClient.get(url, undefined, query);
  return res.data;
};

// GET USER BY ID
export const getUser = async (id: number): Promise<AxiosResponse<UserResponse>> => {
  const url = USER__API__GET;
  const res = await ApiClient.get(url, { value: id });
  return res.data;
};
// CREATE EMPLOYEE
export const createEmployee = async (params: CreateEmployeeParams) => {
  const url = USER__API;
  const cloneParams = {
    avatar: params.avatar,
    email: params.email,
    password: params.password,
    position: params.position,
    user_name: params.username,
    department_id: Number(params.department),
    role_id: Number(params.role),
    phone_number: params.phone,
  };
  const res = await ApiClient.post(url, undefined, cloneParams);
  return res.data;
};

export const updateEmployee = async (id: number, params: UpdateEmployeeParams) => {
  const url = `${USER__API}/manager`;
  const cloneParams = {
    avatar: params.avatar,
    email: params.email,
    password: params.password,
    position: params.position,
    user_name: params.username,
    department_id: Number(params.department),
    role_id: Number(params.role),
    phone_number: params.phone,
  };
  const res = await ApiClient.put(`${url}/${id}`, undefined, cloneParams);
  return res.data;
};

export const deleteUser = async (
  id: number,
): Promise<AxiosResponse<DeleteUserResponse>> => {
  const url = USER__API;
  const res = await ApiClient.delete(`${url}/${id}`, undefined);
  return res.data;
};
