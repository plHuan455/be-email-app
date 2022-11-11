import Icon, { ICON, SVGIconProps } from '@components/atoms/Icon';
import { Box } from '@mui/material';
import React from 'react';

interface EmailActionIcon {
  item: SVGIconProps['icon'];
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  onClick?: React.MouseEventHandler | undefined;
}

export const RenderButtonIcon: React.FC<EmailActionIcon> = ({
  item,
  width = 20,
  height = 20,
  color,
  className,
  onClick = () => {},
}) => {
  return (
    <Icon
      icon={item}
      width={width}
      height={height}
      rawColor={color}
      className={className}
      onClick={onClick}
    />
  );
};

const EmailActionsList = {
  reply: {
    icon: 'reply',
    label: 'Reply',
    color: '#8E8E91',
  },
  replyAll: {
    icon: 'replyAll',
    label: 'Reply All',
    color: '#8E8E91',
  },
  forward: {
    icon: 'forward',
    label: 'Forward',
    color: '#8E8E91',
  },
  delete: {
    icon: 'delete',
    label: 'Delete',
    color: '#D0676C',
  },
  spam: {
    icon: 'spam',
    label: 'Spam',
    color: '#E3A054',
  },
  unread: {
    icon: 'unread',
    label: 'Unread',
    color: '#8E8E91',
  },
};

const EmailActions = () => {
  return (
    <Box className="flex mb-4">
      {Object.keys(EmailActionsList).map((key, index) => {
        const currVal = EmailActionsList[key];

        return (
          <Box
            className={`py-1.5 px-3 text-[14px] font-medium flex items-center`}
            key={index}>
            <RenderButtonIcon item={currVal.icon} color={currVal.color} />
            <span className="inline-block pl-2">{`${currVal.label}`}</span>
          </Box>
        );
      })}
    </Box>
  );
};

export default EmailActions;
