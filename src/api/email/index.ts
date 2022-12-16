import {
  EMAIL_API_URL,
  EMAIL_CATALOG,
  EMAIL_MANAGER_API_URL,
} from './../../constants/EmailAPI/index';
import { Receiver } from '@layouts/InformationBar';
import ApiClient, { ApiResponse, CuSAxiosResponse } from '@api/ApiClient';
import { AxiosResponse } from 'axios';
import { AttachFile } from '@components/organisms/EmailMess';
import { async } from '@firebase/util';
import {
  CatalogTabResponse,
  EmailCatalogResponse,
  EmailUpdateQuery,
} from './interface';
import { number } from 'yup';
export interface CreateEmailParam {
  email: {
    subject: string;
    to: string[];
    from: string;
    content?: string;
    html_string: string;
    cc: string[];
    bcc: string[];
    attachs: { path: string }[];
  };
  send_at?: string;
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
  forward: string;
  html_string: string;
  send_at: string;
  tags: [];
}

export interface UserTagResponse {
  avatar: string;
  count: number;
  user_email: string;
  user_id: number;
  user_name: string;
}

export interface EmailManagerResponse {
  emails: EmailResponse[];
  user_tag_info: UserTagResponse;
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

// GET ALL CUR EMAIL TAG
export const getAllEmailTag = async (): Promise<AxiosResponse<any[]>> => {
  const url = `/api/hashtag`;
  const res = await ApiClient.get(url);

  return res.data;
};

// Get All Catalog Tab
export const getAllCatalogTab = async (): Promise<
  AxiosResponse<EmailCatalogResponse[]>
> => {
  const url = `${EMAIL_CATALOG}`;

  const res = await ApiClient.get(url);

  return res.data;
};

// GET ALL CUR EMAIL Status
export const getAllEmailStatus = async (): Promise<
  AxiosResponse<EmailTagsResponse[]>
> => {
  const url = `${EMAIL_MANAGER_API_URL}/all-status`;
  const res = await ApiClient.get(url);

  return res.data;
};

// GET LIST CATALOG
export const getListCatalogWithQueryParam = async (params: {
  catalog: string;
  subject: string;
}): Promise<CuSAxiosResponse<CatalogTabResponse[]>> => {
  const url = `${EMAIL_CATALOG}/info`;
  const res = await ApiClient.get(url, {}, params);
  return res.data;
};

//GET EMAIL WITH STATUS
export const getEmailWithQueryParam = async (params?: {
  status?: string;
  mail?: string | null;
  hashtag?: string;
}): Promise<CuSAxiosResponse<EmailResponse[]>> => {
  const url = `${EMAIL_API_URL}/manager`;
  const res = await ApiClient.get(
    url,
    {},
    { status: params?.status, mail: params?.mail, hashtag: params?.hashtag },
  );
  return res.data;
};

// Get Emails List
export const getEmailsListWithQueryParams = async (params?: {
  status?: string;
  email?: string;
  tag?: string;
}): Promise<AxiosResponse<EmailManagerResponse[]>> => {
  const url = `${EMAIL_MANAGER_API_URL}`;
  const res = await ApiClient.get(url, undefined, params);

  return res.data;
};

// GET EMAIL MANAGER STATUS
export const getEmailManagerWithQueryParams = async (params?: {
  status?: string;
  email?: string;
  tag?: string;
}): Promise<AxiosResponse<EmailManagerResponse[]>> => {
  const url = `${EMAIL_MANAGER_API_URL}/tag`;
  const res = await ApiClient.get(url, undefined, params);

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
  return res.data;
};

//DELETE EMAIL
export const deleteEmail = async (
  id: string,
): Promise<CuSAxiosResponse<EmailDeleteResponse>> => {
  const url = EMAIL_API_URL;
  const res = await ApiClient.delete(`${url}/${id}`, undefined);
  return res.data;
};

// Update Email With Query
export const updateEmailWithQuery = async (
  id: number,
  query: EmailUpdateQuery,
): Promise<ApiResponse<EmailResponse>> => {
  const url = `${EMAIL_API_URL}/${id}`;

  const res = await ApiClient.put(url, undefined, query);

  return res.data;
};

// Approve Email
export const approveEmail = async (queryParam: {
  email_id: number;
  status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'DRAFT';
  note?: string;
  send_after?: number;
}): Promise<AxiosResponse<EmailResponse>> => {
  const url = `${EMAIL_MANAGER_API_URL}`;

  const res = await ApiClient.post(url, undefined, queryParam);

  return res.data;
};

export const undoEmail = async ({
  emailId,
  note,
}: {
  emailId: number;
  note?: string;
}) => {
  const url = `${EMAIL_API_URL}/undo`;
  const res = await ApiClient.post(url, undefined, { email_id: emailId, note });
  return res.data;
};
