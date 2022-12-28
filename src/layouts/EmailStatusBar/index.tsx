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
import {
  EmailTagsResponse,
  getAllCatalogTab,
  getAllEmailStatus,
  getAllEmailTag,
} from '@api/email';
import EmailTab from '@components/molecules/EmailTab';
import { HashtagTabs, setPrivateHashtag } from '@redux/Email/reducer';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';

type Props = {};

export interface EmailItem {
  userAvt: string;
  userName: string;
  userEmail: string;
  totalEmail: number;
}

interface EmailTabs extends TabItem {
  status: StatusOptions;
  emailData: EmailList[];
  notiNumber?: number;
  color?: string;
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

const EmailTabsData: EmailTabs[] = [
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
    status: 'declined',
    title: '#declined',
    notiNumber: 0,
    emailData: emailData,
  },
];
const EmailTabsSecData: EmailTabs[] = [
  {
    status: 'important',
    title: '#important',
    notiNumber: 0,
    emailData: emailData,
    color: '#f44336',
  },
  {
    status: 'sent',
    title: '#sent',
    notiNumber: 0,
    emailData: emailData,
    color: '#f9a825',
  },
  {
    status: 'draft',
    title: '#draft',
    notiNumber: 0,
    emailData: emailData,
    color: '#607d8b',
  },
  {
    status: 'trash',
    title: '#trash',
    notiNumber: 0,
    emailData: emailData,
    color: '#ff6d00',
  },
  {
    status: 'spam',
    title: '#spam',
    notiNumber: 0,
    emailData: emailData,
    color: '#dd2c00',
  },
];

// const hashtagTabs:

const EmailStatusBar = (props: Props) => {
  const [isCreateHashTag, setIsCreateHashTag] = useState<boolean>(false);
  const [newHashTagValue, setNewHashTagValue] = useState<string>('');
  const [hashtagTabs, setHashtagTabs] = useState<HashtagTabs[]>(() => {
    return JSON.parse(localStorage.getItem('private_hashtag') ?? JSON.stringify([]));
  });

  const [emailTabs, setEmailTabs] = useState<EmailTabs[]>(EmailTabsData);

  const [emailSecTabs, setEmailSecTab] = useState<EmailTabs[]>(EmailTabsSecData);

  // useDispatch
  const dispatch = useDispatch();

  // useSelector
  const { notificationList } = useSelector((state: RootState) => state.notify);

  // useQuery

  const queryClient = useQueryClient();

  useQuery({
    queryKey: ['get-all-email-status'],
    queryFn: getAllCatalogTab,
    onSuccess(res) {
      if (!isEmpty(res.data)) {
        const privHashTagData = res.data.splice(7).map<HashtagTabs>((hashTag) => ({
          title: `#${hashTag.value}`,
          value: hashTag.value,
          status: 'hashtag',
          notiNumber: hashTag.amount,
          color: '#4BAAA2',
        }));

        setHashtagTabs(privHashTagData);
        localStorage.setItem('private_hashtag', JSON.stringify(privHashTagData));
        dispatch(setPrivateHashtag(privHashTagData));

        setEmailTabs((prevState) => {
          const data: EmailTabs[] = prevState.reduce(
            (currVal: EmailTabs[], nextVal) => {
              const foundInRes = res.data.find(
                (item) => item.value.toLowerCase() === nextVal.status,
              );

              if (foundInRes)
                return [...currVal, { ...nextVal, notiNumber: foundInRes.amount }];
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
                (item) => item.value.toLowerCase() === nextVal.status,
              );

              if (foundInRes)
                return [...currVal, { ...nextVal, notiNumber: foundInRes.amount }];
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

  useEffect(() => {
    if (!isEmpty(notificationList))
      queryClient.invalidateQueries({ queryKey: ['get-all-email-status'] });
  }, [notificationList]);

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
        color: '#4BAAA2',
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
                  catalog={item.status}
                  title={item.title}
                  type={emailTabType}
                  color={item.color ?? '#554CFF'}
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
                color={item.color}
                title={item.title}
                catalog={item.value}
                status={item.status}
                // emailData={item.emailData}
                index={index}
              />
            );
          })}
        {/* {!isCreateHashTag ? (
          <CustomButton
            className="m-2"
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
        )} */}
      </Box>
    );
  }, [hashtagTabs]);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        padding: '24px',
        overflowX: 'hidden',
        overflowY: 'scroll',
        // borderRight: '1px solid #e5e7eb',
      }}>
      <EmailStatusHeader
        title="Email"
        buttonTitle="Compose"
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
