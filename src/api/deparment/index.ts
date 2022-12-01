import ApiClient from '@api/ApiClient';
import { DEPARTMENT_API_URL } from '@constants/departmentAPI';
import { AxiosResponse } from 'axios';
import {
  DepartmentParams,
  DepartmentResponse
} from './interface';

export const getDepartments = async (): Promise<AxiosResponse<DepartmentResponse[]>> => {
  const url = `${DEPARTMENT_API_URL}`;
  const res = await ApiClient.get(url);
  return res.data;
}

export const createDepartment = async (params: DepartmentParams): Promise<AxiosResponse<DepartmentResponse>> => {
  const url = `${DEPARTMENT_API_URL}`;
  const res = await ApiClient.post(url, undefined, params);
  return res.data;
}