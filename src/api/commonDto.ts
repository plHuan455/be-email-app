export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  token?: string;
  access_token?: string;
}

export interface PagedListRequest {
  page: number;
  limit: number;
}

export declare type PathAPI = '';
