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
