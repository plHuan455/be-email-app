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

export type ActionNameTypes = 'reply' | 'replyAll' | 'forward' | 'delete' | 'spam' | 'unread' | 'star';

type ActionItemTypes = {
  [key in ActionNameTypes]?: {
    icon: string;
    label: string;
    color: string;
  } 
}

export type ActionListTypes = {
  [key in ActionNameTypes]?: 0 | 1 | boolean;
} | true

const EmailActionLists: ActionItemTypes = {
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
}

interface Props {
  isImportant: boolean;
  isActiveClick: boolean;
  hiddenActions?: ActionListTypes;
  type: 'receive' | 'send';
  emailId?: number;
  handleChangeStatus?: (status, id) => void;
  emailIndex?: number;
  onActionClick?: (action: ActionNameTypes) => void;
}

const EmailActions: React.FC<Props> = ({
  emailId = 0,
  type,
  hiddenActions = {},
  handleChangeStatus = (a, b) => {},
  isImportant = false,
  isActiveClick = true,
  onActionClick,
}) => {
  return (
    <Box className={`flex mb-4 ${type === 'send' && 'flex-row-reverse'}`}>
      {Boolean(hiddenActions !== true) && Object.keys(EmailActionLists).map(
        (key, index) => {
          const currVal = EmailActionLists[key];

          if(hiddenActions[key]) return null;
          return (
            <Box
              className={`py-1.5 px-3 text-[14px] font-medium flex items-center hover:bg-slate-200 hover:cursor-pointer rounded p-2`}
              key={index}
              onClick={() =>{
                isActiveClick && handleChangeStatus(currVal.icon, emailId)
                onActionClick && onActionClick(key as ActionNameTypes)
              }}>
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
