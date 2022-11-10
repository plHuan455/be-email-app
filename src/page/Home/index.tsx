import { IconFactory } from '@components/atoms/Icon';
import SelectBox, { SelectBoxOptionInterface } from '@components/atoms/SelectBox';
import LabelOptionStyle from '@components/atoms/SelectBox/labelOptionStyles';
import Sender from '@components/atoms/Sender';
import UploadArea from '@components/atoms/UploadArea';
import Email from '@components/email';
import EmailActions from '@components/email/EmailActions';
import HomeContainer from '@containers/HomeContainer';
import { Box, Icon } from '@mui/material';

const HomePage = () => {
  return (
    <Box>
      <EmailActions />
      <Sender />
      <Email status={'pending'} />
      <Email status={'approved'} />
      <Email status={'sent'} />
      <Email status={'seen'} />
      <Email status={'declined'} />
      <Email status={'sending'} />
    </Box>
  );
};

export default HomePage;
