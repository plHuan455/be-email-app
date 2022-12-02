import { UserResponse } from "@api/user";
export interface DepartmentResponse {
  id: number;
  name: string;
  description: string;
  address: string;
  users?: UserResponse[];
}

export interface DepartmentParams {
  name: string;
  description?: string;
  address?: string;
}
