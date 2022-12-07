import EmailsListActions from '@components/molecules/EmailsListActions';
import { Box } from '@mui/material';
import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';

interface Props {
  className?: string;
}

const EmailsListActionsContainer: React.FC<Props> = ({ className }) => {
  return (
    <Box
      className={`absolute top-0 left-0 w-full overflow-hidden z-10 ${className}`}>
      <EmailsListActions />
    </Box>
  );
};

export default EmailsListActionsContainer;
