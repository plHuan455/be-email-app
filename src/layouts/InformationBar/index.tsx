import InformationDetailBlock, {
  ActivityData,
  ReceiverData,
} from '@components/molecules/InformationDetailBlock';
import { Box, Typography } from '@mui/material';
import avt from '../../../src/assets/images/avatars/avatar-2.jpg';
import React, { useCallback, useState } from 'react';
import {
  AttachFile,
  attachsToAttachFiles,
  UserRead,
} from '@components/organisms/EmailMess';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';
import { File, UserInfo } from '@components/organisms/Email/Interface';
import MoreInfomationBar from '@layouts/MoreInformationBar';
import styles from './styles.module.scss';
import { attachs } from '@api/email';

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
  const { sidebarRight } = useSelector((state: RootState) => state.global);

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
    const attachs: attachs[] = EmailsList.reduce((cur: attachs[], next) => {
      if (next.email.attachs) return [...cur, ...next.email.attachs];
      return cur;
    }, []);

    return attachsToAttachFiles(attachs);
  };
  const checkIsShowMoreReceivers: () => boolean = () =>
    !!currEmail.email.to || !!currEmail.email.cc || !!currEmail.email.bcc;

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
            receiverData={currEmail.email.to}
            ccData={currEmail.email.cc}
            bccData={currEmail.email.bcc}
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
    <Box>
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
        receiverData={currEmail.email.to && [currEmail.email.to[0]]}
        ccData={currEmail.email.cc && [currEmail.email.cc[0]]}
        bccData={currEmail.email.bcc && [currEmail.email.bcc[0]]}
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
