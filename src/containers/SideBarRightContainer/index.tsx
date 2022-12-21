import { UserInfo } from '@components/organisms/Email/Interface';
import InformationBar from '@layouts/InformationBar';
import InformationBarEmpty from '@layouts/InformationBarEmpty';
import { Box, Typography } from '@mui/material';
import { RootState } from '@redux/configureStore';
import { isEmpty } from 'lodash';
import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

import styles from './styles.module.scss';

interface Props {
  isBorderBottom: boolean;
  title: 'Notify' | 'Information';
}

const SidebarRightContainer: React.FC<Props> = ({ isBorderBottom, title }) => {
  // useSelector

  const { sidebarRight } = useSelector((state: RootState) => state.global);
  const { isLoading, EmailsList } = useSelector((state: RootState) => state.email);

  return (
    <Box
      className={`ease-in duration-200 relative bg-white shadow-lg border-l ${
        sidebarRight.isShow && styles.activeShowMoreInformation
      }`}
      sx={{
        maxWidth: 0,
        width: '100%',
        height: '100vh',
        padding: '30px 0',
        overflowX: 'scroll',
      }}>
      <Typography
        component={'p'}
        sx={{
          borderBottom: `${isBorderBottom ? '1px solid #DEDEDE' : 'none'}`,
          fontSize: '16px',
          color: '#5724C5',
          fontWeight: 'bold',
        }}>
        {title}
      </Typography>
      {!isEmpty(EmailsList) ? (
        <InformationBar title={title} sender={1} isBorderBottom={isBorderBottom} />
      ) : (
        <InformationBarEmpty
          sender={1}
          isBorderBottom={isBorderBottom}
          isLoading={isLoading}
        />
      )}
    </Box>
  );
};

export default SidebarRightContainer;
