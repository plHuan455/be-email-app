import Plus from '@assets/icon/Plus';
import Search from '@assets/icon/Search';
import CustomButton from '@components/atoms/CustomButton';
import Input from '@components/atoms/Input';
import { Box, ButtonBase, colors, Grid, Typography } from '@mui/material';
import { useAppDispatch } from '@redux/configureStore';
import { setShowMinimizeEmail } from '@redux/Email/reducer';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useEmailCompose from '../../../zustand/useEmailCompose';

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleComposeEmail = useCallback(() => {
    dispatch(setShowMinimizeEmail(undefined));
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
          marginBottom: '48px',
        }}>
        <Typography
          component={'p'}
          sx={{ fontSize: '24px', color: `${color}`, fontWeight: 'bold' }}>
          {title}
        </Typography>
        {isComposeButton && (
          <CustomButton
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
      <Box>
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
