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
import { Box, Icon } from '@mui/material';

const HomePage = () => {
  return (
    <div className="w-full flex items-center content-around">
      <EmailStatusBar />
      <Box>
        <EmailCompose />
        <EmailActions />
        <Sender />
        <Email status={'pending'} />
        <Email status={'approved'} />
        <Email status={'sent'} />
        <Email status={'seen'} />
        <Email status={'declined'} />
        <Email status={'sending'} />
      </Box>
    </div>
  );
};

export default HomePage;
