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

interface Props {
  isLoading?: boolean;
}

const EmailMessEmpty: React.FC<Props> = ({ isLoading = false }) => {
  return (
    <Box className={`w-full relative flex flex-wrap`}>
      <Box className={`w-full flex flex-wrap`}>
        {/* <Box className="w-[5%]"></Box> */}
        {/* <Box className={`flex-1`}>
          <OptionalAvatar
            data={
              new UserInfo(
                '',
                '.........................................',
                '.........................................',
              )
            }
            isShowAvatar={true}
            optionDate={new Date() + ''}
          />
        </Box> */}
        <Box className="w-full flex">
          {/* <Box className="w-[5%]"></Box> */}
          <Box className="flex-1">
            <EmailActions isActiveClick={false} />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{ boxShadow: '0px 10px 23px -15px rgba(159,159,159,0.54)' }}
        className={`flex-1 bg-white rounded-tr-[36px] rounded-bl-[36px] pb-4 ${styles.emailWrap} mb-8`}>
        {/* Header */}
        <Box
          className={`cursor-pointer pb-6 bg-violet-200 py-4 rounded-bl-[36px] rounded-tr-[36px] relative`}>
          <AnimationTimeline
            isActiveAnimation={isLoading}
            className="rounded-md my-2 h-[28px]"
          />
          {/* Email Send To */}
          <AnimationTimeline
            isActiveAnimation={isLoading}
            className="rounded-md my-2 h-[28px]"
          />
          {/* <EmailStatus emailStatus={'pending'} /> */}
        </Box>
        {/* Email Content */}
        <Box className="py-9">
          <AnimationTimeline
            isActiveAnimation={isLoading}
            className="rounded-md h-[200px]"
          />
          <Box>
            <h3 className="my-4 font-semibold">Files</h3>
            <AnimationTimeline
              isActiveAnimation={isLoading}
              className="rounded-md h-[120px]"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EmailMessEmpty;
