import {
  EMAIL_API_MANAGER_UNDO,
  EMAIL_API_URL,
  EMAIL_CATALOG,
  EMAIL_HASHTAG_API_URL,
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
    subject?: string;
    to?: string[];
    from?: string;
    content?: string;
    text_html?: string;
    cc?: string[];
    bcc?: string[];
    is_favorite?: boolean;
    attachs?: {path?: string}[];
  };
  action?: string;
  send_at?: string;
  hashtags?: string[];
}

export interface attachs {
  id: number;
  email_id: number;
  path: string;
}

export interface EmailResponse {
  id: number;
  user_id: string;
  email_id: string;
  send_at: string;
  created_at: string;
  is_favorite?: boolean;
  email: {
    id: number;
    from: string;
    to: string[];
    cc: string[];
    bcc: string[];
    subject: string;
    type: string;
    writer_id: number;
    text_html: string;
    content: string;
    attachFiles?: AttachFile[];
    attachs?: attachs[];
    tags: [];
  };
  hashtags: string[];
  type: string;
  status: string;
  approve_at: string;
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

const API_EMAIL_USER = '/v1/api/email/user';

// Email Action

export const EmailActions = async (params: {
  user_email_id: number;
  action: 'delete' | 'spam' | 'favorite' | 'unread';
}): Promise<CuSAxiosResponse<any>> => {
  const url = `${API_EMAIL_USER}/action`;

  const res = await ApiClient.post(url, undefined, params);

  return res.data;
};

export const deleteAllWithIdList = async (ids: number[]) => {
  const url = `${API_EMAIL_USER}/action`;
  const res = await Promise.all(
    ids.map((value) =>
      ApiClient.post(url, undefined, { user_email_id: value, action: 'delete' }),
    ),
  );
  return res;
};

// GET ALL CUR EMAIL TAG
export const getAllEmailTag = async (): Promise<AxiosResponse<any[]>> => {
  const url = `/api/hashtag`;
  const res = await ApiClient.get(url);

  return res.data;
};

// GET ALL EMAILS WITH CATALOG
export const getAllEmailByCatalog = async (params?: {
  user_id?: string;
  catalog?: string;
}): Promise<AxiosResponse<EmailResponse[]>> => {
  const url = `${EMAIL_CATALOG}/detail`;

  const res = await ApiClient.get(url, undefined, params);

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
  query: CreateEmailParam,
): Promise<ApiResponse<EmailResponse>> => {
  const url = `${EMAIL_API_URL}/${id}`;

  const res = await ApiClient.put(url, undefined, query);

  return res.data;
};

// Approve Email
export const approveEmail = async (queryParam: {
  user_email_id: number;
  status: 'PENDING' | 'approved' | 'DECLINED' | 'DRAFT';
  note?: string;
  approve_after?: number;
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
  const url = `${EMAIL_API_MANAGER_UNDO}`;
  const res = await ApiClient.post(url, undefined, { user_email_id: emailId, note });
  return res.data;
};

export const getHashtags = async () => {
  const url = EMAIL_HASHTAG_API_URL;
  const res = await ApiClient.get(url, undefined, undefined);
  return res.data;
};
