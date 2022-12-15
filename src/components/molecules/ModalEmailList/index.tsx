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
  EmailResponse,
  getEmailManagerWithQueryParams,
} from '@api/email';
import { useGetEmail } from '@hooks/Email/useGetEmail';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loading from '@components/atoms/Loading';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import useLocalStorage from '@hooks/useLocalStorage';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';

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
  status: StatusOptions;
  isActive: boolean;
  handleChangeModalStatus: (status: boolean) => void;
  tag?: string;
  renderType?: 'tag' | 'status';
  index?: number;
  handleChangeEmailTabNotiNumber?: (index: number, number: number) => void;
};

const ModalEmailList: React.FC<Props> = ({
  status,
  isActive,
  handleChangeModalStatus,
  title,
  tag,
  renderType = 'status',
  index,
  handleChangeEmailTabNotiNumber,
}) => {
  const [searchParams] = useSearchParams();

  const tagParams = searchParams.get('tab');

  const [value, setValue] = React.useState(0);
  const [selectedEmail, setSelectedEmail] = useState<string>();
  const [userEmails, setUserEmail] = useState<EmailManagerResponse[]>();
  const [userAllEmails, setUserAllEmail] = useState<EmailManagerResponse[]>();

  const { EmailsList } = useSelector((state: RootState) => state.email);

  const CURRENT_EMAIL = localStorage.getItem('current_email');

  const locate = useLocation();
  const pathName = locate.pathname;
  const params = useParams();

  const currentPosition = localStorage.getItem('current_role');

  useEffect(() => {
    if (!tagParams) setValue(0);
    else {
      if (tagParams === 'me') setValue(0);
      else setValue(1);
    }
  }, [tagParams]);

  useEffect(() => {
    if (!params.email) return;
    setSelectedEmail(params.email);
  }, [params]);

  const { data: dataGetEmailManagerByStatus } = useQuery({
    queryKey: ['get-email-manager', status, pathName, ...EmailsList],
    queryFn: () =>
      renderType === 'tag'
        ? getEmailManagerWithQueryParams({
            tag: tag,
          })
        : getEmailManagerWithQueryParams({ status: status }),
    enabled: isActive,
    onSuccess: (res) => {
      setUserEmail(
        res.data.filter((vals) => vals.user_tag_info.user_email === CURRENT_EMAIL),
      );
      setUserAllEmail(
        res.data.filter((vals) => vals.user_tag_info.user_email !== CURRENT_EMAIL),
      );
    },
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) navigate('?tab=me');
    else navigate('?tab=all');
  };

  const handleSelectEmailItem = (email: string) => {
    setSelectedEmail(email);
  };

  const _renderEmtailItems = useCallback(
    (emailsData: EmailManagerResponse[]) => {
      return (emailsData ?? []).map((item, index) => {
        return (
          <EmailItem
            onSelect={() => {
              handleSelectEmailItem(item.user_tag_info.user_email);
            }}
            isSelected={item.user_tag_info.user_email === selectedEmail}
            firstEmailContent={item.emails[0].content}
            emailStatus={item.emails[0].status}
            emailTag={tag || undefined}
            dataEmail={item.emails}
            data={item.user_tag_info}
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

  const ModalEmailApproved = useMemo(() => {
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
            <Tab className="tab" label="All" {...a11yProps(0)} />
            <Tab className="tab" label="Me" {...a11yProps(1)} />
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

  const ModalEmailCancel = useMemo(() => {
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
            <Tab className="tab" label="All" {...a11yProps(0)} />
            <Tab className="tab" label="Me" {...a11yProps(1)} />
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

  const renderModalEmailList = () => {
    switch (status) {
      case 'pending':
        return ModalEmailPending;
      case 'approved':
        return ModalEmailPending;
      case 'declined':
        return ModalEmailPending;
      case 'hashtag':
        return ModalHashtag;

      default:
        return ModalEmailPending;
    }
  };

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
        {userEmails && _renderEmtailItems(userEmails)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {userAllEmails && _renderEmtailItems(userAllEmails)}
      </TabPanel>
    </Box>
  );
};

export default ModalEmailList;
