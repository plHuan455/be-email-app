import { Avatar, Box } from '@mui/material';
import React from 'react';
import Icon from '../Icon';

interface AvatarProps {
  src: string | undefined;
  abbreviations: string;
  className?: string;
  isAdminRole?: boolean;
}

const SingleAvatar: React.FC<AvatarProps> = ({
  src,
  abbreviations,
  className,
  isAdminRole = false,
}) => {
  const checkAvatar = !!src;

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
      children: `${name[0]}`,
    };
  }

  // if (!checkAvatar)
  return (
    <Box className="relative">
      <Avatar
        {...stringAvatar(abbreviations)}
        alt={abbreviations}
        src={src}
        className={`${className} text-[14px]`}
      />
      {isAdminRole && (
        <Icon
          className="absolute bottom-0 right-[10px] p-1 rounded-full translate-x-1/2 translate-y-1/4 bg-[#303541]"
          icon={'crown'}
          rawColor={'#FED654'}
          width={16}
          height={16}
        />
      )}
    </Box>
  );

  // return (
  //   <Box className="relative">
  //     <Avatar alt={abbreviations} src={src} className={className} />
  //     {isAdminRole && (
  //       <Icon
  //         className="absolute bottom-0 right-[10px] p-1 rounded-full translate-x-1/2 translate-y-1/4 bg-[#303541]"
  //         icon={'crown'}
  //         rawColor={'#827CFF'}
  //         width={16}
  //         height={16}
  //       />
  //     )}
  //   </Box>
  // );
};

export default SingleAvatar;
