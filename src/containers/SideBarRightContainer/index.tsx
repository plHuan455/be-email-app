import { UserInfo } from '@components/organisms/Email/Interface';
import InformationBar from '@layouts/InformationBar';
import InformationBarEmpty from '@layouts/InformationBarEmpty';
import { Box, Typography } from '@mui/material';
import { RootState } from '@redux/configureStore';
import { isEmpty } from 'lodash';
import React, { PropsWithChildren, useMemo } from 'react';
import { useSelector } from 'react-redux';

import styles from './styles.module.scss';

interface Props {
  isBorderBottom: boolean;
}

const SidebarRightContainer: React.FC<Props> = ({ isBorderBottom }) => {
  // useSelector

  const { sidebarRight } = useSelector((state: RootState) => state.global);
  const { notificationList } = useSelector((state: RootState) => state.notify);
  const { isLoading, EmailsList } = useSelector((state: RootState) => state.email);

  const _renderNotify = useMemo(() => {
    if (!isEmpty(notificationList))
      return notificationList.map((notify) => <p>{notify.body}</p>);

    return <p>No new announcements</p>;
  }, [notificationList]);

  const _renderEmailsInformation = useMemo(() => {
    if (!isEmpty(EmailsList))
      return (
        <InformationBar
          title={sidebarRight.title}
          sender={1}
          isBorderBottom={isBorderBottom}
        />
      );
    return (
      <InformationBarEmpty
        sender={1}
        isBorderBottom={isBorderBottom}
        isLoading={isLoading}
      />
    );
  }, [EmailsList]);

  const _renderSidebarRight = useMemo(() => {
    switch (sidebarRight.type) {
      case 'information':
        return _renderEmailsInformation;

      case 'notify':
        return _renderNotify;

      default:
        return _renderEmailsInformation;
    }
  }, [sidebarRight]);

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
        {sidebarRight.title}
      </Typography>
      {_renderSidebarRight}
    </Box>
  );
};

export default SidebarRightContainer;
