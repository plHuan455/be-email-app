import EmailStatusHeader from '@components/molecules/EmailStatusHeader';
import ModalEmailList, {
  EmailList,
  StatusOptions,
} from '@components/molecules/ModalEmailList';
import { TabItem } from '@layouts/IconTabs';
import { Avatar, Box, ButtonBase, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import avt from '../../../src/assets/images/avatars/avatar-1.jpg';
import React, { useCallback, useState } from 'react';
import {
  TitleOfInformationBlock,
  UserName,
} from '@components/molecules/InformationDetailBlock';
import './index.scss';
import { useGetEmail } from '@hooks/Email/useGetEmail';
import CustomButton from '@components/atoms/CustomButton';
import Plus from '@assets/icon/Plus';
import { useNavigate } from 'react-router-dom';
import SingleOTPInput from '@components/atoms/Input/PinInput/SingleInput';
import Hashtag from '@components/atoms/Hashtag';
import { toast } from 'react-toastify';

type Props = {};

export interface EmailItem {
  userAvt: string;
  userName: string;
  userEmail: string;
  totalEmail: number;
}

interface EmailTabs extends TabItem {
  status: StatusOptions;
  notiNumber?: number;
  emailData: EmailList[];
}
interface HashtagTabs {
  title: string;
  value: string;
  status: StatusOptions;
  emailData: EmailList[];
}

export const emailData: EmailList[] = [
  {
    userId: 1,
    userAvt: avt,
    userName: 'Maria Ohio',
    userEmail: 'maria.ohio@gmailcom',
    title: 'A collection of textile',
    totalEmail: 12,
    sent: 5,
    received: 4,
  },
  {
    userId: 2,
    userAvt: avt,
    userName: 'Maria Ohio',
    userEmail: 'maria.ohio@gmailcom',
    title: 'A collection of textile',
    totalEmail: 12,
  },
  {
    userId: 3,
    userAvt: avt,
    userName: 'Maria Ohio',
    userEmail: 'maria.ohio@gmailcom',
    title: 'A collection of textile',
    totalEmail: 12,
  },
  {
    userId: 4,
    userAvt: avt,
    userName: 'Maria Ohio',
    userEmail: 'maria.ohio@gmailcom',
    title: 'A collection of textile',
    totalEmail: 12,
  },
];

// const hashtagTabs:

const EmailStatusBar = (props: Props) => {
  const [isCreateHashTag, setIsCreateHashTag] = useState<boolean>(false);
  const [newHashTagValue, setNewHashTagValue] = useState<string>('');
  const [hashtagTabs, setHashtagTabs] = useState<HashtagTabs[]>([
    {
      title: '#metanode',
      value: 'metanode',
      status: 'hashtag',
      emailData: emailData,
    },
    {
      title: '#sales',
      value: 'sales',
      status: 'hashtag',
      emailData: emailData,
    },
    {
      title: '#tesla',
      value: 'tesla',
      status: 'hashtag',
      emailData: emailData,
    },
    {
      title: '#yellow paper',
      value: 'yellowpaper',
      status: 'hashtag',
      emailData: emailData,
    },
  ]);

  const [emailTabs, setEmailTabs] = useState<EmailTabs[]>([
    {
      status: 'pending',
      title: '#pending',
      notiNumber: 0,
      emailData: emailData,
    },
    {
      status: 'approved',
      title: '#approved',
      notiNumber: 0,
      emailData: emailData,
    },
    {
      status: 'cancel',
      title: '#cancel',
      notiNumber: 0,
      emailData: emailData,
    },
  ]);

  const [emailSecTabs, setEmailSecTab] = useState<EmailTabs[]>([
    {
      status: 'draft',
      title: '#draft',
      notiNumber: 0,
      emailData: emailData,
    },
    {
      status: 'trash',
      title: '#trash',
      notiNumber: 0,
      emailData: emailData,
    },
    {
      status: 'blacklist',
      title: '#blacklist',
      notiNumber: 0,
      emailData: emailData,
    },
  ]);

  const handleChangeEmailTabsNotiNumber = useCallback(
    (index, number) => {
      setEmailTabs((prevState) => {
        const cloneState = [...prevState];

        cloneState[index].notiNumber = number;

        return cloneState;
      });
    },
    [emailTabs],
  );
  const handleChangeEmailSecTabsNotiNumber = useCallback(
    (index, number) => {
      setEmailSecTab((prevState) => {
        const cloneState = [...prevState];

        cloneState[index].notiNumber = number;

        return cloneState;
      });
    },
    [emailSecTabs],
  );

  const handleClickCreateHashTag = (e) => {
    setIsCreateHashTag(true);
  };

  const handleCreateHashTag = (e) => {
    if (newHashTagValue === '') {
      return toast.error('Please Enter new hashtag!');
    } else {
      const found = hashtagTabs.find((val) => val.value === newHashTagValue);

      if (found) return toast.error('Hashtag already exist!');

      const newValue: HashtagTabs = {
        title: '#' + newHashTagValue,
        value: newHashTagValue,
        status: 'hashtag',
        emailData: emailData,
      };

      setHashtagTabs((prevState) => [...prevState, newValue]);
      setIsCreateHashTag(false);
      setNewHashTagValue('');
      return toast.success('Create hashtag successful!');
    }
  };

  const handleCancelCreateHashTag = (e) => {
    setNewHashTagValue('');
    setIsCreateHashTag(false);
  };

  const handleChangeHashTagValue = (e) => {
    setNewHashTagValue(e.target.value);
  };

  const CreateHashTag = () => {
    return (
      <Box>
        <SingleOTPInput
          value={newHashTagValue}
          onChange={handleChangeHashTagValue}
          className="rounded w-full outline-none p-2 text-[14px]"
          placeholder="Enter New Hashtag..."
        />
        <Box className="flex mt-3">
          <CustomButton
            className="flex-1 mx-2"
            classNameLabel="py-2"
            onClick={handleCreateHashTag}
            bgButtonColor="#6C64FF"
            color="#ffffff"
            label="Add"
          />
          <CustomButton
            className="flex-1 mx-2"
            classNameLabel="py-2"
            onClick={handleCancelCreateHashTag}
            bgButtonColor="#D3D3D3"
            color="#ffffff"
            label="Cancel"
          />
        </Box>
      </Box>
    );
  };

  const renderEmailTab = (
    title: string,
    notiNumber: number,
    status: StatusOptions,
    key: number,
    type: string,
  ) => {
    const [modalStatus, setModalStatus] = useState(false);

    return (
      <Box key={key}>
        <ButtonBase
          onClick={() => setModalStatus(true)}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '5px 10px',
          }}>
          <Typography component={'p'} sx={{ color: '#554CFF', fontWeight: 'bold' }}>
            {title}
          </Typography>
          {notiNumber > 0 && (
            <Typography
              component={'p'}
              sx={{
                backgroundColor: '#ABA8D4',
                width: '14px',
                height: '18px',
                fontSize: '10px',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}>
              {notiNumber}
            </Typography>
          )}
        </ButtonBase>
        <ModalEmailList
          index={key}
          title={title}
          status={status}
          // emailData={email}
          isActive={modalStatus}
          handleChangeModalStatus={setModalStatus}
          handleChangeEmailTabNotiNumber={
            type === 'emailTabs'
              ? handleChangeEmailTabsNotiNumber
              : handleChangeEmailSecTabsNotiNumber
          }
        />
      </Box>
    );
  };

  return (
    <Box
      sx={{
        height: '100%',
        minWidth: '290px',
        width: '15%',
        padding: '24px',
        overflowX: 'hidden',
        overflowY: 'scroll',
      }}>
      <EmailStatusHeader
        title="Email"
        color="#827CFF"
        bgButtonColor="#554CFF"
        isComposeButton={true}
        isSearch={true}
      />
      <Box
        sx={{
          paddingBottom: '10px',
          position: 'relative',
        }}>
        <Box sx={{ borderBottom: '1px solid #e5e7eb' }}>
          {emailTabs &&
            emailTabs.map((item, index) => {
              if (item.title && item.notiNumber != undefined) {
                return renderEmailTab(
                  item.title,
                  item.notiNumber,
                  item.status,
                  index,
                  'emailTabs',
                );
              }
            })}
        </Box>
        <Box sx={{ borderBottom: '1px solid #e5e7eb' }}>
          {emailSecTabs &&
            emailSecTabs.map((item, index) => {
              if (item.title && item.notiNumber != undefined) {
                return renderEmailTab(
                  item.title,
                  item.notiNumber,
                  item.status,
                  index,
                  'emailTabsSec',
                );
              }
            })}
        </Box>
        {hashtagTabs &&
          hashtagTabs.map((item, index) => {
            return (
              <Hashtag
                title={item.title}
                status={item.status}
                // emailData={item.emailData}
                index={index}
              />
            );
          })}
      </Box>
      {!isCreateHashTag ? (
        <CustomButton
          onClick={handleClickCreateHashTag}
          label="Create hashtag"
          bgButtonColor="#554CFF"
          color="#fff"
          isAfterIcon={true}
          isFullWidth
          isHasSlash={true}
          afterIcon={<Plus width={10} height={10} color={'#fff'} />}
        />
      ) : (
        CreateHashTag()
      )}
    </Box>
  );
};

export default EmailStatusBar;
