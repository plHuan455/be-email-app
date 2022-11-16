import { EMAIL_API_URL } from './../../constants/EmailAPI/index';
import { Receiver } from '@layouts/InformationBar';
import ApiClient, { ApiResponse } from '@api/ApiClient';
import { AxiosResponse } from 'axios';

// export interface Receiver {}

interface FileType {
  email_id: number;
  path: string;
}

export interface CreateEmailParam {
  title: string;
  subject: string;
  writer_id: number;
  to: string[];
  from: string;
  content: string;
  cc: string[];
  bcc: string[];
  file: FileType[];
}
export interface EmailResponse {
  id: number;
  writer_id: number;
  receiver: string[];
  from: string;
}

//GET EMAIL WITH STATUS
export const getEmailWithStatus = async (
  status: string,
): Promise<AxiosResponse<EmailResponse>> => {
  const url = EMAIL_API_URL;
  const res = await ApiClient.get(url, undefined, {});
  return res;
};

//APPROVE EMAIL
export const changeEmailStatus = async (
  email: string,
  status: string,
): Promise<AxiosResponse<EmailResponse>> => {
  const url = EMAIL_API_URL;
  const res = await ApiClient.put(url, undefined, {});
  return res;
};

//GET ALL EMAIL
export const getAllEmail = async (): Promise<AxiosResponse<EmailResponse>> => {
  const url = EMAIL_API_URL;
  const res = await ApiClient.get(url, undefined, {});
  return res;
};

//SEND EMAIL
export const sendEmail = async (
  param: CreateEmailParam,
): Promise<AxiosResponse<EmailResponse>> => {
  const url = EMAIL_API_URL;
  const res = await ApiClient.post(url, undefined, param);
  console.log('🚀 ~ file: index.ts ~ line 24 ~ getAllEmail ~ res', res);
  return res;
};

//DELETE EMAIL
export const deleteEmail = async (
  id: string,
): Promise<AxiosResponse<EmailResponse>> => {
  const url = EMAIL_API_URL;
  const res = await ApiClient.delete(`${url}/${id}`, undefined);
  console.log('🚀 ~ file: index.ts ~ line 24 ~ getAllEmail ~ res', res);
  return res;
};
