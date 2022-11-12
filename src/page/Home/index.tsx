import { IconFactory } from '@components/atoms/Icon';
import SelectBox, { SelectBoxOptionInterface } from '@components/atoms/SelectBox';
import LabelOptionStyle from '@components/atoms/SelectBox/labelOptionStyles';
import Sender from '@components/atoms/Sender';
import UploadArea from '@components/atoms/UploadArea';
import Email from '@components/email';
import EmailActions from '@components/email/EmailActions';
import EmailCompose from '@components/email/EmailCompose';
import HomeContainer from '@containers/HomeContainer';
import EmailStatusBar from '@layouts/EmailStatusBar';
import IconTabs from '@layouts/IconTabs';
import InformationBar, { Receiver } from '@layouts/InformationBar';
import { Box, Icon } from '@mui/material';

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

// const inFormationData = [
//   {
//     title: 'Information',
//     receiver: [],
//   },
// ];

const HomePage = () => {
  return (
    <div className="w-full flex items-center content-around">
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
        {/* <EmailCompose /> */}
        <EmailActions />
        <Sender />
        <Email status={'pending'} />
        <Email status={'approved'} />
        <Email status={'sent'} />
        <Email status={'seen'} />
        <Email status={'declined'} />
        <Email status={'sending'} />
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
