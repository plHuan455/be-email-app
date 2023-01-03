import { AttachFile } from '@components/organisms/EmailMess';
import { HashtagType } from '.';

export interface EmailUpdateQuery {
  to?: string[];
  cc?: string[];
  from?: string;
  subject?: string;
  content?: string;
  html_string?: string;
  forward?: string;
  send_at?: string;
  hashtags?: HashtagType[];
  status?: string;
  is_important?: boolean;
}

export interface EmailCatalogResponse {
  value: string;
  amount: number;
}

export interface CatalogTabResponse {
  user_id: number;
  first_name: string;
  last_name: string;
  identity: string;
  user_email: string;
  avatar: string;
  amount: number;
}
