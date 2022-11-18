import { RenderButtonIcon } from '@components/molecules/EmailActions';
import { UserInfo } from '@components/organisms/Email/Interface';
import { Box } from '@mui/material';
import React from 'react';
import SingleAvatar from '../SingleAvatar';

// interface UserInfo {
//   avatar: string | undefined;
//   mail: string;
//   abbreviations: string;
// }

interface ReceiverProps {
  data: UserInfo;
  onDelete?: React.MouseEventHandler | undefined;
  haveCloseIcon?: boolean;
}

const Receiver: React.FC<ReceiverProps> = ({
  data,
  onDelete,
  haveCloseIcon = true,
}) => {
  const { avatar, mail } = data;

  return (
    <Box className="flex">
      {/* Main Content */}
      <Box className="flex bg-[#F6F5FE] relative pl-7 p-2 py-1 rounded-xl mx-1">
        <SingleAvatar
          src={avatar}
          abbreviations={data.getAbbreviations()}
          className="w-6 h-6 absolute inset-y-2/4 left-0 -translate-y-1/2"
        />
        <p className="text-[14px]">{mail}</p>
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

export default Receiver;
