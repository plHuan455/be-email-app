import { EmailResponse } from '@api/email';
import { AddressType } from '@api/user/interface';

export interface SearchCatalogResponse extends EmailResponse {
  ['es-index']: string;
}

export interface SearchCatalogUserResponse {
  ['es-index']: string;
  Contacts?: string | null;
  address?: AddressType;
  avatar?: string;
  email?: string;
  ['first-name']?: string;
  identity?: string;
  password?: string;
  ['phone_number']: string;
  position?: string;
  role_id?: number;
  user_type?: string;
}
