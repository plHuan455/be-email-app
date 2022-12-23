import { getEmailManagerWithQueryParams } from '@api/email';
import { ButtonBase, Typography } from '@mui/material';
import { setEmailsList } from '@redux/Email/reducer';
import { useMutation } from '@tanstack/react-query';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import ModalEmailList, { StatusOptions } from '../ModalEmailList';

interface Props {
  title: string;
  notiNumber: number;
  catalog: StatusOptions;
  type: string;
  index: number;
  color?: string;
}

const EmailTab: React.FC<Props> = ({
  title,
  notiNumber,
  catalog,
  type,
  index,
  color = '#554CFF',
}) => {
  // useState
  const [modalStatus, setModalStatus] = useState(false);

  // useParams
  const params = useParams();

  // useEffect
  useEffect(() => {
    if (!params.catalog) {
      setModalStatus(false);
      return;
    }

    if (params.catalog.toLowerCase() === catalog.toLocaleLowerCase())
      setModalStatus(true);
  }, [params]);

  // useNavigate
  const navigate = useNavigate();

  // useDispatch
  const dispatch = useDispatch();

  // Handler FUNC
  const handleOpenEmailTab = (e) => {
    navigate(`/emails/catalog/${catalog}`);
  };

  const handleChangeModalStatus = () => {
    setModalStatus(false);
    dispatch(setEmailsList([]));
    navigate('/');
  };

  return (
    <span key={title}>
      <ButtonBase
        // onClick={handleOpenEmailTab}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <NavLink
          className="flex flex-1 items-center justify-between py-1.5 px-1"
          to={`/emails/catalog/${catalog}`}>
          {({ isActive }) => {
            setModalStatus(isActive);
            return (
              <>
                {' '}
                <Typography
                  className="truncate"
                  component={'p'}
                  sx={{ color: color, fontWeight: 'bold' }}>
                  {title}
                </Typography>
                {notiNumber > 0 && (
                  <Typography
                    component={'p'}
                    sx={{
                      backgroundColor: '#ABA8D4',
                      width: '14px',
                      height: '18px',
                      fontSize: '10px',
                      fontWeight: 700,
                      borderRadius: '3px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                    }}>
                    {notiNumber}
                  </Typography>
                )}
              </>
            );
          }}
        </NavLink>
      </ButtonBase>
      <ModalEmailList
        titleColor={color}
        index={index}
        title={title}
        catalog={catalog}
        isActive={modalStatus}
        handleChangeModalStatus={handleChangeModalStatus}
      />
    </span>
  );
};

export default EmailTab;
