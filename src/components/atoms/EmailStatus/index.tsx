import { Box } from '@mui/material';
import React from 'react';
import Icon, { SVGIconProps } from '../Icon';

interface IButtonIcon {
  item: SVGIconProps['icon'];
  width?: number;
  height?: number;
  color?: string;
}

const RenderButtonIcon: React.FC<IButtonIcon> = ({
  item,
  width = 20,
  height = 20,
  color,
}) => {
  return (
    <Icon icon={item} width={width} height={height} rawColor={color || 'grey-5'} />
  );
};

const EMAILSTATUS = {
  pending: {
    item: 'pending',
    content: 'Pending',
    bgColor: '#6A98F2',
  },
  cancelled: {
    item: 'close',
    content: 'Canceled',
    bgColor: '#FF4C82',
  },
  approved: {
    item: 'approved',
    content: 'Approved',
    bgColor: '#827CFF',
  },
  sent: {
    item: 'sent',
    content: 'Sent',
    bgColor: '#FF9115',
  },
  seen: {
    item: 'seen',
    content: 'Seen',
    bgColor: '#6FDB80',
  },
  declined: {
    item: 'declined',
    content: 'Declined',
    bgColor: '#FF4C82',
  },
  sending: {
    item: 'sending',
    content: 'Sending',
    time: '13 mins',
    bgColor: '#FFB800',
  },
  reply: {
    item: 'approved',
    content: '',
    bgColor: '#554CFF',
  },
  replyall: {
    item: 'approved',
    content: '',
    bgColor: '#554CFF',
  },
  forward: {
    item: 'approved',
    content: '',
    bgColor: '#554CFF',
  },
  draft: {
    item: 'trash',
    content: 'Draft',
    bgColor: '#554CFF',
  },
};

interface EmailStatusProps {
  emailStatus: string;
  time?: string;
}

const EmailStatus: React.FC<EmailStatusProps> = ({ emailStatus, time }) => {
  const mainEmailStatus = EMAILSTATUS[emailStatus.toLowerCase()];

  if (emailStatus === 'reply' || emailStatus === 'replyAll')
    return (
      <Box
        className={`p-1 text-white rounded-full text-[14px] font-medium flex items-center`}
        sx={{
          backgroundColor: mainEmailStatus.bgColor,
        }}>
        <RenderButtonIcon item={mainEmailStatus.item} width={30} height={30} />
        {/* <span className="inline-block pl-2">{mainEmailStatus.content}</span> */}
      </Box>
    );

  if (emailStatus !== 'sending')
    return (
      <Box
        className={`text-white rounded-full py-1.5 px-3 text-[14px] font-medium flex items-center`}
        sx={{
          backgroundColor: mainEmailStatus.bgColor,
        }}>
        <RenderButtonIcon item={mainEmailStatus.item} color={'#ffffff'} />
        <span className="inline-block pl-2">{mainEmailStatus.content}</span>
      </Box>
    );

  if (time) mainEmailStatus.time = time;

  return (
    <Box
      className={`text-white rounded-full py-1.5 px-3 text-[14px] font-medium flex items-center`}
      sx={{
        background: mainEmailStatus.bgColor,
      }}>
      <RenderButtonIcon item={mainEmailStatus.item} />
      <span className="inline-block pl-2">{`${mainEmailStatus.content} in ${mainEmailStatus.time}`}</span>
    </Box>
  );
};

export default EmailStatus;
