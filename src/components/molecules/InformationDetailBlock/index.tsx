import { Avatar, Box, Typography } from '@mui/material';
import avt from '../../../assets/images/avatars/avatar-2.jpg';
import React, { useMemo } from 'react';
// import { AttachFile, UserRead } from '@components/email';
import AttachFiles from '@components/atoms/AttachFiles';
import { AttachFile, UserRead } from '@components/organisms/EmailMess';
import AnimationTimeline from '@components/atoms/AnimationTimeline';
import { isEmpty } from 'lodash';
import { Email } from '@components/organisms/Email/Interface';

export interface ReceiverData {
  name: string;
  avatar: string;
  position?: string;
  email?: string;
  isCC?: boolean;
  isBCC?: boolean;
}

export interface ActivityData {
  date: string;
  time: string;
  status: string;
  userName: string;
}

type Props = {
  title: string;
  isEmpty?: boolean;
  userId?: number;
  isBorderBottom: boolean;
  receiverData?: ReceiverData[];
  activityData?: ActivityData[];
  filesData?: AttachFile[];
  userRead?: UserRead[];
  data?: Email;
};

export const TitleOfInformationBlock = (title: string, isUppercase?: boolean) => {
  return (
    <Typography
      component={'p'}
      sx={{
        fontSize: '15px',
        fontWeight: 'bold',
        color: '#495057',
        marginBottom: '10px',
        textTransform: `${isUppercase ? 'uppercase' : 'none'}`,
      }}>
      {title}
    </Typography>
  );
};

export const UserName = (title: string) => {
  return (
    <Typography
      component={'p'}
      sx={{
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#495057',
      }}>
      {title}
    </Typography>
  );
};

interface PropsAvatarEmpty {
  className?: string;
}

const AvatarIfEmpty: React.FC<PropsAvatarEmpty> = ({ className }) => (
  <Box className={className} sx={{ display: 'flex', alignItems: 'center' }}>
    <Avatar src="" alt="sender avt" sx={{ width: '35px', height: '35px' }} />
    <Box className="flex-1 overflow-hidden" sx={{ padding: '0 10px' }}>
      <AnimationTimeline className="rounded-md " />
    </Box>
  </Box>
);

const InformationDetailBlock = (props: Props) => {
  const SenderBlock = useMemo(() => {
    const sender = props.data?.sender;

    return (
      <Box
        sx={{
          padding: '10px 0',
          borderBottom: `${props.isBorderBottom ? '1px solid #DEDEDE' : 'none'}`,
        }}>
        {TitleOfInformationBlock(props.title)}
        {props.isEmpty ? (
          <AvatarIfEmpty />
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={sender?.avatar}
              alt="sender avt"
              sx={{ width: '35px', height: '35px' }}
            />
            <Box sx={{ padding: '0 10px' }}>
              {UserName(sender?.name || '')}
              <Typography
                component={'p'}
                sx={{ fontSize: '10px', color: '#999DA0' }}>
                {sender?.mail}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    );
  }, [props]);

  const ReceiverBlock = useMemo(() => {
    return (
      <Box
        sx={{
          padding: '10px 0',
          borderBottom: `${props.isBorderBottom ? '1px solid #DEDEDE' : 'none'}`,
        }}>
        {TitleOfInformationBlock(props.title)}
        {props.receiverData &&
          props.receiverData.map((item, index) => {
            return (
              <Box key={index}>
                {item.isCC && (
                  <Typography
                    component={'p'}
                    sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                    CC
                  </Typography>
                )}
                {item.isBCC && (
                  <Typography
                    component={'p'}
                    sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                    BCC
                  </Typography>
                )}
                {props.isEmpty ? (
                  <AvatarIfEmpty className="my-2" />
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}>
                    <Avatar
                      src={item.avatar}
                      alt={`${item.name} avatar`}
                      sx={{ width: '35px', height: '35px' }}
                    />
                    <Box sx={{ padding: '0 10px' }}>
                      {UserName(item.name)}
                      <Typography
                        component={'p'}
                        sx={{ fontSize: '10px', color: '#999DA0' }}>
                        {item.position ? item.position : item.email}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            );
          })}
      </Box>
    );
  }, [props]);

  const ActivityBlock = useMemo(() => {
    return (
      <Box
        sx={{
          padding: '10px 0',
          borderBottom: `${props.isBorderBottom ? '1px solid #DEDEDE' : 'none'}`,
        }}>
        {TitleOfInformationBlock(props.title)}
        {props.activityData ? (
          props.activityData.map((item, index) => {
            return (
              <Box key={index} sx={{ marginBottom: '10px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Typography
                    component={'p'}
                    sx={{ fontSize: '12px', color: '#959595' }}>
                    {item.status} from
                  </Typography>
                  <Typography
                    component={'p'}
                    sx={{ fontSize: '10px', fontWeight: 'bold', color: '#838383' }}>
                    {item.date}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Typography
                    component={'p'}
                    sx={{ fontSize: '15px', fontWeight: 'bold', color: '#495057' }}>
                    {item.userName}
                  </Typography>
                  <Typography
                    component={'p'}
                    sx={{ fontSize: '10px', color: '#838383' }}>
                    {item.time}
                  </Typography>
                </Box>
              </Box>
            );
          })
        ) : (
          <Box className="h-[100px]">
            <AnimationTimeline className="rounded-md" />
          </Box>
        )}
      </Box>
    );
  }, [props]);

  const FilesBlock = useMemo(() => {
    return (
      <Box sx={{ paddingTop: '20px' }}>
        {props.filesData ? (
          <AttachFiles data={props.filesData} />
        ) : (
          <Box className="h-[80px]">
            <AnimationTimeline className="rounded-md" />
          </Box>
        )}
      </Box>
    );
  }, [props]);

  const RenderBlock = () => {
    switch (props.title) {
      case 'Sender':
        return SenderBlock;
      case 'Receiver':
        return ReceiverBlock;
      case 'Activity':
        return ActivityBlock;
      case 'Files':
        return FilesBlock;

      default:
        return SenderBlock;
    }
  };

  return RenderBlock();
};

export default InformationDetailBlock;
