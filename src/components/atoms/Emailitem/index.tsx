import { UserName } from '@components/molecules/InformationDetailBlock';
import { Avatar, Box, Typography } from '@mui/material';
import avt from '../../../assets/images/avatars/avatar-1.jpg';
import React from 'react';
import { EmailList } from '@components/molecules/ModalEmailList';
import './index.scss';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetEmail } from '@hooks/Email/useGetEmail';
import { setEmailsList } from '@redux/Email/reducer';
import Icon from '../Icon';
import { EmailResponse, UserTagResponse } from '@api/email';
import { CatalogTabResponse } from '@api/email/interface';

type Props = {
  // firstEmailContent: string;
  data: CatalogTabResponse;
  // dataEmail: EmailResponse[];
  isSelected: boolean;
  // type: 'receive' | 'send';
  emailCatalog: string;
  onSelect: () => void;
};

const EmailItem: React.FC<Props> = ({
  data,
  emailCatalog,
  // firstEmailContent,
  isSelected,
  // type,
  onSelect,
  // dataEmail,
}) => {
  const { avatar, amount, user_id, user_email, first_name, last_name } = data;

  const fullName = `${last_name} ${first_name}`;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickEmailItem = async (e) => {
    onSelect();
    if (!emailCatalog)
      navigate({
        pathname: `/emails/catalog/${emailCatalog}/${user_id}`,
        search: createSearchParams({
          tab: searchParams.get('tab') || 'me',
        }).toString(),
      });
    else
      navigate({
        pathname: `/emails/catalog/${emailCatalog}/${user_id}`,
        search: createSearchParams({
          tab: searchParams.get('tab') || 'me',
        }).toString(),
      });
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
            src={data.avatar}
            alt={`${data.last_name} ${data.first_name}`}
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
              <span className="font-bold">{fullName}</span> | {user_email}
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
              {/* {firstEmailContent} */}
            </Typography>
          </Box>
        </Box>
      </Box>
      {amount > 0 ? (
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
            fontWeight: 700,
          }}>
          {amount > 9 ? '9+' : amount}
        </Typography>
      ) : (
        ''
      )}
      {/* <Icon className={`${type === 'send' && 'rotate-180'}`} icon="reply" /> */}
    </Box>
  );
};

export default EmailItem;
