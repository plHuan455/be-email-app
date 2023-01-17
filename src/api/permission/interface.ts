export interface PermissionResponse {
  id: number;
  code: string;
  name: string;
  status: 'Active' | 'deny';
  role_permissions: null;
}
