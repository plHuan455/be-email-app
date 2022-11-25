import React from 'react';

import styles from './styles.module.scss';

type Props = {
  className?: string,
};

const AnimationTimeline = (props: Props) => {
  return (
    <span className={styles.timelineWrapper + ' ' + props.className}>time line</span>
  );
};

export default AnimationTimeline;
