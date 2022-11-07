import React from 'react';
import { Box, Icon, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

interface CardStatProps {
  title: string;
  stat: number;
  percent: number;
  isGrowth?: boolean;
}

const useStyles = makeStyles()((theme) => ({
  root: {
    borderRadius: theme.spacing(5),
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  title: {
    color: theme.palette.color.grey[5],
    fontWeight: 700,
  },
  stat: {},
  icon: {
    width: '50px',
    height: '50px',
    backgroundColor: 'blue',
    borderRadius: theme.spacing(4),
  },
}));

const CardStat: React.FC<CardStatProps> = ({ title, stat, percent, isGrowth }) => {
  const { classes, cx } = useStyles();
  return (
    <Box className={cx(classes.root)}>
      <Box>
        <Typography variant="h5" className={cx(classes.title)}>
          {title}
        </Typography>
        <Typography
          variant="h5"
          sx={(theme) => ({ fontWeight: 700, marginTop: theme.spacing(4) })}>
          +{stat}
        </Typography>
        <Typography
          variant="body1"
          component={'span'}
          sx={(theme) => ({
            fontWeight: 600,
            marginTop: theme.spacing(1),
            color: isGrowth ? theme.palette.success.main : 'red',
          })}>
          {percent}%
        </Typography>
        <Typography
          variant="body1"
          component={'span'}
          sx={(theme) => ({
            fontWeight: 600,
            marginLeft: theme.spacing(2),
            color: theme.palette.color.grey[5],
          })}>
          than yesterday
        </Typography>
      </Box>
      <Box className={cx(classes.icon)}>
        <Icon />
      </Box>
    </Box>
  );
};

export default CardStat;
