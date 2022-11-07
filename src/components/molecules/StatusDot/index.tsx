import React from 'react';
import Icon from '@components/atoms/Icon';

export interface StatusDotProps {
  height?: number;
  status: 'success' | 'warning' | 'error';
  className?: GlobalTailWindClassName | string;
}

const StatusDot: React.FC<StatusDotProps> = ({ status, className }) => {
  const dotStatus: string = React.useMemo(() => {
    switch (status) {
      case 'success':
        return '#23D840';
      case 'error':
        return '#FF4081';
      case 'warning':
        return '#EAC54F';
      default:
        return '#23D840';
    }
  }, [status]);

  return <Icon className={className} icon="dot" color={dotStatus} />;
};

StatusDot.defaultProps = {};

export default StatusDot;
