import {
  EmailResponse,
  getAllEmail,
  getEmailWithStatus,
} from './../../api/email/index';
import React, { useEffect, useState } from 'react';

type Props = {
  filterField: string;
  fieldData: string;
};

export const useGetEmail = (filterField: string, fieldData: string) => {
  console.log(
    '🚀 ~ file: useGetEmail.ts ~ line 14 ~ useGetEmail ~ fieldData',
    fieldData,
  );
  const [response, setResponse] = useState<EmailResponse>();

  useEffect(() => {
    const useGetEmail = async () => {
      switch (filterField) {
        case 'status':
          const resDataWithStatus = await getEmailWithStatus(fieldData);
          console.log(
            '🚀 ~ file: useGetEmail.ts ~ line 21 ~ useGetEmail ~ resData',
            resDataWithStatus,
          );
          setResponse(resDataWithStatus.data);
          break;
        case 'sender':
          const resDataWithSender = await getEmailWithStatus(fieldData);
          console.log(
            '🚀 ~ file: useGetEmail.ts ~ line 21 ~ useGetEmail ~ resData',
            resDataWithSender,
          );
          setResponse(resDataWithSender.data);
          break;

        default:
          const resData = await getAllEmail();
          console.log(
            '🚀 ~ file: useGetEmail.ts ~ line 21 ~ useGetEmail ~ resData',
            resData,
          );
          setResponse(resData.data);
          break;
      }
    };

    useGetEmail();
  }, [filterField]);

  return { response };
};
