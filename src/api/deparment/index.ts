import ApiClient from '@api/ApiClient';
import { DEPARTMENT_API_URL } from '@constants/departmentAPI';
import { AxiosResponse } from 'axios';
import {
  DepartmentResponse
} from './interface';

export const getDepartments = async (): Promise<AxiosResponse<DepartmentResponse[]>> => {
  const url = `${DEPARTMENT_API_URL}`;
  const res = await ApiClient.get(url);
  return res.data;
}
