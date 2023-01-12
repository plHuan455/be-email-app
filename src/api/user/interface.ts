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

export interface CreateSignatureParams {
  name: string;
  text_html: string;
}

export type UpdateSignatureParams = Partial<CreateSignatureParams>

export interface SignatureResponse {
  name: string;
  text_html: string;
  id: number;
}
