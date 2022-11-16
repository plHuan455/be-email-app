import { IconFactory } from '@components/atoms/Icon';
import SelectBox, { SelectBoxOptionInterface } from '@components/atoms/SelectBox';
import LabelOptionStyle from '@components/atoms/SelectBox/labelOptionStyles';
import UploadArea from '@components/atoms/UploadArea';
import EmailCompose from '@components/email/EmailCompose';
import EmailMess from '@components/email/EmailMess';
import HomeContainer from '@containers/HomeContainer';
import EmailStatusBar from '@layouts/EmailStatusBar';
import IconTabs from '@layouts/IconTabs';
import InformationBar, { Receiver } from '@layouts/InformationBar';
import { Box, Icon } from '@mui/material';
import useTest from '../../zustand/useTest';
import useEmail from '../../zustand/useEmail';
import { clearScreenDown } from 'readline';
import EmailActions from '@components/email/EmailActions';
import Email from '@components/email';

const receiverData: Receiver[] = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

const HomePage = () => {
  const isCompose = useEmail((state) => state.isCompose);

  return (
    <div className="w-full flex items-center content-around">
      {/* <EmailStatusBar />
      <Box sx={{ width: '100%' }}>
        <TabPanel value={value} index={0}>
          <EmailPending />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box> */}
      {/* <EmailCompose /> */}
      <EmailStatusBar />
      <Box
        sx={{
          width: '70%',
          height: '100vh',
          padding: '28px',
          backgroundColor: '#EDEDF3',
          borderTopLeftRadius: '65px',
          overflow: 'scroll',
        }}>
        {isCompose ? <EmailCompose /> : <Email />}
        {/* <EmailActions /> */}
        {/* <Sender />
        <Email status={'pending'} />
        <Email status={'approved'} />
        <Email status={'sent'} />
        <Email status={'seen'} />
        <Email status={'declined'} />
        <Email status={'sending'} /> */}
      </Box>
      <InformationBar
        title="Information"
        isBorderBottom={true}
        sender={1}
        receiver={receiverData}
      />
    </div>
  );
};

export default HomePage;
