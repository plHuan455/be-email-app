import { IconFactory } from '@components/atoms/Icon';
import SelectBox, { SelectBoxOptionInterface } from '@components/atoms/SelectBox';
import LabelOptionStyle from '@components/atoms/SelectBox/labelOptionStyles';
import UploadArea from '@components/atoms/UploadArea';
import EmailPending from '@components/email/EmailPending';
import HomeContainer from '@containers/HomeContainer';
import { Icon } from '@mui/material';

const HomePage = () => {
  return (
    <div>
      <EmailPending />
    </div>
  );
};

export default HomePage;
