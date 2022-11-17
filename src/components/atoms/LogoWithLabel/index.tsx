import { Box } from '@mui/system';
import React from 'react';
import logoImg from '@assets/images/logo_without_text.png';

interface Props {}

const LogoWithLabel: React.FC<Props> = () => {
  return (
    <Box className="flex items-center">
      <img src={logoImg} alt="Logo" />
      <span className="bg-gradient-to-r text-[#675FFF] font-[900] text-[28px] pl-3">
        METANODE
      </span>
    </Box>
  );
};

export default LogoWithLabel;
