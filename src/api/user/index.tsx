import { EMAIL_API_URL } from './../../constants/EmailAPI/index';
import { Receiver } from '@layouts/InformationBar';
import ApiClient, { CuSAxiosResponse } from '@api/ApiClient';
import { AxiosResponse } from 'axios';
import {
  GET__USER__API,
  SIGNATURE_API,
  UPLOAD_FILE,
  USER_PROFILE,
  USER__API,
  USER__API_ALL,
  USER__API__GET,
} from '@constants/UserAPI';
import {
  CreateEmployeeParams,
  CreateSignatureParams,
  DeleteUserResponse,
  SignatureResponse,
  UpdateEmployeeParams,
  UpdateSignatureParams,
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
  first_name: string;
  last_name: string;
  identity: string;
  role: string;
}

export interface UserProfileResponse {
  id: number;
  avatar: string;
  department: string;
  email: string;
  first_name: string;
  last_name: string;
  identity: string;
  phone_number: string;
  position: string;
  role_id: number;
  role: string;
  contact_id: number;
  department_id: number;
}

//GET EMAIL WITH STATUS
export const getUserWithEmail = async (
  id: number,
): Promise<AxiosResponse<UserProfileResponse>> => {
  const url = `${USER_PROFILE}/${id}`;
  const res = await ApiClient.get(url);
  return res.data;
};

//GET ALL EMAIL
export const getAllUser = async (query?: {
  page: number;
  limit: number;
}): Promise<CuSAxiosResponse<UserResponse[]>> => {
  const url = USER__API_ALL;
  const res = await ApiClient.get(url, undefined, query);
  return res.data;
};

// GET USER BY ID
export const getUserById = async (
  id: number,
): Promise<AxiosResponse<UserResponse>> => {
  const url = `${USER_PROFILE}/${id}`;
  const res = await ApiClient.get(url);
  return res.data;
};
// CREATE EMPLOYEE
export const createEmployee = async (params: CreateEmployeeParams) => {
  const url = USER__API_ALL;
  // const cloneParams = {
  //   avatar: params.avatar,
  //   email: params.email,
  //   password: params.password,
  //   position: params.position,
  //   user_name: params.username,
  //   department_id: Number(params.department),
  //   role_id: Number(params.role),
  //   phone_number: params.phone,
  // };
  const res = await ApiClient.post(url, undefined, params);
  return res.data;
};

export const updateEmployee = async (id: number, params: UpdateEmployeeParams) => {
  const url = `${USER__API}/manager`;
  // const cloneParams = {
  //   avatar: params.avatar,
  //   email: params.email,
  //   password: params.password,
  //   position: params.position,
  //   user_name: params.username,
  //   department_id: Number(params.department),
  //   role_id: Number(params.role),
  //   phone_number: params.phone,
  // };
  const res = await ApiClient.put(`${url}/${id}`, undefined, params);
  return res.data;
};

export const deleteUser = async (
  id: number,
): Promise<AxiosResponse<DeleteUserResponse>> => {
  const url = USER__API;
  const res = await ApiClient.delete(`${url}/${id}`, undefined);
  return res.data;
};

export const createSignatureService = async (params: CreateSignatureParams) => {
  const url = SIGNATURE_API;
  const res = await ApiClient.post(url, undefined, params);
  return res.data;
}

export const getSignatureListService = async (): Promise<AxiosResponse<SignatureResponse[]>> => {
  const url = SIGNATURE_API;
  const res = await ApiClient.get(url);
  return res.data;
}

export const getSignatureService = async (id: number): Promise<AxiosResponse<SignatureResponse>> => {
  const url = `${SIGNATURE_API}/${id}`;
  const res = await ApiClient.get(url);
  return res.data;
}

export const updateSignatureService = async (id: number, params: UpdateSignatureParams): Promise<AxiosResponse<SignatureResponse>> => {
  const url = `${SIGNATURE_API}/${id}`;
  const res = await ApiClient.put(url, undefined, params);
  return res.data;
}

export const deleteSignatureService = async (id: number) => {
  const url = `${SIGNATURE_API}/${id}`;
  const res = await ApiClient.delete(url, undefined);
  return res.data;
}
