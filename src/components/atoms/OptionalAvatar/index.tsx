import React from 'react';
import { Avatar, Box } from '@mui/material';
import { UserInfo } from '@components/email/Interface';

interface Props {
  data: UserInfo;
  className?: string;
  isShowAvatar?: boolean;
  isShowContent?: boolean;
  isShowName?: boolean;
  isShowDate?: boolean;
  isShowMail?: boolean;
  optionDate: string;
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
}) => {
  const date = new Date(optionDate);
  const month = date.toLocaleString('default', {
    month: 'long',
  });
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const check2Digit = (time) => ('0' + time).slice(-2);

  return (
    <Box className={`flex items-center pb-3 ${className && className}`}>
      {isShowAvatar && <Avatar alt={data.name} src={data.avatar} />}
      {isShowContent && (
        <>
          {isShowName && (
            <h3 className="px-3 font-semibold text-[#495057] text-[16px]">
              {data.name}
            </h3>
          )}
          {isShowMail && <p className="font-normal text-[14px]">{data.mail}</p>}
          {isShowDate && (
            <p className="px-2 font-normal text-[14px]">{`${month} ${check2Digit(
              day,
            )} ${check2Digit(hour)}:${check2Digit(minute)}`}</p>
          )}
        </>
      )}
    </Box>
  );
};

export default OptionalAvatar;
