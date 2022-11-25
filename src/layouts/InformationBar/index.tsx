import InformationDetailBlock, {
  ActivityData,
  ReceiverData,
} from '@components/molecules/InformationDetailBlock';
import { Box, Typography } from '@mui/material';
import avt from '../../../src/assets/images/avatars/avatar-2.jpg';
import React from 'react';
import { AttachFile, UserRead } from '@components/organisms/EmailMess';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';

const userReadList: UserRead[] = [
  {
    name: 'Elon Musk',
    time: '3 hours ago',
  },
  {
    name: 'Bill Gates MicroHusf',
    time: '8 hours ago',
  },
];

const files: AttachFile[] = [
  {
    name: 'Metanode - White Paper v.1.5.2',
    type: 'pdf',
    url: 'meta.node/9YQC7us',
    userRead: userReadList,
  },
  {
    name: 'Metanode - SDK Bundle',
    type: 'zip',
    url: 'meta.node/34ED7uc',
  },
];

const receiverData: ReceiverData[] = [
  {
    name: 'Maria Ohio',
    avatar: avt,
    position: 'Marketing Department',
  },
  {
    name: 'Maria Ohio',
    avatar: avt,
    email: 'cenawwe@tesla.com',
    isCC: true,
  },
  {
    name: 'Maria Ohio',
    avatar: avt,
    position: 'Metanode X Lab',
    isBCC: true,
  },
];

const activityData: ActivityData[] = [
  {
    userName: 'Metanode Lab',
    status: 'Declined',
    date: 'July 4,22',
    time: '09:30',
  },
  {
    userName: 'Elon Musk',
    status: 'Received',
    date: 'July 4,22',
    time: '08:30',
  },
];
export interface Receiver {
  id: number;
}

type Props = {
  title: string;
  isBorderBottom: boolean;
  sender: number;
};

const InformationBar = (props: Props) => {
  const { focusEmail, EmailsList } = useSelector((state: RootState) => state.email);

  const currEmail = EmailsList[focusEmail];

  const mapSendTo: ReceiverData[] =
    currEmail.sendTo &&
    currEmail.sendTo.map((item) => ({
      name: item.name,
      avatar: item.avatar,
      position: 'Marketing Department',
    }));
  const mapCc: ReceiverData[] =
    currEmail.cc &&
    currEmail.cc.map((item) => ({
      name: item.name,
      avatar: item.avatar,
      email: item.mail,
      isCC: true,
    }));
  const mapBcc: ReceiverData[] =
    currEmail.bcc &&
    currEmail.bcc.map((item) => ({
      name: item.name,
      avatar: item.avatar,
      position: 'Metanode X Lab',
      isBCC: true,
    }));

  const receiveData: ReceiverData[] = [...mapSendTo, ...mapCc, ...mapBcc];

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
        data={currEmail}
      />
      <InformationDetailBlock
        title="Sender"
        isBorderBottom={true}
        data={currEmail}
      />
      <InformationDetailBlock
        title="Receiver"
        isBorderBottom={true}
        receiverData={receiveData}
        data={currEmail}
      />
      <InformationDetailBlock
        title="Activity"
        isBorderBottom={true}
        activityData={activityData}
      />
      <InformationDetailBlock
        title="Files"
        isBorderBottom={false}
        filesData={currEmail.attachFiles}
      />
    </Box>
  );
};

export default InformationBar;
