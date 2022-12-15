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
import {
  getEmailManagerWithQueryParams,
  getEmailsListWithQueryParams,
  getEmailWithQueryParam,
} from '@api/email';
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

  const queryClient = useQueryClient();

  // Get Emails List
  const { isLoading: isLoadingGetEmailsList } = useQuery({
    queryKey: ['get-emails-list'],
    queryFn: () => getEmailsListWithQueryParams(params),
    onSuccess: (res) => {
      dispatch(
        setEmailsList(
          params.status?.toLowerCase() === 'pending' ? res.data.reverse() : res.data,
        ),
      );
      return res.data;
    },
    onError: (res) => {
      toast.error('Có lỗi xảy ra');
    },
  });

  // Get Emails Block
  // const { isLoading: isLoadingGetEmailsBlock } = useQuery({
  //   queryKey: ['get-block-emails', params],
  //   queryFn: () => getEmailManagerWithQueryParams(params),
  //   onSuccess: (res) => {
  //     dispatch(
  //       setEmailsList(
  //         params.status?.toLowerCase() === 'pending'
  //           ? res.data[0].emails.reverse()
  //           : res.data[0].emails,
  //       ),
  //     );
  //     return res.data;
  //   },
  //   onError: (res) => {
  //     toast.error('Có lỗi xảy ra');
  //   },
  //   enabled: !!params.status || !!params.tag,
  // });

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

      {isEmpty(EmailsList) ? (
        <InformationBarEmpty
          isLoading={isLoadingGetEmailsList}
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
