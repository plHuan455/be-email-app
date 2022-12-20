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
  first_name: string;
  last_name: string;
  identity: string;
  phone_number: string;
  position: string;
  email: string;
  department: string;
  role: string;
}
