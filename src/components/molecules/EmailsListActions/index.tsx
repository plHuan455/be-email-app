import Icon from '@components/atoms/Icon';
import SwitchOnOff from '@components/atoms/SwitchOnOff';
import { Box, IconButton } from '@mui/material';
import React, { useCallback } from 'react';
import SearchStartWithIcon from '../Search';
import { StickyContainer, Sticky } from 'react-sticky';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';
import EmailNotify from '../EmailNotify';
import {
  closeInformationSidebarRight,
  openInformationSidebarRight,
} from '@redux/Global/reducer';

interface Props {
  className?: string;
}

const EmailsListActions: React.FC<Props> = ({ className }) => {
  // useDispatch
  const dispatch = useDispatch();

  // useSelector
  const { sidebarRight } = useSelector((state: RootState) => state.global);
  const handleChangeIsShowSideBarState = () => {
    if (sidebarRight.isShow) dispatch(closeInformationSidebarRight());
    else dispatch(openInformationSidebarRight());
  };

  return (
    <Box
      className={`p-4 flex item-center justify-end gap-4 bg-white rounded-tl-[4rem] z-10 ${className}`}>
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
      <EmailNotify navigateNotify={handleChangeIsShowSideBarState} />
    </Box>
  );
};

export default EmailsListActions;
