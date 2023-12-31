import Icon from '@components/atoms/Icon';
import SwitchOnOff from '@components/atoms/SwitchOnOff';
import { Badge, Box, IconButton } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import SearchStartWithIcon from '../Search';
import { StickyContainer, Sticky } from 'react-sticky';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';
import {
  closeInformationSidebarRight,
  closeNotifySidebarRight,
  openInformationSidebarRight,
  openNotifySidebarRight,
} from '@redux/Global/reducer';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useLocation } from 'react-router-dom';

interface Props {
  className?: string;
  isShowInformationBtn?: Boolean;
}

const EmailsListActions: React.FC<Props> = ({ className, isShowInformationBtn }) => {
  // useDispatch
  const dispatch = useDispatch();

  const { notificationList } = useSelector((state: RootState) => state.notify);

  // useSelector
  const { sidebarRight } = useSelector((state: RootState) => state.global);
  const handleChangeIsShowSideBarState = () => {
    if (!sidebarRight.isShow) dispatch(openInformationSidebarRight());
    else {
      if (sidebarRight.type === 'notify') {
        dispatch(closeNotifySidebarRight());
        dispatch(openInformationSidebarRight());
      } else dispatch(closeInformationSidebarRight());
    }
  };
  const handleChangeIsShowNotifySideBarState = () => {
    if (!sidebarRight.isShow) dispatch(openNotifySidebarRight());
    else {
      if (sidebarRight.type === 'information') {
        dispatch(closeInformationSidebarRight());
        dispatch(openNotifySidebarRight());
      } else {
        dispatch(closeNotifySidebarRight());
      }
    }
  };

  const unReadNotificationCount = useMemo(() => {
    return notificationList.reduce(
      (count, value) => (value.isSeen ? count : count + 1),
      0,
    );
  }, [notificationList]);

  return (
    <Box
      className={`p-4 flex item-center justify-end gap-4 bg-white rounded-tl-[4rem] z-10 ${className}`}>
      <Box>
        <SearchStartWithIcon onSearch={() => {}} />
      </Box>
      {isShowInformationBtn && (
        <Box>
          <IconButton onClick={handleChangeIsShowSideBarState}>
            <Icon
              icon="sidebar"
              width={24}
              height={24}
              rawColor={
                sidebarRight.isShow && sidebarRight.type === 'information'
                  ? '#554CFF'
                  : '#999999'
              }
            />
          </IconButton>
        </Box>
      )}
      <Box>
        <Badge badgeContent={unReadNotificationCount} color="error">
          <IconButton onClick={handleChangeIsShowNotifySideBarState}>
            <NotificationsActiveIcon
              sx={{
                color:
                  sidebarRight.isShow && sidebarRight.type === 'notify'
                    ? '#554CFF'
                    : '#999999',
              }}
            />
          </IconButton>
        </Badge>
      </Box>
    </Box>
  );
};

export default EmailsListActions;
