import InformationDetailBlock, {
  ActivityData,
  ReceiverData,
} from '@components/molecules/InformationDetailBlock';
import { Box, Typography } from '@mui/material';
import avt from '../../../src/assets/images/avatars/avatar-2.jpg';
import React from 'react';
import { AttachFile, UserRead } from '@components/organisms/EmailMess';
import { UserInfo } from '@components/organisms/Email/Interface';

const receiverData: UserInfo[] = [
  new UserInfo(avt, 'asd', 'asd@asd.com'),
  new UserInfo(avt, 'asd', 'asd@asd.com'),
  new UserInfo(avt, 'asd', 'asd@asd.com'),
];

type Props = {
  title: string;
  isBorderBottom: boolean;
  sender: number;
};

const InformationBarEmpty = (props: Props) => {
  return (
    <Box
      sx={{
        minWidth: 222,
        width: '15%',
        height: '100%',
        padding: '30px 18px',
        overflow: 'scroll',
      }}>
      <Typography
        component={'p'}
        sx={{
          borderBottom: `${props.isBorderBottom ? '1px solid #DEDEDE' : 'none'}`,
          fontSize: '16px',
          color: '#5724C5',
          fontWeight: 'bold',
        }}>
        {props.title}
      </Typography>
      <InformationDetailBlock
        title="Manager"
        isBorderBottom={true}
        userId={1}
        isEmpty={true}
      />
      <InformationDetailBlock
        title="Sender"
        isBorderBottom={true}
        userId={1}
        isEmpty={true}
      />
      <InformationDetailBlock
        title="Receiver"
        isBorderBottom={true}
        isEmpty={true}
        receiverData={receiverData.map((item) => item.mail)}
      />
      <InformationDetailBlock
        title="Activity"
        isBorderBottom={true}
        isEmpty={true}
      />
      <InformationDetailBlock title="Files" isBorderBottom={false} />
    </Box>
  );
};

export default InformationBarEmpty;
