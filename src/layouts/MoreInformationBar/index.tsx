import ArrowLeft from '@assets/icon/ArrowLeft';
import Icon from '@components/atoms/Icon';
import { Box, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

import styles from './styles.module.scss';

export interface Props extends React.PropsWithChildren {
  title: string;
  isBorderBottom?: boolean;
  isShow?: boolean;
  onClose?: React.MouseEventHandler<HTMLParagraphElement> | undefined;
  children?: ReactNode;
}

const MoreInfomationBar: React.FC<Props> = ({
  title,
  isBorderBottom = true,
  isShow = false,
  onClose = (e) => {},
  children,
}) => {
  return (
    <Box
      className={`${
        styles.moreInfomationBar
      } absolute top-0 left-0 w-full h-full translate-x-full opacity-0 invisible ${
        isShow && styles.show
      }`}
      sx={{
        padding: '30px 18px',
        overflow: 'scroll',
      }}>
      <Typography
        component={'p'}
        className="flex items-center cursor-pointer gap-2"
        sx={{
          borderBottom: `${isBorderBottom ? '1px solid #DEDEDE' : 'none'}`,
          fontSize: '16px',
          color: '#5724C5',
          fontWeight: 'bold',
        }}
        onClick={onClose}>
        <ArrowLeft
          className="cursor-pointer"
          width={12}
          height={12}
          color="#554CFF"
        />
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default MoreInfomationBar;
