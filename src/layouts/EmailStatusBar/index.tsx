import EmailStatusHeader from '@components/molecules/EmailStatusHeader';
import { EmailList, StatusOptions } from '@components/molecules/ModalEmailList';
import { Box } from '@mui/material';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import './index.scss';
import EmailTab from '@components/molecules/EmailTab';
import { addTabHistory } from '@redux/Email/reducer';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppSelector } from '@redux/configureStore';
import HashtagContainer from '@containers/HashtagContainer';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import Icon from '@components/atoms/Icon';
import { SearchCatalogResponse } from '@api/public/interface';
import Loading from '@components/atoms/Loading';

import Highlighter from 'react-highlight-words';
import { setSearchCatalogValue } from '@redux/Global/reducer';

export interface EmailItem {
  userAvt: string;
  userName: string;
  userEmail: string;
  totalEmail: number;
}

export interface EmailTabs {
  title?: string;
  url?: string;
  logo?: string;
  icon?: React.ReactElement;
  status: StatusOptions;
  emailData: EmailList[];
  notiNumber?: number;
  color?: string;
}

interface SearchResultProps {
  searchData: any;
  isLoading: boolean;
  searchValue: string;
  searchSize: number;
  onSearchShowMore: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  searchData,
  isLoading,
  searchValue,
  searchSize,
  onSearchShowMore,
}) => {
  const dispatch = useDispatch();

  if (isLoading)
    return (
      <Box>
        <Loading isLoading={isLoading} />
      </Box>
    );

  const { total, data } = searchData;

  // Handle After Here
  if (isEmpty(data)) return <Box>No matching results</Box>;

  const dataSort = useMemo(() => {
    return data.sort((a, b) => {
      const esIndexA = a['es-index'].toUpperCase();
      const esIndexB = b['es-index'].toUpperCase();

      return esIndexA <= esIndexB;
    });
  }, [data]);

  // useNavigate
  const navigate = useNavigate();

  const searchCharacters = useMemo(() => {
    return searchValue.split(' ');
  }, [searchValue]);

  // Handler FNC
  const onClearSearchValue = () => {
    dispatch(setSearchCatalogValue(''));
    navigate('/emails');
  };

  // Render FNC
  const _renderEmailsType = useCallback(
    (item: SearchCatalogResponse) => {
      const { id, email, status } = item;

      return (
        <Box
          key={id}
          className="flex items-center rounded-md overflow-hidden p-2 hover:bg-slate-400/40  hover:cursor-pointer"
          onClick={() => navigate(`/emails/catalog/${status}/${email.writer_id}`)}>
          <Icon className="mr-2" icon="email" />
          <Box className="flex-1 border-l overflow-hidden border-slate-600/40 px-2">
            <Highlighter
              className="truncate"
              searchWords={searchCharacters}
              autoEscape={true}
              textToHighlight={email.subject}
            />
          </Box>
        </Box>
      );
    },
    [data],
  );

  const _renderSearchResultItem = useCallback(
    (item: SearchCatalogResponse) => {
      const { ['es-index']: esIndex } = item;
      switch (esIndex) {
        case 'emails': {
          return _renderEmailsType(item);
        }

        default: {
          return _renderEmailsType(item);
        }
      }
    },
    [data],
  );

  // Main Render
  return (
    <Box className="flex flex-col pt-2">
      <Box className="flex justify-between items-center bg-slate-500/40">
        <h3 className="font-bold text-lg">Total:</h3>
        <p>
          {total} {total >= 1 ? 'results' : 'result'}{' '}
        </p>
        <Icon
          className="hover:cursor-pointer"
          icon="close"
          onClick={onClearSearchValue}
        />
      </Box>
      <Box className="flex-1 py-2">
        {dataSort.map((item) => _renderSearchResultItem(item))}
      </Box>
      {dataSort.length < total && (
        <Box>
          <span
            className="text-blue-1 hover:cursor-pointer"
            onClick={onSearchShowMore}>
            Show More
          </span>
        </Box>
      )}
    </Box>
  );
};

interface Props {
  hashtagEditing: number;
  emailTabs: EmailTabs[];
  emailSecTabs: EmailTabs[];
  searchValue?: string;
  isLoadingSearch?: boolean;
  searchData?: any;
  searchSize?: number;
  onSearchShowMore?: () => void;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeHashtagEditing: (value: number) => void;
}

const EmailStatusBar: React.FC<Props> = ({
  hashtagEditing,
  emailTabs,
  emailSecTabs,
  searchValue = '',
  isLoadingSearch = false,
  searchData,
  searchSize,
  onSearchShowMore,
  onSearch,
  onChangeHashtagEditing,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab');
  const { catalog } = useParams();
  const tabHistory = useAppSelector((state) => state.email.tabHistory);
  const hashtagTabs = useAppSelector((state) => state.email.privateHashtags);

  // useDispatch
  const dispatch = useDispatch();

  // useSelector
  const { notificationList } = useSelector((state: RootState) => state.notify);

  useEffect(() => {
    if (!catalog) return;
    if (!searchParams.get('tab') && tabHistory[catalog]) {
      setSearchParams({ tab: tabHistory[catalog] });
    }
  }, [catalog]);

  useEffect(() => {
    if (catalog && tab) {
      dispatch(addTabHistory({ catalog, tab: tab as 'all' | 'me' }));
    }
  }, [tab]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if(!catalog) return;
    if(!searchParams.get('tab') && tabHistory[catalog]) {
      setSearchParams({tab: tabHistory[catalog]})
    }
  }, [catalog])

  useEffect(() => {
    if(catalog && tab) {
      dispatch(addTabHistory({catalog, tab: tab as 'all' | 'me'}))
    }
  }, [tab])

  useEffect(() => {
    if (!isEmpty(notificationList))
      queryClient.invalidateQueries({ queryKey: ['get-all-email-status'] });
  }, [notificationList]);

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
      <Box className="flex-1">
        {hashtagTabs &&
          hashtagTabs.map((item, index) => {
            return (
              <HashtagContainer
                color={item.color}
                title={item.title}
                catalog={item.value}
                status={item.status}
                hashtagEditingIndex={hashtagEditing}
                setHashtagEditingIndex={onChangeHashtagEditing}
                index={index}
                notiNumber={item.notiNumber ? item.notiNumber : 0}
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
  }, [hashtagTabs, hashtagEditing]);

  return (
    <Box
      className="flex flex-col"
      sx={{
        height: '100vh',
        width: '100%',
        padding: '24px',
        paddingInline: '12px',
        overflowX: 'hidden',
        // borderRight: '1px solid #e5e7eb',
      }}>
      <EmailStatusHeader
        title="Email"
        buttonTitle="Compose"
        color="#827CFF"
        bgButtonColor="#554CFF"
        isComposeButton={true}
        isSearch={true}
        onSearch={onSearch}
      />
      <Box
        className="flex flex-col flex-1"
        sx={{
          paddingBottom: '10px',
          position: 'relative',
        }}>
        {!Boolean(searchValue) ? (
          <>
            {_renderEmailTags(emailTabs, 'emailTabs')}
            {_renderEmailTags(emailSecTabs, 'emailSecTabs')}
            {_renderPrivateHashtag}
          </>
        ) : (
          <SearchResult
            searchData={searchData}
            isLoading={isLoadingSearch}
            searchValue={searchValue}
            searchSize={searchSize ?? 0}
            onSearchShowMore={onSearchShowMore ?? (() => {})}
          />
        )}
      </Box>
    </Box>
  );
};

export default EmailStatusBar;
