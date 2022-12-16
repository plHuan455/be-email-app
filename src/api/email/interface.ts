import { AttachFile } from '@components/organisms/EmailMess';

export interface EmailUpdateQuery {
  to?: string[];
  cc?: string[];
  from?: string;
  subject?: string;
  content?: string;
  html_string?: string;
  forward?: string;
  send_at?: string;
  tags?: { name: string }[];
  status?: string;
}

export interface CreateEmailParam {
  email: {
    subject: string;
    to: string[];
    from: string;
    content?: string;
    html_string: string;
    cc: string[];
    bcc: string[];
    files: { path: string }[];
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

export interface EmailCatalogResponse {
  value: string;
  amount: number;
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
