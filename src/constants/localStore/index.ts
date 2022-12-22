export const CURRENT_ROLE = localStorage.getItem('current_role');
export const IS_EMPLOYEE_ROLE = CURRENT_ROLE?.toUpperCase().startsWith('EMPLOYEE');
