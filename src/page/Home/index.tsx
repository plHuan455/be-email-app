import { IconFactory } from '@components/atoms/Icon';
import SelectBox, { SelectBoxOptionInterface } from '@components/atoms/SelectBox';
import LabelOptionStyle from '@components/atoms/SelectBox/labelOptionStyles';
import Sender from '@components/atoms/Sender';
import UploadArea from '@components/atoms/UploadArea';
import Email from '@components/email';
import HomeContainer from '@containers/HomeContainer';
import { Icon } from '@mui/material';

const HomePage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
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
