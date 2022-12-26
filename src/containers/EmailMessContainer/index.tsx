import { approveEmail, EmailResponse, undoEmail } from '@api/email';
import ModalBase from '@components/atoms/ModalBase';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
import AlertWithEmailAction from '@components/molecules/AlertWithEmailAction';
import SettimeInput from '@components/molecules/SettimeInput';
import { UserInfo } from '@components/organisms/Email/Interface';
import EmailMess from '@components/organisms/EmailMess';
import { emailData } from '@layouts/EmailStatusBar';
import { Box, Button } from '@mui/material';
import { deleteIndexEmail, HashtagTabs } from '@redux/Email/reducer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { userInfo } from 'os';
import React, { forwardRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

interface Props {
  userInfo: UserInfo;
  emailData: EmailResponse;
  onChangeStatus: (status: any, index: any) => void;
  onShowHistory: Function;
  type: 'receive' | 'send';
  isShowHeader?: boolean;
  isShowActions?: boolean;
  index?: number;
  onUpdateHashtagClick?: (hashtags: HashtagTabs[]) => void;
}

const EmailMessContainerRef: React.ForwardRefRenderFunction<HTMLDivElement | undefined, Props> = ({
  userInfo,
  emailData,
  onChangeStatus,
  onShowHistory,
  type,
  isShowHeader,
  isShowActions,
  index,
  onUpdateHashtagClick,
}, ref) => {
  // useState
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [valueApproveIn, setValueApproveIn] = useState<Dayjs>(
    dayjs('Thu Apr 07 2022 00:15:00'),
  );

  // useAlertDialog
  const {
    isOpen: isAlertDialogOpen,
    isLoading: isAlertDialogLoading,
    description: alertDialogDescription,
    onClose: onAlertDialogClose,
    callback: alertDialogCallback,
    title: alertDialogTitle,
    setIsLoading: setALertDialogLoading,
    setAlertData: setAlertDialogData,
  } = useAlertDialog();

  // useDispatch
  const dispatch = useDispatch();

  // useQueryClient
  const queryClient = useQueryClient();

  // useMutation
  const { mutate: updateEmailStatus } = useMutation({
    mutationKey: ['update-email'],
    mutationFn: (status: 'PENDING' | 'approved' | 'DECLINED') =>
      approveEmail({ user_email_id: emailData.email.id, status: status }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['get-email-manager'] });
      dispatch(deleteIndexEmail(index));
      toast.success('Decline Successful!');
    },
    onError(err: any, params) {
      console.log(err);
      toast.error(
        `Can't ${params} email (${
          err.response?.status ? `CODE: ${err.response?.status}` : ''
        })`,
      );
    },
    onSettled() {
      onAlertDialogClose();
    },
  });

  const { mutate: setApproveEmail } = useMutation({
    mutationKey: ['Approve-email'],
    mutationFn: async (query: {
      user_email_id: number;
      status: 'PENDING' | 'approved' | 'DECLINED' | 'DRAFT';
      note: string;
      approve_after: number;
    }) => await approveEmail(query),
    onSuccess(_, params) {
      queryClient.invalidateQueries({ queryKey: ['get-emails-list'] });

      switch (params.status) {
        case 'DRAFT': {
          toast.success('Email has been cancel');
          break;
        }
        case 'approved': {
          if (params.approve_after > 0) {
            toast.success(`Email will be approved after ${params.approve_after}`);
          } else {
            dispatch(deleteIndexEmail(index));
            toast.success('Email has been Approved');
          }
          break;
        }
      }
    },
    onError() {
      toast.error("Can't approve email");
    },
    onSettled() {
      onAlertDialogClose();
    },
  });

  const { mutate: undoEmailMutate } = useMutation({
    mutationKey: ['email-mess-undo-email'],
    mutationFn: undoEmail,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['get-emails-list'] });
      toast.success('Email have been undo');
    },
    onError() {
      toast.error("Can't undo email");
    },
  });

  //   Handle FNC
  const handleApproveNow = () => {
    setAlertDialogData(
      '',
      <AlertWithEmailAction
        title='Are you sure want to "approve now" this mail?'
        emailTitle={emailData.email.subject ?? 'Empty'}
        writer={
          emailData.email.from ??
          emailData.email.cc[0] ??
          emailData.email.bcc[0] ??
          'No one'
        }
      />,
      () =>
        setApproveEmail({
          user_email_id: emailData.id,
          note: '',
          approve_after: 0,
          status: 'approved',
        }),
    );
    setIsOpenModal(false);
  };

  const handleApproveSettime = (e) => {
    setAlertDialogData(
      '',
      <AlertWithEmailAction
        title='Are you sure want to "approve" this mail?'
        emailTitle={emailData.email.subject ?? 'Empty'}
        writer={
          emailData.email.from ??
          emailData.email.cc[0] ??
          emailData.email.bcc[0] ??
          'No one'
        }
      />,
      () =>
        setApproveEmail({
          user_email_id: emailData.id,
          note: '',
          approve_after: valueApproveIn.hour() * 60 + valueApproveIn.minute(),
          status: 'approved',
        }),
    );
    setIsOpenModal(false);
  };

  const handleOnDecline = (data: EmailResponse) => (e) => {
    setAlertDialogData(
      '',
      <AlertWithEmailAction
        title='Are you sure want to "decline" this mail?'
        emailTitle={emailData.email.subject ?? 'Empty'}
        writer={
          emailData.email.from ??
          emailData.email.cc[0] ??
          emailData.email.bcc[0] ??
          'No one'
        }
      />,
      () => updateEmailStatus('DECLINED'),
    );
  };

  const handleOnApprove = (data: EmailResponse) => (e) => {
    setIsOpenModal(true);
  };

  const handleUndoEmail = () => {
    undoEmailMutate({ emailId: emailData.id });
  };

  const handleSendEmail = () => {
    setApproveEmail({
      user_email_id: emailData.id,
      note: '',
      status: 'approved',
      approve_after: 0,
    });
  };

  const handleEmployeeCancel = () => {
    setAlertDialogData(
      '',
      <AlertWithEmailAction
        title='Are you sure want to "cancel" this mail?'
        emailTitle={emailData.email.subject ?? 'Empty'}
        writer={
          emailData.email.from ??
          emailData.email.cc[0] ??
          emailData.email.bcc[0] ??
          'No one'
        }
      />,
      () =>
        setApproveEmail({
          user_email_id: emailData.id,
          status: 'DRAFT',
          approve_after: valueApproveIn.hour() * 60 + valueApproveIn.minute(),
          note: '',
        }),
    );
  };

  return (
    <Box ref={ref}>
      <EmailMess
        emailData={emailData}
        onChangeStatus={onChangeStatus}
        onShowHistory={onShowHistory}
        type={type}
        userInfo={userInfo}
        index={index}
        isShowActions={isShowActions}
        isShowHeader={isShowHeader}
        onUpdateHashtagClick={onUpdateHashtagClick}
        onDecline={handleOnDecline}
        onApprove={handleOnApprove}
        onEmployeeCancel={handleEmployeeCancel}
        onUndoEmail={handleUndoEmail}
        onApproveNow={handleApproveNow}
        onSendEmail={handleSendEmail}
      />
      <AlertDialog
        titleLabel={alertDialogTitle}
        descriptionLabel={alertDialogDescription}
        isLoading={isAlertDialogLoading}
        isOpen={isAlertDialogOpen}
        onClose={onAlertDialogClose}
        onAgree={alertDialogCallback}
        onDisagree={onAlertDialogClose}
      />
      <ModalBase
        isOpen={isOpenModal}
        title="Set time to Approve"
        submitLabel=""
        onClose={() => setIsOpenModal(false)}>
        <SettimeInput
          value={valueApproveIn}
          setValueCalendar={(newValue: dayjs.Dayjs | null) =>
            newValue && setValueApproveIn(newValue)
          }
        />
        <Box className="flex gap-2">
          <Button onClick={handleApproveNow} color="error">
            Approve Now
          </Button>
          <Button onClick={handleApproveSettime}>Approve</Button>
        </Box>
      </ModalBase>
    </Box>
  );
};

const EmailMessContainer = forwardRef(EmailMessContainerRef);

export default EmailMessContainer;
