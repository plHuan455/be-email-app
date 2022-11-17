import { IconFactory } from '@components/atoms/Icon';
import SelectBox, { SelectBoxOptionInterface } from '@components/atoms/SelectBox';
import LabelOptionStyle from '@components/atoms/SelectBox/labelOptionStyles';
import UploadArea from '@components/atoms/UploadArea';
import HomeContainer from '@containers/HomeContainer';
import EmailStatusBar from '@layouts/EmailStatusBar';
import IconTabs from '@layouts/IconTabs';
import InformationBar, { Receiver } from '@layouts/InformationBar';
import { Box, Icon } from '@mui/material';
import useTest from '../../zustand/useTest';
import { clearScreenDown } from 'readline';
import Email from '@components/organisms/Email';
import EmailContainer from '@layouts/EmailContainer';

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
  return (
    <div className="w-full flex items-center content-around">
      <EmailStatusBar />

      <EmailContainer />

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
