import EmailStatusBar from '@layouts/EmailStatusBar';
import InformationBar, { Receiver } from '@layouts/InformationBar';
import EmailContainer from '@layouts/EmailContainer';
import InformationBarEmpty from '@layouts/InformationBarEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';
import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { setEmailIsLoading, setEmailsList } from '@redux/Email/reducer';
import { useMutation } from '@tanstack/react-query';
import { getEmailManagerWithQueryParams, getEmailWithQueryParam } from '@api/email';
import { toast } from 'react-toastify';

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

const EmailMainWrapper = () => {
  const { EmailsList } = useSelector((state: RootState) => state.email);

  const dispatch = useDispatch();

  const params = useParams();

  const isHaveParams = !isEmpty(params);

  const mutationData = useMutation({
    mutationKey: ['get-emails', params],
    mutationFn: () => getEmailManagerWithQueryParams(params),
    onSuccess: (res) => {
      dispatch(setEmailsList(res.data[0].emails.reverse()));
      return res.data;
    },
    onError: (res) => {
      toast.error('Có lỗi xảy ra');
    },
  });

  const { mutate: getEmailList, isLoading } = mutationData;

  useEffect(() => {
    if (!isHaveParams) {
      dispatch(setEmailsList([]));
      return;
    }

    getEmailList();
  }, [isHaveParams, params]);

  useEffect(() => {
    dispatch(setEmailIsLoading(isLoading));
  }, [isLoading]);

  return (
    <>
      <EmailContainer />

      {isEmpty(EmailsList) ? (
        <InformationBarEmpty
          isLoading={isLoading}
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
    </>
  );
};

export default EmailMainWrapper;
