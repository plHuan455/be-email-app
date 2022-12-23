import InformationDetailBlock, {
  ActivityData,
  ReceiverData,
} from '@components/molecules/InformationDetailBlock';
import { Box, Typography } from '@mui/material';
import avt from '../../../src/assets/images/avatars/avatar-2.jpg';
import React from 'react';
import { AttachFile, UserRead } from '@components/organisms/EmailMess';
import { UserInfo } from '@components/organisms/Email/Interface';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';

const receiverData: UserInfo[] = [
  new UserInfo(avt, 'asd', 'asd@asd.com'),
  new UserInfo(avt, 'asd', 'asd@asd.com'),
  new UserInfo(avt, 'asd', 'asd@asd.com'),
];

type Props = {
  isBorderBottom: boolean;
  sender: number;
  isLoading?: boolean;
};

const InformationBarEmpty = (props: Props) => {
  return (
    <Box>
      <InformationDetailBlock
        isLoading={props.isLoading}
        title="Manager"
        isBorderBottom={true}
        userId={1}
        isEmpty={true}
      />
      <InformationDetailBlock
        isLoading={props.isLoading}
        title="Sender"
        isBorderBottom={true}
        userId={1}
        isEmpty={true}
      />
      <InformationDetailBlock
        isLoading={props.isLoading}
        title="Receiver"
        isBorderBottom={true}
        isEmpty={true}
        receiverData={receiverData.map((item) => item.mail)}
      />
      <InformationDetailBlock
        isLoading={props.isLoading}
        title="Activity"
        isBorderBottom={true}
        isEmpty={true}
      />
      <InformationDetailBlock
        isLoading={props.isLoading}
        title="Files"
        isBorderBottom={false}
      />
    </Box>
  );
};

export default InformationBarEmpty;
