import EmailStatusBar from '@layouts/EmailStatusBar';
import InformationBar, { Receiver } from '@layouts/InformationBar';
import EmailContainer from '@layouts/EmailContainer';
import InformationBarEmpty from '@layouts/InformationBarEmpty';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';
import { isEmpty } from 'lodash';

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

const Email = () => {
  const { EmailsList } = useSelector((state: RootState) => state.email);

  return (
    <div className="w-full flex items-center content-around">
      <EmailStatusBar />

      <EmailContainer />

      {isEmpty(EmailsList) ? (
        <InformationBarEmpty
          title="Information"
          isBorderBottom={true}
          sender={1}
          // receiver={receiverData}
        />
      ) : (
        <InformationBar
          title="Information"
          isBorderBottom={true}
          sender={1}
          // receiver={receiverData}
        />
      )}
    </div>
  );
};

export default Email;
