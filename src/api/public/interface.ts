import { EmailResponse } from '@api/email';

export interface SearchCatalogResponse extends EmailResponse {
  ['es-index']: string;
}
