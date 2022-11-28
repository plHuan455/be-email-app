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

  const filterResData = (resData: EmailResponse[]) => {
    const cloneResData = [...resData];

    const newSetResData = new Set(cloneResData.map((val) => val.from));

    const filterResult = Array.from(newSetResData).map((val) => {
      const filter = cloneResData.filter((item) => item.from === val);

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
        status: fieldData,
        email: CURRENT_USER_EMAIL,
        hashtag: undefined,
      });

      // const filterRes = filterResData(res.data);

      // setResponse({ data: filterRes, total: res.total });
      setResponse(res);
    };

    useGetEmail();
  }, [fieldData]);

  return { response };
};
