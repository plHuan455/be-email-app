import Icon, { ICON, SVGIconProps } from '@components/atoms/Icon';
import { Box } from '@mui/material';
import React from 'react';

interface EmailActionIcon {
  item: SVGIconProps['icon'];
  width?: number;
  height?: number;
  color?: string;
}

const RenderButtonIcon: React.FC<EmailActionIcon> = ({
  item,
  width = 20,
  height = 20,
  color,
}) => {
  return <Icon icon={item} width={width} height={height} color={color} />;
};

interface EmailActionItem {
  icon: string;
  label: string;
  color: string;
}

const EmailActionsList: EmailActionItem[] = [
  {
    icon: 'reply',
    label: 'Reply',
    color: '#8E8E91',
  },
  {
    icon: 'replyAll',
    label: 'Reply All',
    color: '#8E8E91',
  },
  {
    icon: 'forward',
    label: 'Forward',
    color: '#8E8E91',
  },
  {
    icon: 'delete',
    label: 'Delete',
    color: '#EDEDF3',
  },
  {
    icon: 'spam',
    label: 'Spam',
    color: '#E3A054',
  },
  {
    icon: 'unread',
    label: 'Unread',
    color: '#8E8E91',
  },
];

const EmailActions = () => {
  return (
    <Box>
      {EmailActionsList.map((val, index) => (
        <Box
          className={`absolute top-0 right-0 -translate-x-1/2 translate-y-3 text-white rounded-full py-1.5 px-3 text-[14px] font-medium flex items-center`}
          key={index}>
          <RenderButtonIcon item={ICON[val.icon]} color={val.color} />
          <span className="inline-block pl-2">{`${val.label}`}</span>
        </Box>
      ))}
    </Box>
  );
};

export default EmailActions;
