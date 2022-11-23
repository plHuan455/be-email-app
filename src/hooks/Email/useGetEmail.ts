import {
  EmailResponse,
  getAllEmail,
  getEmailWithQueryParam,
} from './../../api/email/index';
import React, { useEffect, useState } from 'react';

export const useGetEmail = (fieldData: string) => {
  console.log(
    '🚀 ~ file: useGetEmail.ts ~ line 14 ~ useGetEmail ~ fieldData',
    fieldData,
  );
  const CURRENT_USER_EMAIL = localStorage.getItem('current_email')
    ? localStorage.getItem('current_email')
    : '';
  const [response, setResponse] = useState<any>();

  useEffect(() => {
    const useGetEmail = async () => {
      const res = await getEmailWithQueryParam({
        status: fieldData,
        email: CURRENT_USER_EMAIL,
        hashtag: undefined,
      });
      setResponse({
        data: res.data,
        total: res.total,
      });
    };

    useGetEmail();
  }, [fieldData]);

  return { response };
};
