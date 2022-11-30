export interface PermissionResponse {
  id: number;
  name: string;
  status: 'Active' | 'deny';
  role_permissions: null;
}
