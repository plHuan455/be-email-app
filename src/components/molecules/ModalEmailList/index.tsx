import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { render } from '@testing-library/react';
import './index.scss';
import { ButtonBase, Skeleton } from '@mui/material';
import ArrowLeft from '@assets/icon/ArrowLeft';
import EmailItem from '@components/atoms/Emailitem';
import {
  EmailManagerResponse,
  getEmailManagerWithQueryParams,
  getListCatalogWithQueryParam,
} from '@api/email';
import { useGetEmail } from '@hooks/Email/useGetEmail';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import useLocalStorage from '@hooks/useLocalStorage';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';
import { CatalogTabResponse } from '@api/email/interface';
import Loading from '@components/atoms/Loading';
import { isEmpty } from 'lodash';
import useWebsocket from '@hooks/useWebsocket';

export interface EmailList {
  userId: number;
  userAvt: string;
  userName: string;
  userEmail: string;
  title: string;
  totalEmail?: number;
  sent?: number;
  received?: number;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export type StatusOptions =
  | 'pending'
  | 'approved'
  | 'declined'
  | 'hashtag'
  | 'draft'
  | 'trash'
  | 'spam'
  | 'sent'
  | 'important';

type Props = {
  titleColor: string;
  title: string;
  catalog: string;
  isActive: boolean;
  handleChangeModalStatus: (status: boolean) => void;
  index?: number;
  handleChangeEmailTabNotiNumber?: (index: number, number: number) => void;
};

const ModalEmailList: React.FC<Props> = ({
  catalog,
  isActive,
  handleChangeModalStatus,
  titleColor,
  title,
  index,
  handleChangeEmailTabNotiNumber,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tagParams = searchParams.get('tab');

  const [value, setValue] = React.useState(0);
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [userEmails, setUserEmail] = useState<CatalogTabResponse[]>([]);

  const locate = useLocation();
  const pathName = locate.pathname;
  const params = useParams();

  const currentPosition = localStorage.getItem('current_role');
  const currEmail = localStorage.getItem('current_email');

  useEffect(() => {
    if (!tagParams) setValue(0);
    else {
      if (tagParams === 'me') setValue(0);
      else setValue(1);
    }
  }, [tagParams]);

  useEffect(() => {
    if (!params.user_id) return;
    setSelectedUserId(Number(params.user_id) || 0);
  }, [params]);

  // useSelector
  const { notificationList } = useSelector((state: RootState) => state.notify);

  // useQuery

  const queryClient = useQueryClient();

  useWebsocket({
    onOpen: () => {
      console.log('Websocket open ModalEmailList');
    },
    onMessage: (data) => {
      if(!data.change) return;
      console.log('Websocket message ModalEmailList', data);
      queryClient.invalidateQueries({queryKey: ['get-email-manager']})
    },
    onClose: () => {
      console.log('Websocket close ModalEmailList');
    },
  })

  const { data: dataGetEmailManagerByStatus, isLoading: isLoadingGetEmailData } =
    useQuery({
      queryKey: ['get-email-manager', pathName, value],
      queryFn: () => {
        setUserEmail([]);
        return getListCatalogWithQueryParam({
          catalog: catalog,
          subject: tagParams || 'me',
        });
      },
      enabled: isActive,
      onSuccess: (res) => {
        setUserEmail(res.data);
      },
    });

  // useEffect
  // useEffect(() => {
  //   if (!isEmpty(notificationList)) {
  //     queryClient.invalidateQueries({ queryKey: ['get-email-manager'] });
  //   }
  // }, [notificationList]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (value === newValue) {
      if (newValue === 0) navigate('?tab=me');
      else {
        navigate(`?tab=all`);
      }
    } else {
      setValue(newValue);
      if (newValue === 0) navigate(`/emails/catalog/${params.catalog}?tab=me`);
      else {
        navigate(`/emails/catalog/${params.catalog}?tab=all`);
      }
    }
  };

  const handleSelectEmailItem = (user_id: number) => {
    setSelectedUserId(user_id);
  };

  const _renderEmtailItems = useCallback(
    (emailsData: CatalogTabResponse[]) => {
      return (emailsData ?? []).map((item, index) => {
        return (
          <EmailItem
            onSelect={() => {
              handleSelectEmailItem(item.user_id);
            }}
            isSelected={item.user_id === selectedUserId}
            emailCatalog={catalog}
            data={item}
            key={index}
          />
        );
      });
    },
    [dataGetEmailManagerByStatus],
  );

  const navigate = useNavigate();

  return (
    <Box
      className={isActive ? 'modal__active' : 'modal__inactive'}
      sx={{
        width: '100%',
        position: 'absolute',
        transition: '.3s ease-in-out',
        backgroundColor: '#f7f7fc',
        zIndex: 10,
      }}>
      <ButtonBase
        onClick={() => {
          handleChangeModalStatus(false);
        }}
        sx={{
          color: `${titleColor}`,
          padding: '0 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <ArrowLeft width={12} height={12} color={titleColor} />
        <Typography component={'p'} sx={{ fontWeight: 'bold', marginLeft: '10px' }}>
          {title}
        </Typography>
      </ButtonBase>
      {!currentPosition?.toUpperCase().startsWith('EMPLOYEE') &&
        ['pending', 'approved', 'declined'].includes(catalog) && (
          <Box>
            <Tabs
              className={`cover__tabs`}
              style={
                {
                  '--main-color': titleColor,
                } as React.CSSProperties
              }
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example">
              <Tab className="tab" label="Me" {...a11yProps(0)} />
              <Tab className="tab" label="All" {...a11yProps(1)} />
            </Tabs>
          </Box>
        )}
      <TabPanel value={value} index={0}>
        {isLoadingGetEmailData ? (
          <Box className="flex flex-col gap-2">
            <Box className="flex w-full gap-2">
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                className="inline-block"
              />
              <Skeleton
                variant="rounded"
                height={40}
                className="flex-1 inline-block"
              />
            </Box>
            <Box className="flex w-full gap-2">
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                className="inline-block"
              />
              <Skeleton
                variant="rounded"
                height={40}
                className="flex-1 inline-block"
              />
            </Box>
            <Box className="flex w-full gap-2">
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                className="inline-block"
              />
              <Skeleton
                variant="rounded"
                height={40}
                className="flex-1 inline-block"
              />
            </Box>
          </Box>
        ) : (
          _renderEmtailItems(userEmails)
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {isLoadingGetEmailData ? (
          <Box className="flex flex-col gap-2">
            <Box className="flex w-full gap-2">
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                className="inline-block"
              />
              <Skeleton
                variant="rounded"
                height={40}
                className="flex-1 inline-block"
              />
            </Box>
            <Box className="flex w-full gap-2">
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                className="inline-block"
              />
              <Skeleton
                variant="rounded"
                height={40}
                className="flex-1 inline-block"
              />
            </Box>
            <Box className="flex w-full gap-2">
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                className="inline-block"
              />
              <Skeleton
                variant="rounded"
                height={40}
                className="flex-1 inline-block"
              />
            </Box>
          </Box>
        ) : (
          _renderEmtailItems(userEmails)
        )}
      </TabPanel>
    </Box>
  );
};

export default ModalEmailList;
