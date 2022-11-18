import { CreateEmailParam, EmailResponse, sendEmail } from './../../api/email/index';
import React, { useEffect, useState } from 'react';

export const useSendEmail = (params: CreateEmailParam) => {
  const [response, setResponse] = useState<EmailResponse>();

  useEffect(() => {
    const handleSendEmail = async () => {
      const res = sendEmail(params);
      console.log('🚀 ~ file: useSendEmail.ts ~ line 14 ~ useGetEmail ~ res', res);
    };
    handleSendEmail();
  }, [params]);

  return { response };
};
