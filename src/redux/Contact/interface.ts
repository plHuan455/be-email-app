export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  mail: string;
  avatar: string;
}

export interface ContactGroup {
  id: number;
  group_name: string;
  members: Contact[];
}
