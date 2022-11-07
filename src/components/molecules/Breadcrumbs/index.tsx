import React from 'react';
import { Breadcrumbs as BreadcrumbsBase, Typography } from '@mui/material';
import { To, useNavigate } from 'react-router-dom';
import { BreadcrumbsStateProps } from '@redux/Breadcrumbs/reducer';
import { makeStyles } from 'tss-react/mui';

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbsStateProps[];
}

const useStyles = makeStyles()((theme) => ({
  active: {
    fontWeight: 700,
  },
  hasLink: {
    cursor: 'pointer',
    ':hover': { textDecoration: 'underline' },
  },
}));

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();

  const onNavigate = (to: To) => {
    return () => {
      to && navigate(to);
    };
  };

  return (
    <BreadcrumbsBase aria-label="breadcrumb" sx={{ paddingY: 5 }}>
      {breadcrumbs.map((breadcrumb, index) => {
        if (index === breadcrumbs.length - 1) {
          return (
            <Typography key={index.toString()}>{breadcrumb.displayName}</Typography>
          );
        }
        return (
          <Typography
            key={index.toString()}
            className={cx(classes.active, breadcrumb.to && classes.hasLink)}
            onClick={onNavigate(breadcrumb.to)}>
            {breadcrumb.displayName}
          </Typography>
        );
      })}
    </BreadcrumbsBase>
  );
};

export default Breadcrumbs;
