import { ValidationError } from 'yup';

export type ErrorObject<T extends object = any> = {
  [field in keyof T]: string[];
};
/**
 * Convert yup error into an error object where the keys are the fields and the values are the errors for that field
 * @param {ValidationError} err The yup error to convert
 * @returns {ErrorObject} The error object
 */
export function yupErrorToErrorObject<T extends object = any>(
  err: ValidationError,
): ErrorObject<T> {
  const object: ErrorObject = {};

  err.inner.reduce((x, y) => {
    if (y.path !== undefined) {
      object[y.path] = y.errors;
    }
    return x;
  }, object);

  return object;
}
