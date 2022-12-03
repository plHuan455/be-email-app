import {
  EMAIL_API_URL,
  EMAIL_MANAGER_API_URL,
} from './../../constants/EmailAPI/index';
import { Receiver } from '@layouts/InformationBar';
import ApiClient, { ApiResponse } from '@api/ApiClient';
import { AxiosResponse } from 'axios';
import { AttachFile } from '@components/organisms/EmailMess';

// export interface Receiver {}

// interface FileType {
//   path: string;
// }

export interface CreateEmailParam {
  email: {
    subject: string;
    to: string[];
    from: string;
    content: string;
    html_string: string;
    cc: string[];
    bcc: string[];
    file: any[];
  };
  send_at?: string | null;
}

export interface EmailResponse {
  id: number;
  to: string[];
  subject: string;
  from: string;
  content: string;
  cc: string[];
  bcc: string[];
  status: string;
  writer_name: string;
  writer_id: number;
  attachFiles?: AttachFile[];
  created_at: string;
}

export interface EmailTagsResponse {
  tag: string;
  count: number;
}

export interface EmailDeleteResponse {
  code?: string;
  data?: null;
  message?: string;
}

// GET ALL CUR EMAIL TAGS
export const getAllEmailTags = async (): Promise<
  AxiosResponse<EmailTagsResponse>
> => {
  const url = `${EMAIL_MANAGER_API_URL}/all`;
  const res = await ApiClient.get(url);

  return res.data;
};

//GET EMAIL WITH STATUS
export const getEmailWithQueryParam = async (params?: {
  status?: string;
  mail?: string | null;
  hashtag?: string;
}): Promise<AxiosResponse<EmailResponse[]>> => {
  const url = `${EMAIL_API_URL}`;
  const res = await ApiClient.get(
    url,
    {},
    { status: params?.status, mail: params?.mail, hashtag: params?.hashtag },
  );
  return res.data;
};

//GET EMAIL WITH sender
export const getEmailWithSender = async (
  email: string,
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
  params: CreateEmailParam,
): Promise<AxiosResponse<EmailResponse>> => {
  const url = EMAIL_API_URL;
  const res = await ApiClient.post(url, undefined, params);
  return res;
};

//DELETE EMAIL
export const deleteEmail = async (
  id: string,
): Promise<AxiosResponse<EmailDeleteResponse>> => {
  const url = EMAIL_API_URL;
  const res = await ApiClient.delete(`${url}/${id}`, undefined);
  return res.data;
};
