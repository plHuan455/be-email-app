import ApiClient from '@api/ApiClient';
import { DEPARTMENT_API_URL } from '@constants/departmentAPI';
import { AxiosResponse } from 'axios';
import { CreateDepartmentParams, DepartmentResponse } from './interface';

export const getDepartments = async (): Promise<
  AxiosResponse<DepartmentResponse[]>
> => {
  const url = `${DEPARTMENT_API_URL}`;
  const res = await ApiClient.get(url);
  return res.data;
};

export const getDepartmentById = async (
  id: number,
): Promise<AxiosResponse<DepartmentResponse[]>> => {
  const url = `${DEPARTMENT_API_URL}/${id}`;
  const res = await ApiClient.get(url);
  return res.data;
};

export const createDepartment = async (
  params: CreateDepartmentParams,
): Promise<AxiosResponse<DepartmentResponse>> => {
  const url = `${DEPARTMENT_API_URL}`;
  const res = await ApiClient.post(url, undefined, params);
  return res.data;
};

export const updateDepartment = async (
  id: number,
  params: any,
): Promise<AxiosResponse<DepartmentResponse>> => {
  const url = DEPARTMENT_API_URL;
  const res = await ApiClient.put(`${url}/${id}`, undefined, params);
  return res.data;
};

export const deleteDepartment = async (id: number) => {
  const url = DEPARTMENT_API_URL;
  const res = await ApiClient.delete(`${url}/${id}`, undefined);
  return res.data;
};
