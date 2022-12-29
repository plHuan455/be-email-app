export interface CreateEmployeeParams {
  avatar?: string;
  user_name: string;
  email: string;
  password: string;
  phone_number: string;
  position: string;
  role_id: string;
  department_id: string;
}

export type UpdateEmployeeParams = Partial<CreateEmployeeParams>;

export interface DeleteUserResponse {
  code?: string;
  data?: string;
  message?: string;
}
