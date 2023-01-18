export interface ContactResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  avatar?: string;
  created_at: string;
}

export interface ContactCreateParams {
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export type EditContactParams = Partial<ContactCreateParams>;