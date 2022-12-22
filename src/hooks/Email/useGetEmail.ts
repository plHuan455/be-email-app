import {
  EmailResponse,
  getAllEmail,
  getEmailWithQueryParam,
} from './../../api/email/index';
import React, { useEffect, useState } from 'react';

export const useGetEmail = (status: string, mail?: string) => {
  const CURRENT_USER_EMAIL = localStorage.getItem('current_email')
    ? localStorage.getItem('current_email')
    : '';
  const [response, setResponse] = useState<any>();

  const filterResData = (resData: EmailResponse[]) => {
    const cloneResData = [...resData];

    const newSetResData = new Set(cloneResData.map((val) => val.email.from));

    const filterResult = Array.from(newSetResData).map((val) => {
      const filter = cloneResData.filter((item) => item.email.from === val);

      const res = {
        total: filter.length,
        data: filter,
      };

      return res;
    });

    return filterResult;
  };

  useEffect(() => {
    const useGetEmail = async () => {
      const res = await getEmailWithQueryParam({
        status: status,
        mail: mail || '', //CURRENT_USER_EMAIL
        hashtag: undefined,
      });

      const filterRes = filterResData(res.data);

      setResponse({ data: filterRes, total: res.total });
      // setResponse(res);
    };

    useGetEmail();
  }, [status]);

  return { response };
};
