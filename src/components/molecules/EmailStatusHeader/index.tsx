import Plus from '@assets/icon/Plus';
import Search from '@assets/icon/Search';
import CustomButton from '@components/atoms/CustomButton';
import Input from '@components/atoms/Input';
import {
  Badge,
  Box,
  ButtonBase,
  colors,
  Grid,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailNotify from '../EmailNotify';

type Props = {
  title: string;
  color: string;
  bgButtonColor: string;
  isSearch?: boolean;
  isComposeButton?: boolean;
};

const EmailStatusHeader = ({
  title,
  isSearch,
  isComposeButton,
  color,
  bgButtonColor,
}: Props) => {
  const navigate = useNavigate();

  const handleComposeEmail = useCallback(() => {
    navigate('/emails/compose');
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
        }}>
        <Typography
          component={'p'}
          sx={{ fontSize: '24px', color: `${color}`, fontWeight: 'bold' }}>
          {title}
        </Typography>

        <EmailNotify />
      </Box>
      <Box className="flex gap-3 justify-end py-4 border-b-2">
        {isComposeButton && (
          <CustomButton
            className="py-3 hover:opacity-90 ease-linear duration-300"
            label="Compose"
            bgButtonColor="#554CFF"
            color="#fff"
            isAfterIcon={true}
            width={100}
            isHasSlash={true}
            afterIcon={<Plus width={10} height={10} color={'#fff'} />}
            onClick={handleComposeEmail}
          />
        )}
      </Box>
      <Box className="py-2">
        <Input
          type="text"
          inputMode="search"
          placeHolder="Search email, name, department, keywords..."
          isAccessControlInput={true}
          fullWidth={true}
        />
      </Box>
    </Box>
  );
};

export default EmailStatusHeader;
