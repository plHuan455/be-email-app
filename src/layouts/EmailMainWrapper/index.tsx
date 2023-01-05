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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllEmailByCatalog, getEmailsListWithQueryParams } from '@api/email';
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

  // useSelector

  const { notificationList } = useSelector((state: RootState) => state.notify);

  const queryClient = useQueryClient();

  // Get Emails List

  const { isLoading: isLoadingGetEmailsList } = useQuery({
    queryKey: ['get-emails-list', params.catalog, params.user_id],
    queryFn: () => getAllEmailByCatalog(params),
    onSuccess: (res) => {
      console.log('EmailsList: \n', res.data, '\n===========================');
      dispatch(setEmailsList(res.data ?? []));
      return res.data;
    },
    onError: (res) => {
      toast.error('Có lỗi xảy ra');
    },
  });

  useEffect(() => {
    if (!isEmpty(notificationList)) {
      queryClient.invalidateQueries({ queryKey: ['get-emails-list'] });
    }
  }, [notificationList]);

  useEffect(() => {
    if (!isHaveParams) {
      dispatch(setEmailsList([]));
      return;
    }

    // queryClient.invalidateQueries({ queryKey: ['get-block-emails'] });
    queryClient.invalidateQueries({ queryKey: ['get-emails-list'] });
  }, [isHaveParams, params]);

  useEffect(() => {
    dispatch(setEmailIsLoading(isLoadingGetEmailsList));
  }, [isLoadingGetEmailsList]);

  return (
    <>
      <EmailContainer />
    </>
  );
};

export default EmailMainWrapper;
