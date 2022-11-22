import React, { useMemo } from 'react';
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
import { EmailResponse } from '@api/email';

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

export type StatusOptions = 'pending' | 'approved' | 'cancel' | 'hashtag';

type Props = {
  title: string;
  status: StatusOptions;
  emailData: EmailList[];
  isActive: boolean;
  handleChangeModalStatus: (status: boolean) => void;
};

const ModalEmailList = (props: Props) => {
  console.log(
    '🚀 ~ file: index.tsx ~ line 66 ~ ModalEmailList ~ props',
    props.emailData,
  );
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const ModalEmailPending = useMemo(() => {
    return (
      <Box
        className={props.isActive ? 'modal__active' : 'modal__inactive'}
        sx={{
          width: '100%',
          height: 'calc(100vh - 165px)',
          position: 'absolute',
          transition: '.3s ease-in-out',
          backgroundColor: '#f7f7fc',
          zIndex: 10,
        }}>
        <ButtonBase
          onClick={() => props.handleChangeModalStatus(false)}
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
            {props.title}
          </Typography>
        </ButtonBase>
        <Box>
          <Tabs
            className="cover__tabs"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example">
            <Tab className="tab" label="All" {...a11yProps(0)} />
            <Tab className="tab" label="Me" {...a11yProps(1)} />
          </Tabs>
        </Box>
        {/* <TabPanel value={value} index={0}>
          {props.emailData &&
            props.emailData.map((item) => {
              return <EmailItem emailData={item} />;
            })}
        </TabPanel> */}
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
    );
  }, [value, props]);

  const ModalEmailApproved = useMemo(() => {
    return (
      <Box
        className={props.isActive ? 'modal__active' : 'modal__inactive'}
        sx={{
          width: '100%',
          height: 'calc(100vh - 165px)',
          position: 'absolute',
          transition: '.3s ease-in-out',
          backgroundColor: '#f7f7fc',
          zIndex: 10,
        }}>
        <ButtonBase
          onClick={() => props.handleChangeModalStatus(false)}
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
            {props.title}
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
  }, [value, props]);

  const ModalEmailCancel = useMemo(() => {
    return (
      <Box
        className={props.isActive ? 'modal__active' : 'modal__inactive'}
        sx={{
          width: '100%',
          height: 'calc(100vh - 165px)',
          position: 'absolute',
          transition: '.3s ease-in-out',
          backgroundColor: '#f7f7fc',
          zIndex: 10,
        }}>
        <ButtonBase
          onClick={() => props.handleChangeModalStatus(false)}
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
            {props.title}
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
  }, [value, props]);

  const ModalHashtag = useMemo(() => {
    return (
      <Box
        className={props.isActive ? 'modal__active' : 'modal__inactive'}
        sx={{
          width: '100%',
          height: 'calc(100vh - 165px)',
          position: 'absolute',
          transition: '.3s ease-in-out',
          backgroundColor: '#f7f7fc',
          zIndex: 10,
        }}>
        <ButtonBase
          onClick={() => props.handleChangeModalStatus(false)}
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
            {props.title}
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
  }, [value, props]);

  const renderModalEmailList = () => {
    switch (props.status) {
      case 'pending':
        return ModalEmailPending;
      case 'approved':
        return ModalEmailApproved;
      case 'cancel':
        return ModalEmailCancel;
      case 'hashtag':
        return ModalHashtag;

      default:
        return ModalEmailPending;
    }
  };

  return renderModalEmailList();
};

export default ModalEmailList;
