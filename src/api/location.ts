import axios from 'axios';
import ApiClient, { ApiResponse } from './ApiClient';

export type TLocation = {
  id: string;
  name: string;
  parent_id: number;
  type: number;
  code: string;
};
interface GetDistrictParams {
  code?: string;
  city_code: string;
}
interface GetWardParams {
  code?: string;
  district_code: string;
}

const axiosInstance = axios.create({
  // baseURL: url,
  baseURL: process.env.REACT_IMAGE_API,
  timeout: 5000,
});

export const getCity = async (): Promise<ApiResponse<TLocation[]>> => {
  const res = await axiosInstance.get('address/city', {});
  return res.data;
};

export const getDistrict = async (
  params: GetDistrictParams,
): Promise<ApiResponse<TLocation[]>> => {
  const res = await ApiClient.get('address/district', params);
  return res.data;
};

export const getWard = async (
  params: GetWardParams,
): Promise<ApiResponse<TLocation[]>> => {
  const res = await ApiClient.get('address/ward', params);
  return res.data;
};
