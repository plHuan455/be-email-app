export interface CreateEmployeeParams {
  avatar?: string;
  first_name: string;
  last_name: string;
  identity: string;
  email: string;
  password: string;
  phone_number: string;
  position: string;
  role_id: number;
  department_id: number;
}

export type UpdateEmployeeParams = Partial<CreateEmployeeParams>;

export interface DeleteUserResponse {
  code?: string;
  data?: string;
  message?: string;
}
