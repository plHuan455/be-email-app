import { Box } from '@mui/material';
import React from 'react';

interface Props {
  title?: string;
  emailTitle?: string;
  writer?: string;
}

const AlertWithEmailAction: React.FC<Props> = ({
  title = 'Are you sure want to approve this mail?',
  emailTitle,
  writer,
}) => {
  return (
    <Box>
      <h3 className="font-semibold text-[18px] text-center">{title}</h3>
      <Box className="mt-2 px-2">
        <p className="py-1 flex items-center">
          <b className="min-w-[60px] inline-block">Title:</b>
          <span className="truncate">{emailTitle ?? 'Empty'}</span>
        </p>
        <p className="py-1 flex items-center">
          <b className="min-w-[60px] inline-block">Writer:</b>
          <span>{writer ?? 'No one'}</span>
        </p>
      </Box>
    </Box>
  );
};

export default AlertWithEmailAction;
