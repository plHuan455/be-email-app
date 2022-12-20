import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { render } from '@testing-library/react';
import './index.scss';
import { ButtonBase } from '@mui/material';
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
  | 'sent';

type Props = {
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
  title,
  index,
  handleChangeEmailTabNotiNumber,
}) => {
  const [searchParams] = useSearchParams();

  const tagParams = searchParams.get('tab');

  const [value, setValue] = React.useState(0);
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [userEmails, setUserEmail] = useState<CatalogTabResponse[]>([]);
  const [userAllEmails, setUserAllEmail] = useState<CatalogTabResponse[]>();

  const { EmailsList } = useSelector((state: RootState) => state.email);

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

  const { data: dataGetEmailManagerByStatus, isLoading: isLoadingGetEmailData } =
    useQuery({
      queryKey: ['get-email-manager', pathName, ...EmailsList, value],
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
  useEffect(() => {
    if (!isEmpty(notificationList)) {
      queryClient.invalidateQueries({ queryKey: ['get-email-manager'] });
    }
  }, [notificationList]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) navigate('?tab=me');
    else navigate('?tab=all');
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

  const ModalEmailPending = useMemo(() => {
    return (
      <Box
        className={isActive ? 'modal__active' : 'modal__inactive'}
        sx={{
          width: '100%',
          height: 'calc(100vh - 165px)',
          position: 'absolute',
          transition: '.3s ease-in-out',
          backgroundColor: '#f7f7fc',
          zIndex: 10,
        }}>
        <ButtonBase
          onClick={() => handleChangeModalStatus(false)}
          sx={{
            color: '#554CFF',
            padding: '0 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <ArrowLeft width={12} height={12} />
          <Typography
            component={'p'}
            sx={{ fontWeight: 'bold', marginLeft: '10px' }}>
            {title}
          </Typography>
        </ButtonBase>
        <Box>
          <Tabs
            className={`cover__tabs`}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example">
            <Tab className="tab" label="Me" {...a11yProps(0)} />
            <Tab className="tab" label="All" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item Tab All
        </TabPanel>
        <TabPanel value={value} index={1}>
          {userEmails && _renderEmtailItems(userEmails)}
        </TabPanel>
      </Box>
    );
  }, [value]);

  const ModalHashtag = useMemo(() => {
    return (
      <Box
        className={isActive ? 'modal__active' : 'modal__inactive'}
        sx={{
          width: '100%',
          height: 'calc(100vh - 165px)',
          position: 'absolute',
          transition: '.3s ease-in-out',
          backgroundColor: '#f7f7fc',
          zIndex: 10,
        }}>
        <ButtonBase
          onClick={() => handleChangeModalStatus(false)}
          sx={{
            color: '#554CFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 10px',
          }}>
          <ArrowLeft width={12} height={12} />
          <Typography
            component={'p'}
            sx={{ fontWeight: 'bold', marginLeft: '10px' }}>
            {title}
          </Typography>
        </ButtonBase>
        <Box sx={{}}>
          <Tabs
            className="cover__tabs"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example">
            <Tab className="tab" label="Me" {...a11yProps(0)} />
            <Tab className="tab" label="All" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          props
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
    );
  }, [value]);

  const navigate = useNavigate();

  return (
    <Box
      className={isActive ? 'modal__active' : 'modal__inactive'}
      sx={{
        width: '100%',
        height: 'calc(100vh - 165px)',
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
          color: `${status === 'hashtag' ? '#4BAAA2' : '#554CFF'}`,
          padding: '0 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <ArrowLeft
          width={12}
          height={12}
          color={`${status === 'hashtag' ? '#4BAAA2' : '#554CFF'}`}
        />
        <Typography component={'p'} sx={{ fontWeight: 'bold', marginLeft: '10px' }}>
          {title}
        </Typography>
      </ButtonBase>
      <Box>
        <Tabs
          className={`cover__tabs  ${status === 'hashtag' && 'hashtag'}`}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example">
          <Tab className="tab" label="Me" {...a11yProps(0)} />
          {!currentPosition?.startsWith('EMPLOYEE') && (
            <Tab className="tab" label="All" {...a11yProps(1)} />
          )}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {isLoadingGetEmailData ? (
          <Loading isLoading={isLoadingGetEmailData} size={'xs'} />
        ) : (
          _renderEmtailItems(userEmails)
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {isLoadingGetEmailData ? (
          <Loading isLoading={isLoadingGetEmailData} size={'xs'} />
        ) : (
          _renderEmtailItems(userEmails)
        )}
      </TabPanel>
    </Box>
  );
};

export default ModalEmailList;
