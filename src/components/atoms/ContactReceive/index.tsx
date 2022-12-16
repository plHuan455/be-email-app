import { RenderButtonIcon } from '@components/molecules/EmailActions';
import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import SingleAvatar from '../SingleAvatar';

interface Props {
  contactName: string;
  onDelete?: React.MouseEventHandler | undefined;
  haveCloseIcon?: boolean;
}

const ContactReceive: React.FC<Props> = ({
  contactName,
  onDelete,
  haveCloseIcon = true,
}) => {
  return (
    <Box className="flex">
      {/* Main Content */}
      <Box className="flex bg-[#F6F5FE] relative p-2 py-1 rounded-xl mx-1 w-full gap-2">
        <Avatar alt={contactName} className="w-6 h-6" src={`${contactName}`} />
        <p className="flex-1 text-[14px] text-ellipsis overflow-hidden">
          {contactName}
        </p>
        {haveCloseIcon && (
          <RenderButtonIcon
            item={'close'}
            onClick={onDelete}
            className="hover:cursor-pointer"
          />
        )}
      </Box>
    </Box>
  );
};

export default ContactReceive;
