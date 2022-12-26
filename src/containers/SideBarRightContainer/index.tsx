import { UserInfo } from '@components/organisms/Email/Interface';
import InformationBar from '@layouts/InformationBar';
import InformationBarEmpty from '@layouts/InformationBarEmpty';
import { Box, Typography } from '@mui/material';
import { RootState } from '@redux/configureStore';
import { changeSidebarRight, openNotifySidebarRight } from '@redux/Global/reducer';
import { isEmpty } from 'lodash';
import React, { PropsWithChildren, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.scss';

interface Props {
  isBorderBottom: boolean;
  isShowInformationBtn?: Boolean;
}

const SidebarRightContainer: React.FC<Props> = ({
  isBorderBottom,
  isShowInformationBtn,
}) => {
  // dispatch
  const dispatch = useDispatch();

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
  }, [EmailsList, sidebarRight, isBorderBottom, isLoading]);

  const _renderSidebarRight = useMemo(() => {
    switch (sidebarRight.type) {
      case 'information': {
        if (isShowInformationBtn) return _renderEmailsInformation;
        dispatch(changeSidebarRight('notify'));
        return null;
      }
      case 'notify':
        return _renderNotify;

      default:
        return _renderEmailsInformation;
    }
  }, [sidebarRight, EmailsList]);

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