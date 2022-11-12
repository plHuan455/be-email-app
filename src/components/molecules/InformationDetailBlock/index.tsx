import { Avatar, Box, Typography } from '@mui/material';
import avt from '../../../assets/images/avatars/avatar-2.jpg';
import React, { useMemo } from 'react';
import { AttachFile, renderAttachFiles, UserRead } from '@components/email';

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
  userId?: number;
  isBorderBottom: boolean;
  receiverData?: ReceiverData[];
  activityData?: ActivityData[];
  filesData?: AttachFile[];
  userRead?: UserRead[];
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

const InformationDetailBlock = (props: Props) => {
  const SenderBlock = useMemo(() => {
    return (
      <Box
        sx={{
          padding: '10px 0',
          borderBottom: `${props.isBorderBottom ? '1px solid #DEDEDE' : 'none'}`,
        }}>
        {TitleOfInformationBlock(props.title)}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={avt}
            alt="sender avt"
            sx={{ width: '35px', height: '35px' }}
          />
          <Box sx={{ padding: '0 10px' }}>
            {UserName('Elon Musk')}
            <Typography component={'p'} sx={{ fontSize: '10px', color: '#999DA0' }}>
              elon.musk@tesla.com
            </Typography>
          </Box>
        </Box>
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
          props.receiverData.map((item) => {
            return (
              <Box>
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
        {props.activityData &&
          props.activityData.map((item) => {
            return (
              <Box sx={{ marginBottom: '10px' }}>
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
          })}
      </Box>
    );
  }, [props]);

  const FilesBlock = useMemo(() => {
    return (
      <Box sx={{ paddingTop: '20px' }}>
        {props.filesData && renderAttachFiles(props.filesData, props?.userRead)}
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
