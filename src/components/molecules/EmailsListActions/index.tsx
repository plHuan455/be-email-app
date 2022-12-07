import Icon from '@components/atoms/Icon';
import SwitchOnOff from '@components/atoms/SwitchOnOff';
import { Box, IconButton } from '@mui/material';
import React, { useCallback } from 'react';
import SearchStartWithIcon from '../Search';
import { StickyContainer, Sticky } from 'react-sticky';
import { useDispatch, useSelector } from 'react-redux';
import { navigateIsShowEmailInfo, setIsShowEmailInfo } from '@redux/Global/reducer';
import { RootState } from '@redux/configureStore';

interface Props {
  className?: string;
}

const EmailsListActions: React.FC<Props> = ({ className }) => {
  // useDispatch
  const dispatch = useDispatch();

  // useSelector
  const { isShowEmailInfo } = useSelector((state: RootState) => state.global);

  // Handle FNC
  // const handleOnActiveSwitch = useCallback(() => {
  //   dispatch(setIsShowEmailInfo(true));
  // }, []);
  // const handleOnDisableSwitch = useCallback(() => {
  //   dispatch(setIsShowEmailInfo(false));
  // }, []);
  const handleChangeIsShowSideBarState = () => {
    dispatch(navigateIsShowEmailInfo());
  };

  return (
    // <StickyContainer>
    //   <Sticky>
    //     {({ style }) => {
    //       console.log(style);
    //       return (
    <Box
      className={`p-4 flex item-center justify-end gap-4 bg-white rounded-tl-[4rem] z-10 ${className}`}>
      {/* <SearchStartWithIcon /> */}
      {/* <SwitchOnOff
        isChecked={false}
        label=""
        onActive={handleOnActiveSwitch}
        onDisable={handleOnDisableSwitch}
        bgWhenOff={`url('https://cdns.iconmonstr.com/wp-content/releases/preview/7.6.0/240/iconmonstr-sidebar-expand-filled.png')`}
        bgWhenOn={`url('https://cdns.iconmonstr.com/wp-content/releases/preview/7.6.0/240/iconmonstr-sidebar-collapse-filled.png')`}
      /> */}
      <Box>
        <IconButton onClick={handleChangeIsShowSideBarState}>
          <Icon
            icon="sidebar"
            width={24}
            height={24}
            rawColor={isShowEmailInfo ? '#554CFF' : '#999999'}
          />
        </IconButton>
      </Box>
    </Box>
  );
  //     }}
  //   </Sticky>
  // </StickyContainer>
  //   );
};

export default EmailsListActions;
