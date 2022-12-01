export interface DepartmentResponse {
  id: number;
  name: string;
  description: string;
  address: string;
}

export interface DepartmentParams {
  name: string;
  description?: string;
  address?: string;
}
