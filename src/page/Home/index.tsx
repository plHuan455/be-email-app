import { IconFactory } from '@components/atoms/Icon';
import SelectBox, { SelectBoxOptionInterface } from '@components/atoms/SelectBox';
import LabelOptionStyle from '@components/atoms/SelectBox/labelOptionStyles';
import Sender from '@components/atoms/Sender';
import UploadArea from '@components/atoms/UploadArea';
import Email from '@components/email';
import HomeContainer from '@containers/HomeContainer';
import { Box, Icon } from '@mui/material';

const HomePage = () => {
  return (
    <Box>
      <Sender />
      <Email status={'pending'} />
      <Email status={'approved'} />
    </Box>
  );
};

export default HomePage;
