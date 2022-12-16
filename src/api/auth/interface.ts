export interface AuthResponse {
  user_name: string;
  position: string;
  avatar: string;
  email: string;
  phone_number: string;
  department: string;
  role: string;
}

export interface AuthUpdate {
  avatar?: File | string;
  user_name: string;
  position: string;
  email: string;
  phone_number: string;
  department: string;
  role: string;
}
