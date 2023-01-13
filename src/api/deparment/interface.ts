import { UserResponse } from '@api/user';

export interface PositionResponse {
  id: number;
  name: string;
  describe: string;
  department_id: number;
}

export interface DepartmentResponse {
  id: number;
  name: string;
  description: string;
  address: string;
  users?: UserResponse[];
  positions?: PositionResponse[];
  company_id: number;
}

export interface CreateDepartmentParams {
  name: string;
  description?: string;
  address?: string;
}

type UpdateDepartmentParams = Partial<CreateDepartmentParams>;
