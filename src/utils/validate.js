export function IsPhoneNumber(phoneNumber) {
  if (!phoneNumber) {
    return false;
  }
  const regex =
    /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  return regex.test(phoneNumber);
}

export function checkPassWordMinChar(password) {
  if (!password) {
    return false;
  }
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
}

export function checkMinAlphabet(params, min) {
  if (!params) {
    return false;
  }
  if (params?.trim().split(' ').length >= min) {
    return true;
  }
  return false;
}

export function checkIsEmail(email) {
  if (!email?.length) {
    return false;
  }
  const regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  return regex.test(email);
}
