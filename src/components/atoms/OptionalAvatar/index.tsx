import React from 'react';
import { Avatar, Box } from '@mui/material';
import { UserInfo } from '@components/organisms/Email/Interface';
import dayjs from 'dayjs';

interface Props {
  data: UserInfo;
  optionDate: string;
  size?: number;
  className?: string;
  isShowAvatar?: boolean;
  isShowContent?: boolean;
  isShowName?: boolean;
  isShowDate?: boolean;
  isShowMail?: boolean;
}

const OptionalAvatar: React.FC<Props> = ({
  data,
  className,
  isShowAvatar = true,
  isShowContent = true,
  isShowName = true,
  isShowDate = true,
  isShowMail = true,
  optionDate,
  size = 26,
}) => {
  const day = dayjs(optionDate).format('MMMM D, HH:mm');

  return (
    <Box className={`flex items-center pb-3 ${className && className}`}>
      {isShowAvatar && (
        <Avatar
          alt={data.name}
          src={data.avatar}
          sx={{ width: size, height: size }}
        />
      )}
      {isShowContent && (
        <>
          {isShowName && (
            <h3 className="px-3 font-semibold text-[#495057] text-[16px]">
              {data.name}
            </h3>
          )}
          {isShowMail && <p className="font-normal text-[14px]">{data.mail}</p>}
          {isShowDate && <p className="px-2 font-normal text-[14px]">{`${day}`}</p>}
        </>
      )}
    </Box>
  );
};

export default OptionalAvatar;
