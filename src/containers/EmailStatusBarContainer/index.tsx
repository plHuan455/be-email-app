import { useTranslation } from '@@packages/localization/src';
import { getAllCatalogTab } from '@api/email';
import { searchCatalog } from '@api/public';
import { EmailList } from '@components/molecules/ModalEmailList';
import useWebsocket from '@hooks/useWebsocket';
import EmailStatusBar, { EmailTabs } from '@layouts/EmailStatusBar';
import { RootState } from '@redux/configureStore';
import { HashtagTabs, setHashtags, setPrivateHashtag } from '@redux/Email/reducer';
import { setSearchCatalogValue } from '@redux/Global/reducer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// img

export const emailData: EmailList[] = [
  {
    userId: 1,
    userAvt: '',
    userName: 'Maria Ohio',
    userEmail: 'maria.ohio@gmailcom',
    title: 'A collection of textile',
    totalEmail: 12,
    sent: 5,
    received: 4,
  },
  {
    userId: 2,
    userAvt: '',
    userName: 'Maria Ohio',
    userEmail: 'maria.ohio@gmailcom',
    title: 'A collection of textile',
    totalEmail: 12,
  },
  {
    userId: 3,
    userAvt: '',
    userName: 'Maria Ohio',
    userEmail: 'maria.ohio@gmailcom',
    title: 'A collection of textile',
    totalEmail: 12,
  },
  {
    userId: 4,
    userAvt: '',
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

const EmailStatusBarContainer = () => {
  const queryClient = useQueryClient();
  // useState
  const [hashtagEditingIndex, setHashtagEditingIndex] = useState<number>(-1);
  const [emailTabs, setEmailTabs] = useState<EmailTabs[]>(EmailTabsData);
  const [emailSecTabs, setEmailSecTab] = useState<EmailTabs[]>(EmailTabsSecData);
  const [searchSize, setSearchSize] = useState<number>(1);

  //   useDispatch
  const dispatch = useDispatch();

  // useSelector
  const { searchCatalogValue } = useSelector((state: RootState) => state.global);

  // useQuery

  useWebsocket({
    onOpen: () => {
      console.log('Websocket open EmailStatusBar');
    },
    onMessage: (data) => {
      if(!data.change) return;
      console.log('Websocket message EmailStatusBarContainer', data);
      queryClient.invalidateQueries({ queryKey: ['get-all-email-status'] });
    },
    onClose: () => {
      console.log('Websocket close EmailStatusBarContainer');
    },
  });

  useQuery({
    queryKey: ['get-all-email-status'],
    queryFn: getAllCatalogTab,
    onSuccess(res) {
      if (!isEmpty(res.data)) {
        const amountDefaultStatus = emailTabs.length + emailSecTabs.length;

        const privHashTagData = res.data
          .splice(amountDefaultStatus)
          .map<HashtagTabs>((hashTag) => ({
            title: `#${hashTag.value}`,
            value: hashTag.value,
            status: 'hashtag',
            notiNumber: hashTag.amount,
            color: '#4BAAA2',
          }));

        dispatch(setHashtags(privHashTagData));
        // setHashtagTabs(privHashTagData);
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

  // useTranslation
  const { t } = useTranslation();

  // useMutation
  const {
    mutate: mutateSearchCatalog,
    isLoading: isLoadingSearchCatalog,
    data: dataSearchCatalog,
  } = useMutation({
    mutationKey: ['EmailStatusBarContainer-search'],
    mutationFn: searchCatalog,
    onError: (error) => {
      dispatch(setSearchCatalogValue(''));
      toast(t('Have Error!'));
    },
  });
  const {
    mutate: mutateSearchCatalogUsers,
    isLoading: isLoadingSearchCatalogUsers,
    data: dataSearchCatalogUsers,
  } = useMutation({
    mutationKey: ['EmailStatusBarContainer-search'],
    mutationFn: searchCatalog,
    onError: (error) => {
      dispatch(setSearchCatalogValue(''));
      toast(t('Have Error!'));
    },
  });

  // Handler FNC
  const handleChangeHashtagEditing = useCallback(
    (value: number) => {
      setHashtagEditingIndex(value);
    },
    [hashtagEditingIndex],
  );

  let timeout;

  const handleOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const value = e.target.value.trim();

      dispatch(setSearchCatalogValue(value));
      mutateSearchCatalog({
        keyword: value,
        size: 10 * searchSize,
        'es-index': 'emails',
      });
      mutateSearchCatalogUsers({
        keyword: value,
        size: 10 * searchSize,
        'es-index': 'users',
      });
    }, 600);
  };

  const handleSearchShowMore = () => {
    setSearchSize(searchSize * 2);
    setTimeout(() => {
      mutateSearchCatalog({ keyword: searchCatalogValue, size: 10 * searchSize });
    }, 200);
  };

  return (
    <>
      {!Boolean(searchCatalogValue) ? (
        <EmailStatusBar
          hashtagEditing={hashtagEditingIndex}
          onChangeHashtagEditing={handleChangeHashtagEditing}
          emailTabs={emailTabs}
          emailSecTabs={emailSecTabs}
          onSearch={handleOnChangeSearch}
        />
      ) : (
        <EmailStatusBar
          hashtagEditing={hashtagEditingIndex}
          onChangeHashtagEditing={handleChangeHashtagEditing}
          emailTabs={emailTabs}
          emailSecTabs={emailSecTabs}
          searchValue={searchCatalogValue}
          isLoadingSearch={isLoadingSearchCatalog}
          searchData={dataSearchCatalog}
          searchUsersData={dataSearchCatalogUsers}
          onSearch={handleOnChangeSearch}
          searchSize={searchSize}
          onSearchShowMore={handleSearchShowMore}
        />
      )}
    </>
  );
};

export default EmailStatusBarContainer;
