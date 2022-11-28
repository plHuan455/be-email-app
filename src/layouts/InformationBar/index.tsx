import InformationDetailBlock, {
  ActivityData,
  ReceiverData,
} from '@components/molecules/InformationDetailBlock';
import { Box, Typography } from '@mui/material';
import avt from '../../../src/assets/images/avatars/avatar-2.jpg';
import React, { useCallback, useState } from 'react';
import { AttachFile, UserRead } from '@components/organisms/EmailMess';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';
import { File } from '@components/organisms/Email/Interface';
import MoreInfomationBar from '@layouts/MoreInformationBar';

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
  const { EmailsList } = useSelector((state: RootState) => state.email);
  const [isShowMoreInformation, setIsShowMoreInformation] = useState<boolean>(false);
  const [typeShowMoreInfomation, setTypeShowMoreInfomation] =
    useState<string>('files');

  const currEmail = EmailsList[0];

  const handleClickShowMore = useCallback(
    (value) => () => {
      setTypeShowMoreInfomation(value);
      setIsShowMoreInformation(true);
    },
    [],
  );

  const handleCloseShowMore = useCallback((e) => {
    setIsShowMoreInformation(false);
  }, []);

  const getReceiverData: () => ReceiverData[] = () => {
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

    return [...mapSendTo, ...mapCc, ...mapBcc];
  };

  const getAllAttachFiles: () => AttachFile[] = () => {
    // const testMap = EmailsList.map((item)=> ...item.attachFiles)

    const attachFiles: AttachFile[] = EmailsList.reduce(
      (cur: AttachFile[], next) => {
        return [...cur, ...next.attachFiles];
      },
      [],
    );

    return attachFiles;
  };
  const checkIsShowMoreReceivers: () => boolean = () =>
    currEmail.sendTo.length > 1 ||
    currEmail.cc.length > 1 ||
    currEmail.bcc.length > 1;

  const receiveData: ReceiverData[] = getReceiverData();
  const allAttachFiles: AttachFile[] = getAllAttachFiles();
  const attachFilesShowMail: AttachFile[] =
    allAttachFiles.length > 2 ? [...allAttachFiles].splice(0, 2) : allAttachFiles;

  const renderMoreInformationContainer = () => {
    switch (typeShowMoreInfomation) {
      case 'files':
        return (
          <InformationDetailBlock
            title="Files"
            isBorderBottom={false}
            filesData={allAttachFiles}
          />
        );

      case 'receiver':
        return (
          <InformationDetailBlock
            title="Receiver"
            isBorderBottom={true}
            receiverData={currEmail.sendTo}
            ccData={currEmail.cc}
            bccData={currEmail.bcc}
            // data={currEmail}
            isShowMore={false}
          />
        );

      default:
        return (
          <InformationDetailBlock
            title="Files"
            isBorderBottom={false}
            filesData={allAttachFiles}
          />
        );
    }
  };

  return (
    <Box
      className="relative"
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
        receiverData={
          currEmail.sendTo.length > 1
            ? [...currEmail.sendTo].splice(0, 1)
            : currEmail.sendTo
        }
        ccData={
          currEmail.cc.length > 1 ? [...currEmail.cc].splice(0, 1) : currEmail.cc
        }
        bccData={
          currEmail.bcc.length > 1 ? [...currEmail.bcc].splice(0, 1) : currEmail.bcc
        }
        // data={currEmail}
        isShowMore={checkIsShowMoreReceivers()}
        onShowMore={handleClickShowMore('receiver')}
      />
      <InformationDetailBlock
        title="Activity"
        isBorderBottom={true}
        activityData={activityData}
      />
      <InformationDetailBlock
        title="Files"
        isBorderBottom={false}
        filesData={attachFilesShowMail}
        isShowMore={allAttachFiles.length > 2}
        onShowMore={handleClickShowMore('files')}
      />
      <MoreInfomationBar
        title="More Information"
        isShow={isShowMoreInformation}
        onClose={handleCloseShowMore}>
        {renderMoreInformationContainer()}
      </MoreInfomationBar>
    </Box>
  );
};

export default InformationBar;
