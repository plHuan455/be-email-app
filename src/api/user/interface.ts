export interface CreateEmployeeParams {
  avatar?: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  position: string;
  role: string;
  department: string;
}

export type UpdateEmployeeParams = Partial<CreateEmployeeParams>;

export interface DeleteUserResponse {
  code?: string;
  data?: string;
  message?: string;
}