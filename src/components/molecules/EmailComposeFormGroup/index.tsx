import { Box } from '@mui/material';
import classNames from 'classnames';
import React from 'react';

interface EmailComposeFormGroupProps {
  label: string;
  htmlFor?: string;
  isHaveBorderBottom?: boolean;
  className?: string;
  classNameContent?: string;
  children?: React.ReactNode;
}

const EmailComposeFormGroup: React.FC<EmailComposeFormGroupProps> = ({
  label = '',
  htmlFor,
  isHaveBorderBottom = true,
  className,
  classNameContent,
  children,
}) => {
  return (
    <Box
      className={`${
        isHaveBorderBottom ? 'border-b border-[#DBDBDB]' : ''
      } py-2 flex ${className}`}>
      <label
        htmlFor={htmlFor}
        className="inline-block text-[#7E7E7E] first-letter:uppercase font-medium text-[14px] leading-[38px]">
        {label}
      </label>
      <Box className={classNames("flex-1 pl-2", classNameContent)}>{children}</Box>
    </Box>
  );
};

export default EmailComposeFormGroup;
