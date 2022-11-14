import { Receiver } from '@layouts/InformationBar';
import { ApiResponse } from '@api/ApiClient';

// export interface Receiver {}

export interface EmailResponse {
  id: number;
  writer_id: number;
  receiver: string[];
  from: string;
}

export const getEmail = async (): Promise<ApiResponse<EmailResponse>> => {
  const test = {
    id: 2,
    writer_id: 2,
    receiver: ['asdasd'],
    from: 'asdasd',
  };
  return test;
};
