import { EmailResponse } from '@api/email';

export interface AuthResponse {
  user_name: string;
  position: string;
  avatar: string;
  email: string;
  phone_number: string;
  department: string;
  role: string;
}
