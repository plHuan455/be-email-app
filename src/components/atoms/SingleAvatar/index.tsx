import { Avatar, Box } from '@mui/material';
import React from 'react';

interface AvatarProps {
  src: string | undefined;
  abbreviations: string;
  className?: string;
}

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name}`,
  };
}

const SingleAvatar: React.FC<AvatarProps> = ({ src, abbreviations, className }) => {
  const checkAvatar = !!src;

  if (!checkAvatar)
    return (
      <Box>
        <Avatar
          {...stringAvatar(abbreviations)}
          className={`${className} text-[14px]`}
        />
      </Box>
    );

  return (
    <Box>
      <Avatar alt={abbreviations} src={src} className={className} />
    </Box>
  );
};

export default SingleAvatar;
