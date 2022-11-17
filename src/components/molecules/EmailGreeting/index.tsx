import LogoWithLabel from '@components/atoms/LogoWithLabel';
import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface Props {
  greetingLabel: string;
  isHaveLogo?: boolean;
  logo?: React.ReactNode;
}

const EmailGreeting: React.FC<Props> = ({
  greetingLabel,
  isHaveLogo = false,
  logo,
}) => {
  return (
    <Box>
      <Box>
        <p className="text-black text-[16px] font-normal">{greetingLabel}</p>
      </Box>
      {/* Logo */}
      {isHaveLogo && (logo || <p>Lỗi khi hiện Logo</p>)}
    </Box>
  );
};

export default EmailGreeting;
