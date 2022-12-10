import EmailStatusHeader from '@components/molecules/EmailStatusHeader';
import ModalEmailList, {
  EmailList,
  StatusOptions,
} from '@components/molecules/ModalEmailList';
import { TabItem } from '@layouts/IconTabs';
import { Avatar, Box, ButtonBase, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import avt from '../../../src/assets/images/avatars/avatar-1.jpg';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { EmailTagsResponse, getAllEmailStatus, getAllEmailTag } from '@api/email';
import EmailTab from '@components/molecules/EmailTab';
import { HashtagTabs } from '@redux/Email/reducer';
import { useQuery } from '@tanstack/react-query';

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
  const [hashtagTabs, setHashtagTabs] = useState<HashtagTabs[]>(() => {
    return JSON.parse(localStorage.getItem('private_hashtag') ?? JSON.stringify([]));
  });

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
      status: 'spam',
      title: '#spam',
      notiNumber: 0,
      emailData: emailData,
    },
  ]);

  // useQuery

  useQuery({
    queryKey: ['get-all-email-status'],
    queryFn: getAllEmailStatus,
    onSuccess(res) {
      if (res.data) {
        setEmailTabs((prevState) => {
          const data: EmailTabs[] = prevState.reduce(
            (currVal: EmailTabs[], nextVal) => {
              const foundInRes = res.data.find(
                (item) => item.tag.toLowerCase() === nextVal.status,
              );

              if (foundInRes)
                return [...currVal, { ...nextVal, notiNumber: foundInRes.count }];
              return [...currVal, nextVal];
            },
            [],
          );

          return data;
        });
        setEmailSecTab((prevState) => {
          const data: EmailTabs[] = prevState.reduce(
            (currVal: EmailTabs[], nextVal) => {
              const foundInRes = res.data.find(
                (item) => item.tag === nextVal.status,
              );

              if (foundInRes)
                return [...currVal, { ...nextVal, notiNumber: foundInRes.count }];
              return [...currVal, nextVal];
            },
            [],
          );

          return data;
        });
      }
    },
    onError(err) {
      console.log(err);
    },
  });

  useQuery({
    queryKey: ['get-all-email-tag'],
    queryFn: getAllEmailTag,
    onSuccess(res) {
      const privHashTagData = res.data.map<HashtagTabs>((hashTag) => ({
        title: `#${hashTag.tag}`,
        value: hashTag.tag,
        status: 'hashtag',
        notiNumber: hashTag.count,
      }));

      setHashtagTabs(privHashTagData);
      localStorage.setItem('private_hashtag', JSON.stringify(privHashTagData));
    },
    onError(err) {
      console.log(err);
    },
  });

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
        notiNumber: 0,
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

  // render FNC
  const _renderEmailTags = (emailTagList: EmailTabs[], emailTabType: string) => {
    return (
      <Box sx={{ borderBottom: '1px solid #e5e7eb' }}>
        {emailTagList &&
          emailTagList.map((item, index) => {
            if (item.title) {
              // return <span key={index}>{item.title}</span>;
              return (
                <EmailTab
                  index={index}
                  key={index}
                  notiNumber={item.notiNumber ? item.notiNumber : 0}
                  status={item.status}
                  title={item.title}
                  type={emailTabType}
                />
              );
            }
          })}
      </Box>
    );
  };

  const _renderPrivateHashtag = useMemo(() => {
    return (
      <Box>
        {hashtagTabs &&
          hashtagTabs.map((item, index) => {
            return (
              <Hashtag
                title={item.title}
                value={item.value}
                status={item.status}
                // emailData={item.emailData}
                index={index}
              />
            );
          })}
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
  }, [hashtagTabs]);

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
        {_renderEmailTags(emailTabs, 'emailTabs')}
        {_renderEmailTags(emailSecTabs, 'emailSecTabs')}
        {_renderPrivateHashtag}
      </Box>
    </Box>
  );
};

export default EmailStatusBar;
