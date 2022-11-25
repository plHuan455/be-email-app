import EmailStatusBar from '@layouts/EmailStatusBar';
import InformationBar, { Receiver } from '@layouts/InformationBar';
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
        // receiver={receiverData}
      />
    </div>
  );
};

export default HomePage;
