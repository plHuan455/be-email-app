import * as yup from 'yup';

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const createEmployeeSchema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .required()
      .matches(phoneRegExp, 'Phone number is not in the correct format'),
    position: yup.string().required(),
    role: yup.string().required(),
    department: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export const updateUserProfileSchema = yup.object({
  user_name: yup.string().required(),
  email: yup.string().email().required(),
  phone_number: yup
    .string()
    .required()
    .matches(phoneRegExp, 'Phone number is not in the correct format'),
  position: yup.string().required(),
  role: yup.string().required(),
  department: yup.string().required(),
});
