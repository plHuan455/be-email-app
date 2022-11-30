import { UserName } from '@components/molecules/InformationDetailBlock';
import { Avatar, Box, Typography } from '@mui/material';
import avt from '../../../assets/images/avatars/avatar-1.jpg';
import React from 'react';
import { EmailList } from '@components/molecules/ModalEmailList';
import './index.scss';
import { EmailResponse, getEmailWithQueryParam } from '@api/email';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetEmail } from '@hooks/Email/useGetEmail';
import { setEmailsList } from '@redux/Email/reducer';

type Props = {
  emailData: {
    data: EmailResponse[];
    total: number;
  };
};

const EmailItem = ({ emailData }: Props) => {
  const { data, total } = emailData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickEmailItem = async (e) => {
    navigate(`/emails/${data[0].status}/${data[0].from}`);
    // const emailData = await getEmailWithQueryParam({
    //   status: data[0].status,
    //   mail: data[0].from,
    // });
    // console.log(`line 28`, emailData);
    // dispatch(setEmailsList(emailData.data));
  };

  return (
    <Box
      className="email__item"
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
              <span className="font-bold">{data[0].writer_name}</span> |{' '}
              {data[0].from}
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
              {data[0].content}
            </Typography>
          </Box>
        </Box>
      </Box>
      {total > 0 ? (
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
          {total > 9 ? '9+' : total}
        </Typography>
      ) : (
        ''
      )}
    </Box>
  );
};

export default EmailItem;
