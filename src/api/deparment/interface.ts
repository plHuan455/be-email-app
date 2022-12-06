import { UserResponse } from "@api/user";
export interface DepartmentResponse {
  id: number;
  name: string;
  description: string;
  address: string;
  users?: UserResponse[];
}

export interface CreateDepartmentParams {
  name: string;
  description?: string;
  address?: string;
}

type UpdateDepartmentParams = Partial<CreateDepartmentParams>;
