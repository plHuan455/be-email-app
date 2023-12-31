/* eslint-disable global-require */
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';

const ROOT_API = '/v1/api';

type QueryObject = { [key: string]: string | number | boolean };

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface CuSAxiosResponse<T> extends AxiosResponse {
  message?: string;
  total?: number;
  user_id?: number;
}

const url = process.env.EMAIL_APP_API_BASE_URL
  ? process.env.EMAIL_APP_API_BASE_URL
  : 'http://notification.trade:8000/';
const local = 'http://10.0.2.131:8000/';

const axiosInstance = axios.create({
  baseURL: url,
  timeout: 5001,
});

export default class ApiClient {
  static async get(
    url: string,
    params?: object,
    query?: object,
  ): Promise<AxiosResponse> {
    let requestUrl = query
      ? `${ROOT_API}${url}?${stringify(query)}`
      : `${ROOT_API}${url}`;
    const response = await axiosInstance.get(requestUrl, {
      params,
      headers: await this.getHeaders(),
      data: {},
    });
    return response;
  }

  static async patch(
    url: string,
    query?: object,
    params?: object,
  ): Promise<AxiosResponse> {
    const requestUrl = query
      ? `${ROOT_API}${url}?${stringify(query)}`
      : `${ROOT_API}${url}`;
    const config: AxiosRequestConfig = {
      headers: await this.getHeaders(),
      // validateStatus,
    };
    const response = await axiosInstance.patch(requestUrl, params, config);
    return response;
  }

  static async post(
    url: string,
    query?: object,
    params?: object,
  ): Promise<AxiosResponse> {
    const requestUrl = query
      ? `${ROOT_API}${url}?${stringify(query)}`
      : `${ROOT_API}${url}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders(),
      // validateStatus,
    };

    const response = await axiosInstance.post(requestUrl, params, config);
    return response;
  }

  static async put(
    url: string,
    query?: object,
    params?: object,
  ): Promise<AxiosResponse> {
    const requestUrl = query
      ? `${ROOT_API}${url}?${stringify(query)}`
      : `${ROOT_API}${url}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders(),
      // validateStatus,
    };

    const response = await axiosInstance.put(requestUrl, params, config);
    return response;
  }

  static async delete(url: string, params: any): Promise<AxiosResponse> {
    const requestUrl = params
      ? `${ROOT_API}${url}?${stringify(params)}`
      : `${ROOT_API}${url}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('multipart/form-data'),
    };

    const response = await axiosInstance.delete(requestUrl, config);
    return response;
  }

  static async postFile(
    url: string,
    query: object,
    fileKey: string,
    file: File,
  ): Promise<AxiosResponse> {
    const requestUrl = `${ROOT_API}${url}?${stringify(query)}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('multipart/form-data'),
    };

    const formData = new FormData();
    formData.append(fileKey, file);
    const response = await axiosInstance.post(requestUrl, formData, config);
    return response;
  }

  static async postFormData(
    url: string,
    formData: FormData,
    query?: object,
  ): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('multipart/form-data'),
    };
    const response = await axiosInstance.post(requestUrl, formData, config);
    return response;
  }

  private static async getHeaders(contentType: string = 'application/json') {
    return {
      'Content-Type': contentType,
      authorization: this.getToken(),
    };
  }

  private static getToken() {
    const token: any = localStorage.getItem('token');
    return `Bearer ` + JSON.stringify(token).replaceAll(/[",\\]/g, '');
  }
}
