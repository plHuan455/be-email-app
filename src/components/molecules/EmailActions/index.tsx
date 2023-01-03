import Icon, { ICON, SVGIconProps } from '@components/atoms/Icon';
import { Box } from '@mui/material';
import React from 'react';
import { number } from 'yup/lib/locale';

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

const EmailActionsListSender = {
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
  star: {
    icon: 'star',
    label: 'Important',
    color: '#8E8E91',
  },
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
  star: {
    icon: 'star',
    label: 'Important',
    color: '#8E8E91',
  },
};

interface Props {
  isImportant: boolean;
  isActiveClick: boolean;
  type: 'receive' | 'send';
  emailIndex?: number;
  handleChangeStatus?: (status, index) => void;
}

const EmailActions: React.FC<Props> = ({
  emailIndex = 0,
  type,
  handleChangeStatus = (a, b) => {},
  isImportant = false,
  isActiveClick = true,
}) => {
  return (
    <Box className={`flex mb-4 ${type === 'send' && 'flex-row-reverse'}`}>
      {Object.keys(type === 'send' ? EmailActionsListSender : EmailActionsList).map(
        (key, index) => {
          const currVal = (
            type === 'send' ? EmailActionsListSender : EmailActionsList
          )[key];

          return (
            <Box
              className={`py-1.5 px-3 text-[14px] font-medium flex items-center hover:bg-slate-200 hover:cursor-pointer rounded p-2`}
              key={index}
              onClick={() =>
                isActiveClick && handleChangeStatus(currVal.icon, emailIndex)
              }>
              <RenderButtonIcon
                item={currVal.icon}
                color={
                  currVal.icon === 'star' && isImportant
                    ? 'rgb(250, 175, 0)'
                    : currVal.color
                }
              />
              <span className="inline-block pl-2">{`${currVal.label}`}</span>
            </Box>
          );
        },
      )}
    </Box>
  );
};

export default EmailActions;
