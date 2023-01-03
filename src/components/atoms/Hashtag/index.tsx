import { ButtonBase, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Icon from '../Icon';

interface Props {
  NAV_LINK_TO: string;
  title: string;
  catalog: string;
  notiNumber: number;
  isHover: boolean;

  setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;

  onClickHashTag: (e: any) => Promise<void>;
  onDeleteHashTag: (e: any) => void;
}

const Hashtag: React.FC<Props> = ({
  NAV_LINK_TO,
  title,
  catalog,
  notiNumber,
  isHover,

  setIsHover,
  setModalStatus,

  onClickHashTag,
  onDeleteHashTag,
}) => {
  // useParams
  const params = useParams();

  // useEffect
  useEffect(() => {
    if (!params.catalog) return;

    if (params.catalog.toLowerCase() === catalog.toLowerCase()) setModalStatus(true);
  }, [params]);

  return (
    <ButtonBase
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 4px',
        position: 'relative',
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <NavLink
        to={NAV_LINK_TO}
        className="w-full flex-1 flex justify-between "
        onClick={onClickHashTag}>
        {({ isActive }) => {
          setModalStatus(isActive);
          return (
            <>
              <Typography
                className="truncate flex items-center"
                component={'p'}
                sx={{ color: '#4BAAA2', fontWeight: 'bold' }}>
                {title}
              </Typography>
              {notiNumber > 0 && !isHover && (
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
      {isHover && (
        <Icon
          className="absolute top-1/2 right-0 -translate-y-1/2 z-4 px-2"
          onClick={onDeleteHashTag}
          icon="close"
        />
      )}
    </ButtonBase>
  );
};

export default Hashtag;
