import { Box } from '@mui/material';
import React from 'react';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const AnimationTimeline: React.FC<Props> = ({ className }) => {
  return (
    <Box className={`w-full h-full ${styles.timelineWrapper} ${className}`}>
      time line
    </Box>
  );
};

export default AnimationTimeline;
