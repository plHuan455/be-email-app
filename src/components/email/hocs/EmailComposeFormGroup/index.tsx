import { Box } from '@mui/material';
import React from 'react';

interface EmailComposeFormGroupProps {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}

const EmailComposeFormGroup: React.FC<EmailComposeFormGroupProps> = ({
  label,
  htmlFor,
  children,
}) => {
  return (
    <Box className="border-b border-[#DBDBDB] py-3 flex">
      <label
        htmlFor={htmlFor}
        className="inline-block text-[#7E7E7E] first-letter:uppercase font-medium text-[14px]">
        {label}
      </label>
      <Box className="flex-1 pl-2">{children}</Box>
    </Box>
  );
};

export default EmailComposeFormGroup;
