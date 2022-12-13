import { Avatar, Box, Typography } from '@mui/material';
import avt from '../../../assets/images/avatars/avatar-2.jpg';
import React, { useMemo } from 'react';
// import { AttachFile, UserRead } from '@components/email';
import AttachFiles from '@components/atoms/AttachFiles';
import { AttachFile, UserRead } from '@components/organisms/EmailMess';
import AnimationTimeline from '@components/atoms/AnimationTimeline';
import { isEmpty } from 'lodash';
import { Email, UserInfo } from '@components/organisms/Email/Interface';
import Icon from '@components/atoms/Icon';
import { EmailResponse } from '@api/email';

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
  receiverData?: string[];
  ccData?: string[];
  bccData?: string[];
  activityData?: ActivityData[];
  filesData?: AttachFile[];
  userRead?: UserRead[];
  data?: EmailResponse;
  isShowMore?: boolean;
  onShowMore?: Function;
  isLoading?: boolean;
};

export const TitleOfInformationBlock = (
  title: string,
  isUppercase?: boolean,
  isShowMore?: boolean,
  onShowMore?: Function,
) => {
  return (
    <Typography
      component={'p'}
      sx={{
        position: 'relative',
        fontSize: '15px',
        fontWeight: 'bold',
        color: '#495057',
        marginBottom: '10px',
        textTransform: `${isUppercase ? 'uppercase' : 'none'}`,
      }}>
      {title}
      {isShowMore && (
        <ShowMore
          className="top-1/2 -translate-y-1/2 font-normal"
          handleShowMore={onShowMore ? onShowMore : () => {}}
        />
      )}
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
  isLoading?: boolean;
}

const AvatarIfEmpty: React.FC<PropsAvatarEmpty> = ({
  className,
  isLoading = true,
}) => (
  <Box className={className} sx={{ display: 'flex', alignItems: 'center' }}>
    <Avatar src="" alt="sender avt" sx={{ width: '35px', height: '35px' }} />
    <AnimationTimeline isActiveAnimation={isLoading} className="mx-2 rounded-md " />
  </Box>
);

const ShowMore: React.FC<{
  handleShowMore: Function;
  className?: string;
}> = ({ handleShowMore, className }) => (
  <p
    className={`flex text-[10px] text-[#0F6AF1] absolute top-0 right-0 px-2 hover:cursor-pointer ${className}`}
    onClick={() => handleShowMore(true)}>
    Show More
    <Icon className="px-1" icon="more" width={10} height={10} rawColor="#0F6AF1" />
  </p>
);

const InformationDetailBlock = (props: Props) => {
  const renderReceiver = (item: UserInfo, index: number) => (
    <Box
      key={index}
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
        <Typography component={'p'} sx={{ fontSize: '10px', color: '#999DA0' }}>
          {item.mail}
        </Typography>
      </Box>
    </Box>
  );

  const SenderBlock = useMemo(() => {
    const sender = new UserInfo(
      '',
      props.data?.writer_name || '',
      props.data?.from || '',
    );

    return (
      <Box
        sx={{
          padding: '10px 0',
          borderBottom: `${props.isBorderBottom ? '1px solid #DEDEDE' : 'none'}`,
        }}>
        {TitleOfInformationBlock(props.title)}
        {props.isEmpty ? (
          <AvatarIfEmpty isLoading={props.isLoading} />
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={sender?.avatar}
              alt="sender avt"
              sx={{ width: '35px', height: '35px' }}
            />
            <Box className="flex-1" sx={{ padding: '0 10px' }}>
              {UserName(sender?.name || '')}
              <Typography
                className="truncate w-full"
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
        className="relative"
        sx={{
          padding: '10px 0',
          borderBottom: `${props.isBorderBottom ? '1px solid #DEDEDE' : 'none'}`,
        }}>
        {TitleOfInformationBlock(
          props.title,
          false,
          props.isShowMore,
          props.onShowMore,
        )}
        <Box>
          {props.receiverData &&
            props.receiverData.map((item, index) => {
              return props.isEmpty ? (
                <AvatarIfEmpty isLoading={props.isLoading} className="my-2" />
              ) : (
                renderReceiver(new UserInfo('', item, item), index)
              );
            })}
          {!isEmpty(props.ccData) && (
            <>
              <Typography
                component={'p'}
                sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                CC
              </Typography>
              {props.ccData?.map((item, index) =>
                renderReceiver(new UserInfo('', item, item), index),
              )}
            </>
          )}
          {!isEmpty(props.bccData) && (
            <>
              <Typography
                component={'p'}
                sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                BCC
              </Typography>
              {props.bccData?.map((item, index) =>
                renderReceiver(new UserInfo('', item, item), index),
              )}
            </>
          )}
        </Box>
        {/* {props.receiverData &&
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
          })} */}
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
          <AnimationTimeline
            isActiveAnimation={props.isLoading}
            className="rounded-md h-[80px]"
          />
        )}
      </Box>
    );
  }, [props]);

  const FilesBlock = useMemo(() => {
    return (
      <Box className="relative" sx={{ marginTop: '20px' }}>
        {props.filesData ? (
          <AttachFiles data={props.filesData} />
        ) : (
          <AnimationTimeline
            isActiveAnimation={props.isLoading}
            className="rounded-md h-[120px]"
          />
        )}
        {props.isShowMore && (
          <ShowMore
            handleShowMore={props.onShowMore ? props.onShowMore : () => {}}
          />
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
