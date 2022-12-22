import {
  approveEmail,
  CreateEmailParam,
  sendEmail,
  updateEmailWithQuery,
} from '@api/email';
import utc from 'dayjs/plugin/utc';
import { EmailComposeFields } from '@components/templates/EmailCompose2';
import { MinimizeEmailTypes } from '@components/templates/MinimizeEmailList';
import { emailData } from '@layouts/EmailStatusBar';
import { useAppDispatch, useAppSelector } from '@redux/configureStore';
import { setWorkingEmail } from '@redux/Email/reducer';
import { useMutation } from '@tanstack/react-query';
import { getHtmlStringFromEditorState } from '@utils/functions';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { EmailUpdateQuery } from '@api/email/interface';

const currentUserEmail = localStorage.getItem('current_email');

const useAutoStoreEmail = (delayTime: number = 5000) => {
  const isFirstAccessRef = useRef<boolean>(true);
  const dispatch = useAppDispatch();
  const workingEmail = useAppSelector((state) => state.email.workingEmail);
  const handleTimeoutRef = useRef<NodeJS.Timeout>();

  const { mutate: storeDraftMutate, isLoading: isStoreDraftLoading } = useMutation({
    mutationKey: ['use-auto-store-email-store-draft'],
    mutationFn: async (params: { data: CreateEmailParam; emailId?: number }) => {
      const res = await sendEmail(params.data);
      const draft = await approveEmail({
        user_email_id: res.data.id,
        status: 'DRAFT',
        approve_after: 0,
      });
      return draft;
    },
  });

  const { mutate: updateEmailMutate, isLoading: isUpdateEmailLoading } = useMutation(
    {
      mutationKey: ['use-auto-store-email-update-draft'],
      mutationFn: (params: { id: number; data: EmailUpdateQuery }) =>
        updateEmailWithQuery(params.id, params.data),
    },
  );

  const onFieldsChange = (
    name: string | undefined,
    values: Partial<EmailComposeFields>,
  ) => {
    return;
    if (handleTimeoutRef.current) clearTimeout(handleTimeoutRef.current);
    handleTimeoutRef.current = setTimeout(() => {
      dispatch(setWorkingEmail({ ...values }));
    }, delayTime);
  };

  useEffect(() => {
    return;
    // if (isFirstAccessRef.current) {
    //   isFirstAccessRef.current = false;
    //   return;
    // }

    // const contentString = getHtmlStringFromEditorState(workingEmail.content);
    // if (
    //   workingEmail.id === undefined &&
    //   isEmpty(workingEmail.to) &&
    //   isEmpty(workingEmail.cc) &&
    //   isEmpty(workingEmail.bcc) &&
    //   isEmpty(workingEmail.attachFiles?.fileUrls) &&
    //   isEmpty(workingEmail.attachFiles?.files) &&
    //   isEmpty(workingEmail.subject) &&
    //   contentString === ''
    // ) {
    //   console.log(`[DON'T STORE DRAFT BECAUSE EMPTY]`);
    //   return;
    // }

    // const emailData = {
    //   subject: workingEmail.subject ?? '',
    //   to:
    //     workingEmail.to?.reduce((curr: string[], next) => {
    //       const mails = next.employeesList.map((employee) => employee.mail);

    //       return [...curr, ...mails];
    //     }, []) ?? [],
    //   text_html: contentString,
    //   bcc: workingEmail.bcc?.map((value) => value.mail) ?? [],
    //   cc: workingEmail.cc?.map((value) => value.mail) ?? [],
    //   attachs:
    //     (
    //       workingEmail.attachFiles?.fileUrls.filter(
    //         (value) => value !== undefined,
    //       ) as string[]
    //     )?.map((value) => ({ path: value })) ?? [],
    //   from: currentUserEmail ? currentUserEmail : '',
    // };
    // if (workingEmail.id === undefined) {
    //   storeDraftMutate({
    //     data: {
    //       email: emailData,
    //       send_at: dayjs.utc().toISOString(),
    //     },
    //     emailId: workingEmail.id !== undefined ? Number(workingEmail.id) : undefined,
    //   });
    //   return;
    // }
    // updateEmailMutate({
    //   id: Number(workingEmail.id),
    //   data: { ...emailData },
    // });
  }, [workingEmail]);

  return { onFieldsChange };
};

export default useAutoStoreEmail;
