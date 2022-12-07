import Icon from '@components/atoms/Icon';
import SwitchOnOff from '@components/atoms/SwitchOnOff';
import { Box } from '@mui/material';
import React, { useCallback } from 'react';
import SearchStartWithIcon from '../Search';
import { StickyContainer, Sticky } from 'react-sticky';
import { useDispatch, useSelector } from 'react-redux';
import { setIsShowEmailInfo } from '@redux/Global/reducer';
import { RootState } from '@redux/configureStore';

interface Props {
  className?: string;
}

const EmailsListActions: React.FC<Props> = ({ className }) => {
  // useDispatch
  const dispatch = useDispatch();

  // Handle FNC
  const handleOnActiveSwitch = useCallback(() => {
    dispatch(setIsShowEmailInfo(true));
  }, []);
  const handleOnDisableSwitch = useCallback(() => {
    dispatch(setIsShowEmailInfo(false));
  }, []);

  return (
    // <StickyContainer>
    //   <Sticky>
    //     {({ style }) => {
    //       console.log(style);
    //       return (
    <Box
      className={`p-6 flex item-center justify-end gap-4 bg-white rounded-br-xl rounded-tl-[4rem] z-10 ${className}`}>
      <SearchStartWithIcon />
      <SwitchOnOff
        isChecked={false}
        label=""
        onActive={handleOnActiveSwitch}
        onDisable={handleOnDisableSwitch}
        bgWhenOff={`url('https://cdns.iconmonstr.com/wp-content/releases/preview/7.6.0/240/iconmonstr-sidebar-expand-filled.png')`}
        bgWhenOn={`url('https://cdns.iconmonstr.com/wp-content/releases/preview/7.6.0/240/iconmonstr-sidebar-collapse-filled.png')`}
      />
    </Box>
  );
  //     }}
  //   </Sticky>
  // </StickyContainer>
  //   );
};

export default EmailsListActions;
