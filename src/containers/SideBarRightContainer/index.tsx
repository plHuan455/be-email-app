import { UserInfo } from '@components/organisms/Email/Interface';
import InformationBar from '@layouts/InformationBar';
import InformationBarEmpty from '@layouts/InformationBarEmpty';
import { Box, Typography } from '@mui/material';
import { RootState, useAppDispatch } from '@redux/configureStore';
import { changeSidebarRight, openNotifySidebarRight } from '@redux/Global/reducer';
import { rem } from '@utils/functions';
import { isEmpty } from 'lodash';
import React, { PropsWithChildren, useMemo } from 'react';
import { useSelector } from 'react-redux';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import styles from './styles.module.scss';
import dayjs, { Dayjs } from 'dayjs';
import { seenAllNotification, seenNotification, setNotificationList, sortNotification } from '@redux/Notify/reducer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotifications, readAllNotifyService, updateNotify } from '@api/notification';

interface Props {
  isBorderBottom: boolean;
  isShowInformationBtn?: Boolean;
}

const SidebarRightContainer: React.FC<Props> = ({
  isBorderBottom,
  isShowInformationBtn,
}) => {
  const currUserId = localStorage.getItem('current_id');
  const queryClient = useQueryClient();
  // dispatch
  const dispatch = useAppDispatch();

  // useSelector

  const { sidebarRight } = useSelector((state: RootState) => state.global);
  const { notificationList } = useSelector((state: RootState) => state.notify);
  const { isLoading, EmailsList } = useSelector((state: RootState) => state.email);

  const {data: notifyListData, isLoading: isNNotifyLoading} = useQuery({
    queryKey: ['slideBar-right-get-notify', currUserId],
    queryFn: () => getNotifications(Number(currUserId)),
    onSuccess: (res) => {
      if(res.data) {
        dispatch(setNotificationList(res.data.map((value) => ({
          id: value.id,
          body: value.notify_type_id === 1 ? `${value.sender} has sent a new email to ${value.receiver}. ` : '',
          isSeen: value.status === 'read' ? true : false,
          title: value.content?.notify ?? '',
          createdAt: value.created_at
        }))))
      }
    },
    enabled: sidebarRight.type === 'notify' && sidebarRight.isShow && currUserId !== null
  });

  const {mutate: readNotifyMutate, isLoading: isReadNotifyLoading} = useMutation({
    mutationKey: ['sidebar-right-read-notify'],
    mutationFn: async(id: number) => updateNotify({status: 'read'}, id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['slideBar-right-get-notify']})
    }
  })

  const {mutate: readAllNotifyMutate} = useMutation({
    mutationKey: ['sidebar-right-read-notify'],
    mutationFn: () => readAllNotifyService(Number(currUserId)),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['slideBar-right-get-notify']})
    }
  }) 

  const renderTime = (date: Dayjs) => {
    const diffSecond = dayjs().diff(date, 's');

    console.log(diffSecond);
    return date.format('lll')
  }

  const handleNotifyClick = (notifyId: number) => {
    readNotifyMutate(notifyId);
  }

  const handleSeeAllNotify = () => {
    readAllNotifyMutate();
  }

  const _renderNotify = useMemo(() => {
    if (!isEmpty(notificationList))
      return (
        <Box sx={{ maxHeight: 'calc(100% - 24px)', overflow: 'auto', mt: rem(8) }}>
          <Box display="flex" alignItems="center" sx={{py: rem(8)}}>
            <Box display="flex" alignItems="center" sx={{cursor: 'pointer'}} onClick={handleSeeAllNotify}>
              <DoneAllIcon sx={{fontSize: rem(14), color: '#2172f2'}} />
              <Typography variant='body1' sx={{fontSize: rem(14), color: '#2172f2', ml: rem(4), fontWeight: 500}}>Mark as read</Typography>
            </Box>
          </Box>
          {notificationList.map((notify) => (
            <Box
              sx={{ py: rem(8), px: rem(4), borderRadius: rem(12), cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
              display="flex"
              key={notify.id}
              onClick={() => {
                handleNotifyClick(notify.id)
              }}
            >
              <Box sx={{ minWidth: rem(12) }}>
                {!Boolean(notify.isSeen) && <FiberManualRecordIcon sx={{ color: '#2172f2', fontSize: rem(12) }} />}
              </Box>
              <Box sx={{ ml: rem(12), pb: rem(12), borderBottom: '1px solid #DEDEDE', flexGrow: 1 }}>
                <Typography sx={{ color: '#282828', fontSize: rem(14), lineHeight: rem(24), fontWeight: 500 }} variant="body1">
                  {notify.title}
                </Typography>
                <Typography sx={{ color: '#282828', fontSize: rem(12), lineHeight: rem(20), fontWeight: 400 }} variant="body1">
                  {notify.body}
                </Typography>
                <Typography sx={{ color: notify.isSeen ? '#6c6c6c' : '#2172f2', fontSize: rem(12), mt: rem(4) }} variant="body2">
                  {renderTime(dayjs(notify.createdAt))}
                </Typography>
              </Box>
            </Box>
          )
          )}
        </Box>
      )
    return <p>No new announcements</p>;
  }, [notificationList, handleNotifyClick]);

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
  }, [sidebarRight, EmailsList, notificationList]);

  return (
    <Box
      className={`ease-in duration-200 relative bg-white shadow-lg border-l ${sidebarRight.isShow && styles.activeShowMoreInformation
        }`}
      sx={{
        maxWidth: 0,
        width: '100%',
        height: '100vh',
        padding: '30px 0',
        overflowX: 'scroll',
        overflowY: 'hidden',
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
