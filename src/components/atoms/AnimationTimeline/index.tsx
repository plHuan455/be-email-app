import { Box } from '@mui/material';
import React from 'react';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  isActiveAnimation?: boolean;
};

const AnimationTimeline: React.FC<Props> = ({
  className,
  isActiveAnimation = true,
}) => {
  return (
    <Box
      className={`w-full h-full ${styles.timelineWrapper} ${className} ${
        isActiveAnimation && styles.animationActive
      }`}>
      time line
    </Box>
  );
};

export default AnimationTimeline;
