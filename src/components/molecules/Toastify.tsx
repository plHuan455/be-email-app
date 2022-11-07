import Icon, { TSVGIcon } from '@components/atoms/Icon';
import React from 'react';
import { ToastContainer, toast, TypeOptions, IconProps } from 'react-toastify';

const AUTO_CLOSE = 5000;
const TOAST_POSITION = toast.POSITION.BOTTOM_RIGHT;
const LIMIT = 1;

const THEME_COLOR: Partial<{ [key in TypeOptions]: TBgColor }> = {
  warning: 'bg-orange-1',
  error: 'bg-pink-1',
  success: 'bg-green-1',
  default: 'bg-transparent',
};

const returnIconPropsToastify = (type: IconProps['type']) => {
  return {
    icon: type === 'error' || type === 'warning' ? 'exclamation' : 'check',
    width: type === 'success' ? 10 : 14,
    height: type === 'success' ? 10 : 14,
  };
};

const Toastify = () => {
  return (
    <ToastContainer
      position={TOAST_POSITION}
      autoClose={AUTO_CLOSE}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      //
      // limit={LIMIT}
      draggableDirection={'y'}
      draggablePercent={60}
      bodyClassName={'font-quicksand'}
      closeButton={false}
      icon={ToastifyIcon}
      toastClassName={'bg-app-2' as TBgColor}
      progressClassName={'bg-purple-linear' as TBgColor}
      theme="light"
    />
  );
};

const ToastifyIcon: React.FC<IconProps> = ({ type }) => {
  return (
    // <Box
    //   className={classNames(
    //     THEME_COLOR[type] || THEME_COLOR['default'],
    //     'rounded-full w-5 h-5 flex flex-none justify-center items-center',
    //   )}>
    <Icon
      icon={returnIconPropsToastify(type).icon as TSVGIcon}
      color={'white'}
      width={returnIconPropsToastify(type).width}
      height={returnIconPropsToastify(type).height}
    />
    // </Box>
  );
};

export default React.memo(Toastify);
