import { Box } from '@mui/material';
import React from 'react';
import Icon, { SVGIconProps } from '../Icon';

interface IButtonIcon {
  item: SVGIconProps['icon'];
  width?: number;
  height?: number;
}

const RenderButtonIcon: React.FC<IButtonIcon> = ({
  item,
  width = 20,
  height = 20,
}) => {
  return <Icon icon={item} width={width} height={height} color={'grey-5'} />;
};

const EMAILSTATUS = {
  pending: {
    item: 'pending',
    content: 'Pending',
    color: '#6A98F2',
  },
  approved: {
    item: 'approved',
    content: 'Approved',
    color: '#827CFF',
  },
  sent: {
    item: 'sent',
    content: 'Sent',
    color: '#FF9115',
  },
  seen: {
    item: 'seen',
    content: 'Seen',
    color: '#6FDB80',
  },
  declined: {
    item: 'declined',
    content: 'Declined',
    color: '#FF4C82',
  },
  sending: {
    item: 'sending',
    content: 'Sending',
    time: '13 mins',
    color: '#FFB800',
  },
};

interface EmailStatusProps {
  emailStatus: string;
  time?: string;
}

const EmailStatus: React.FC<EmailStatusProps> = ({ emailStatus, time }) => {
  const mainEmailStatus = EMAILSTATUS[emailStatus];

  if (emailStatus !== 'sending')
    return (
      <Box
        className={`absolute top-0 right-0 -translate-x-1/2 translate-y-3 text-white rounded-full py-1.5 px-3 text-[14px] font-medium flex items-center`}
        sx={{
          background: mainEmailStatus.color,
        }}>
        <RenderButtonIcon item={mainEmailStatus.item} />
        <span className="inline-block pl-2">{mainEmailStatus.content}</span>
      </Box>
    );

  if (time) mainEmailStatus.time = time;

  return (
    <Box
      className={`absolute top-0 right-0 -translate-x-1/2 translate-y-3 text-white rounded-full py-1.5 px-3 text-[14px] font-medium flex items-center`}
      sx={{
        background: mainEmailStatus.color,
      }}>
      <RenderButtonIcon item={mainEmailStatus.item} />
      <span className="inline-block pl-2">{`${mainEmailStatus.content} in ${mainEmailStatus.time}`}</span>
    </Box>
  );
};

export default EmailStatus;
