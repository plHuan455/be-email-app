import React from 'react';
import avatarImg from '@assets/images/avatars/avatar-2.jpg';
import { Avatar, Box } from '@mui/material';

interface senderData {
  avatar: string;
  name: string;
  mail: string;
  date: string;
}

const newSenderData: senderData = {
  avatar: avatarImg,
  name: 'Elon Musk',
  mail: 'elon.musk@tesla.com',
  date: '2018-02-21 12:01:00',
};

function Sender() {
  const date = new Date(newSenderData.date);
  const month = date.toLocaleString('default', {
    month: 'long',
  });
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const check2Digit = (time) => ('0' + time).slice(-2);

  return (
    <Box className="flex items-center pb-3">
      <Avatar alt={newSenderData.name} src={newSenderData.avatar} />
      <h3 className="px-3 font-semibold text-[#495057] text-[16px]">
        {newSenderData.name}
      </h3>
      <p className="font-normal text-[14px]">{newSenderData.mail}</p>
      <p className="pl-2 font-normal text-[14px]">{`${month} ${check2Digit(
        day,
      )} ${check2Digit(hour)}:${check2Digit(minute)}`}</p>
    </Box>
  );
}

export default Sender;
