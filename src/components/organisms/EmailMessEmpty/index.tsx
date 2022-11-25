import { Avatar, Box, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './styles.module.scss';
import AttachFiles from '@components/atoms/AttachFiles';
import EmailStatus from '@components/atoms/EmailStatus';
import OptionalAvatar from '@components/atoms/OptionalAvatar';

import EmailActions from '@components/molecules/EmailActions';
import { useMemo } from 'react';
import EmailForward from '../EmailForward';
import { UserInfo } from '../Email/Interface';
import AnimationTimeline from '@components/atoms/AnimationTimeline';
export interface UserRead {
  name: string;
  time: string;
}
export interface AttachFile {
  type: string;
  name: string;
  url: string;
  userRead?: UserRead[];
}

function EmailMessEmpty() {
  return (
    <Box className={`w-full relative flex flex-wrap`}>
      <Box className={`w-full flex flex-wrap`}>
        {/* <Box className="w-[5%]"></Box> */}
        <Box className={`flex-1`}>
          <OptionalAvatar
            data={new UserInfo('', 'user', 'user@bemail.com')}
            isShowAvatar={true}
            optionDate={new Date() + ''}
          />
        </Box>
        <Box className="w-full flex">
          {/* <Box className="w-[5%]"></Box> */}
          <Box className="flex-1">
            <EmailActions isActiveClick={false} />
          </Box>
        </Box>
      </Box>

      {/* <Box className="w-[10%] flex justify-center">
        <Avatar alt={''} src={''} />
      </Box> */}
      <Box
        sx={{ boxShadow: '0px 10px 23px -15px rgba(159,159,159,0.54)' }}
        className={`flex-1 bg-white rounded-tr-[36px] rounded-bl-[36px] pb-4 ${styles.emailWrap} mb-8`}>
        {/* Header */}
        <Box
          className={`cursor-pointer pb-6 bg-violet-200 py-4 rounded-bl-[36px] rounded-tr-[36px] relative`}>
          <h1 className="text-stone-700 font-bold text-base mb-2 h-[38px] rounded-lg overflow-hidden">
            <AnimationTimeline />
          </h1>
          {/* Email Send To */}
          <Box className="w-[80%] h-[28px] rounded-lg overflow-hidden">
            <AnimationTimeline />
          </Box>
          {/* <EmailStatus emailStatus={'pending'} /> */}
        </Box>
        {/* Email Content */}
        <Box className="py-9">
          <Box className="w-full h-[160px] rounded-xl overflow-hidden">
            <AnimationTimeline />
          </Box>
          <Box>
            <h3 className="my-4 font-semibold">Files</h3>
            <Box className="w-full h-[120px] rounded-xl overflow-hidden">
              <AnimationTimeline />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default EmailMessEmpty;
