import React from 'react';
import useToast from './useToastify';

const useValidate = (input: any) => {
  const toast = useToast();
  let hasError = false;
  let arrayInput: Array<any> = input;
  if (!Array.isArray(input)) {
    arrayInput = [];
    for (const [key, value] of Object.entries(input)) {
      const elm = { key, value };
      arrayInput.push(elm);
    }
  }

  if (arrayInput.length < 1) return;

  for (let i = 0; i < arrayInput.length; i++) {
    const valueFlag = arrayInput[i].value;
    const keyFlag = arrayInput[i].key;

    if (typeof valueFlag === 'string' && valueFlag === '') {
      hasError = true;
      toast.error(`${keyFlag} is require !`);
      break;
    }
    if (typeof valueFlag === 'number' && valueFlag === 0) {
      hasError = true;
      toast.error(`${keyFlag} is require !`);
      break;
    }
    if (typeof valueFlag === 'undefined' || valueFlag === null) {
      hasError = true;
      toast.error(`${keyFlag} is require !`);
      break;
    }
    if (Array.isArray(valueFlag) && valueFlag.length < 1) {
      hasError = true;
      toast.error(`${keyFlag} is require !`);
      break;
    }
    if (typeof i === 'object' && Object.keys(i).length === 0) {
      hasError = true;
      toast.error(`${keyFlag} is require !`);
      break;
    }
  }

  return hasError;
};

export default useValidate;
