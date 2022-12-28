import ModalEmailList, {
  EmailList,
  StatusOptions,
} from '@components/molecules/ModalEmailList';
import { Box, ButtonBase, Typography } from '@mui/material';
import { setEmailsList } from '@redux/Email/reducer';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

interface Props {
  title: string;
  status: StatusOptions;
  catalog: string;
  color: string;
  index: number;
}

const Hashtag: React.FC<Props> = ({
  title,
  status,
  index,
  catalog,
  color = '#4BAAA2',
}) => {
  const [modalStatus, setModalStatus] = useState(false);

  // useNavigate
  const navigate = useNavigate();

  // useDispatch
  const dispatch = useDispatch();

  // Handler FNC
  const handleClickPrivateTag = (catalog: string) => (e) => {
    navigate(`/emails/catalog/${catalog}`);
  };

  // useParams
  const params = useParams();

  // useEffect
  useEffect(() => {
    if (!params.catalog) return;

    if (params.catalog.toLowerCase() === catalog.toLowerCase()) setModalStatus(true);
  }, [params]);

  const handleChangeModalStatus = () => {
    // setModalStatus(false);
    dispatch(setEmailsList([]));
    navigate('/');
  };

  return (
    <Box key={index}>
      <ButtonBase
        // onClick={handleClickPrivateTag(catalog)}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5px 4px',
        }}>
        <NavLink to={`/emails/catalog/${catalog}`}>
          {({ isActive }) => {
            setModalStatus(isActive);
            return (
              <Typography
                className="truncate"
                component={'p'}
                sx={{ color: '#4BAAA2', fontWeight: 'bold' }}>
                {title}
              </Typography>
            );
          }}
        </NavLink>
      </ButtonBase>
      <ModalEmailList
        titleColor={color}
        title={title}
        catalog={catalog}
        isActive={modalStatus}
        handleChangeModalStatus={handleChangeModalStatus}
      />
    </Box>
  );
};

export default Hashtag;
