import Plus from '@assets/icon/Plus';
import CustomButton from '@components/atoms/CustomButton';
import Input from '@components/atoms/Input';
import { EmailComposeContext } from '@containers/MainWrapperContainer';
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
import { useAppDispatch } from '@redux/configureStore';
import React, { ChangeEvent, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  title: string;
  buttonTitle: string;
  color: string;
  bgButtonColor: string;
  isSearch?: boolean;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isComposeButton?: boolean;
  onClickCompose?: () => void;
};

const EmailStatusHeader: React.FC<Props> = ({
  title,
  buttonTitle,
  isSearch,
  isComposeButton,
  color,
  bgButtonColor,
  onSearch,
  onClickCompose,
}) => {
  const navigate = useNavigate();
  const { onNewComposeClick } = useContext(EmailComposeContext);

  const handleComposeEmail = useCallback(() => {
    onClickCompose ? onClickCompose() : onNewComposeClick();
  }, [onNewComposeClick]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
        }}>
        <Typography
          component={'p'}
          sx={{ fontSize: '24px', color: `${color}`, fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Box className="flex flex-1 gap-3 justify-end">
          {isComposeButton && (
            <CustomButton
              className="py-3 hover:opacity-90 ease-linear duration-300 w-auto"
              label={buttonTitle}
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
      </Box>

      {isSearch && onSearch && (
        <Box className="py-2">
          <Input
            onChange={onSearch}
            type="text"
            inputMode="search"
            placeHolder="Search email, name, department, keywords..."
            isAccessControlInput={true}
            fullWidth={true}
          />
        </Box>
      )}
    </Box>
  );
};

export default EmailStatusHeader;
