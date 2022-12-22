import ModalEmailList, {
  EmailList,
  StatusOptions,
} from '@components/molecules/ModalEmailList';
import { Box, ButtonBase, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

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

  // Handler FNC
  const handleClickPrivateTag = (catalog: string) => (e) => {
    navigate(`/emails/catalog/${catalog.toUpperCase()}`);
  };

  // useParams
  const params = useParams();

  // useEffect
  useEffect(() => {
    if (!params.catalog) return;

    if (params.catalog.toLowerCase() === catalog.toLowerCase()) setModalStatus(true);
  }, [params]);

  return (
    <Box key={index}>
      <ButtonBase
        onClick={handleClickPrivateTag(catalog)}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5px 10px',
        }}>
        <Typography component={'p'} sx={{ color: '#4BAAA2', fontWeight: 'bold' }}>
          {title}
        </Typography>
      </ButtonBase>
      <ModalEmailList
        titleColor={color}
        title={title}
        catalog={catalog}
        isActive={modalStatus}
        handleChangeModalStatus={setModalStatus}
      />
    </Box>
  );
};

export default Hashtag;
