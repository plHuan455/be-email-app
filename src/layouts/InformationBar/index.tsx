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
import { File, UserInfo } from '@components/organisms/Email/Interface';
import MoreInfomationBar from '@layouts/MoreInformationBar';
import styles from './styles.module.scss';

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

  // useSelector
  const { isShowEmailInfo } = useSelector((state: RootState) => state.global);

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

  const getAllAttachFiles: () => AttachFile[] = () => {
    const attachFiles: AttachFile[] = EmailsList.reduce(
      (cur: AttachFile[], next) => {
        if (next.attachFiles) return [...cur, ...next.attachFiles];
        return cur;
      },
      [],
    );

    return attachFiles;
  };
  const checkIsShowMoreReceivers: () => boolean = () =>
    !!currEmail.to || !!currEmail.cc || !!currEmail.bcc;

  // const receiveData: ReceiverData[] = getReceiverData();
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
            receiverData={currEmail.to}
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
      className={`ease-in duration-200 relative bg-white shadow-lg border-l ${
        isShowEmailInfo && styles.activeShowMoreInformation
      }`}
      sx={{
        maxWidth: 0,
        width: '100%',
        height: '100%',
        padding: '30px 0',
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
        receiverData={currEmail.to && [currEmail.to[0]]}
        ccData={currEmail.cc && [currEmail.cc[0]]}
        bccData={currEmail.bcc && [currEmail.bcc[0]]}
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
