import { PermissionResponse } from '@api/permission/interface';

export interface RoleResponse {
  id: number;
  name: string;
}

export interface RoleHavePermissionResponse {
  id: number;
  name: string;
  permissions?: PermissionResponse[];
}

export interface PermissionQuery {
  permissions: { id: number; name?: string }[];
}
