import { UserName } from '@components/molecules/InformationDetailBlock';
import { Avatar, Box, Typography } from '@mui/material';
import avt from '../../../assets/images/avatars/avatar-1.jpg';
import React from 'react';
import { EmailList } from '@components/molecules/ModalEmailList';
import './index.scss';
import { EmailResponse, getEmailWithQueryParam, UserTagResponse } from '@api/email';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetEmail } from '@hooks/Email/useGetEmail';
import { setEmailsList } from '@redux/Email/reducer';

type Props = {
  firstEmailContent: string;
  emailStatus: string;
  data: UserTagResponse;
  dataEmail: EmailResponse[];
  isSelected: boolean;
  onSelect: () => void;
  emailTag?: string;
};

const EmailItem: React.FC<Props> = ({
  data,
  emailStatus,
  emailTag,
  firstEmailContent,
  isSelected,
  onSelect,
  dataEmail,
}) => {
  const { avatar, count, user_email, user_name } = data;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickEmailItem = async (e) => {
    onSelect();
    if (!emailTag) navigate(`/emails/status/${emailStatus}/${user_email}`);
    else navigate(`/emails/tag/${emailTag}/${user_email}`);
  };

  return (
    <Box
      className={`email__item ${isSelected && 'selected'}`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: '.3s ease-in-out',
        borderRadius: '8px',
        margin: '5px 0',
        padding: '0 5px',
      }}
      onClick={handleClickEmailItem}>
      <Box
        sx={{
          width: '90%',
          padding: '5px 0',
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Avatar
            src={avt}
            alt="sender avt"
            sx={{ width: '35px', height: '35px' }}
          />
          <Box sx={{ width: '70%' }}>
            <Typography
              component={'p'}
              sx={{
                width: '100%',
                fontSize: '10px',
                color: '#999DA0',
                paddingLeft: '10px',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}>
              <span className="font-bold">{user_name}</span> | {user_email}
            </Typography>
            <Typography
              component={'p'}
              sx={{
                width: '100%',
                fontSize: '12px',
                color: '#495057',
                paddingLeft: '10px',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                fontWeight: 'bold',
              }}>
              {firstEmailContent}
            </Typography>
          </Box>
        </Box>
      </Box>
      {count > 0 ? (
        <Typography
          component={'p'}
          sx={{
            backgroundColor: '#DADCDD',
            height: '18px',
            fontSize: '10px',
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 5px',
            color: '#495057',
          }}>
          {count > 9 ? '9+' : count}
        </Typography>
      ) : (
        ''
      )}
    </Box>
  );
};

export default EmailItem;
