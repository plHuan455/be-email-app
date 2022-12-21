import { Avatar, Box, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './styles.module.scss';
import AttachFiles from '@components/atoms/AttachFiles';
import EmailStatus from '@components/atoms/EmailStatus';
import OptionalAvatar from '@components/atoms/OptionalAvatar';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import EmailActions from '@components/molecules/EmailActions';
import { useCallback, useMemo, useState } from 'react';
import EmailForward from '../EmailForward';
import {
  approveEmail,
  EmailResponse,
  undoEmail,
  updateEmailWithQuery,
} from '@api/email';
import { UserInfo } from '../Email/Interface';
import EmailPrivateHashtagContainer from '@containers/EmailPrivateHashtagContainer';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { emailData } from '@layouts/EmailStatusBar';
import { toast } from 'react-toastify';
import { string } from 'yup';
import { useDispatch } from 'react-redux';
import { deleteIndexEmail, HashtagTabs } from '@redux/Email/reducer';
import dayjs, { Dayjs } from 'dayjs';
import ModalBase from '@components/atoms/ModalBase';
import SettimeInput from '@components/molecules/SettimeInput';
import ControlEmailSend from '../ControlEmailSend';
import { isEmpty } from 'lodash';
export interface UserRead {
  name: string;
  time: string;
}
export interface AttachFile {
  type: string;
  name: string;
  url: string;
  userRead?: UserRead[];
}

function createMarkup(htmlString) {
  return { __html: htmlString };
}

interface Props {
  emailData: EmailResponse;
  userInfo: UserInfo;
  // isShowContent: boolean;
  onChangeStatus: (status: any, index: any) => void;
  onShowHistory: Function;
  status: string;
  type: 'receive' | 'send';
  isShowHeader?: boolean;
  isShowActions?: boolean;
  index?: number;
  onUpdateHashtagClick?: (hashtags: HashtagTabs[]) => void;
}

const EmailMess: React.FC<Props> = ({
  status,
  type,
  userInfo,
  emailData,
  onShowHistory,
  isShowHeader = false,
  isShowActions = false,
  index,
  onChangeStatus,
  onUpdateHashtagClick,
}) => {
  const defaultStatus = useMemo(() => status, []);
  const [valueApproveIn, setValueApproveIn] = useState<Dayjs>(dayjs('2022-04-07'));
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [newHashtagList, setNewHashtagList] = useState<HashtagTabs[] | undefined>(
    undefined,
  );

  const sentAt = new Date(emailData.send_at);
  const approveAt = new Date(emailData.approve_at);

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

  const cloneSendTo = !!emailData.email.to ? [...emailData.email.to] : [];

  const remapPrivateHashtag = useMemo<HashtagTabs[]>(() => {
    return emailData.tags
      ? emailData.tags.map((val) => ({
          notiNumber: 0,
          status: 'hashtag',
          title: `#${val}`,
          value: val,
          color: '#4BAAA2',
        }))
      : [];
  }, []);

  const _renderAttachesFiles = useMemo(() => {
    if (!emailData.email.attachs) return null;

    const newAttachesFile: AttachFile[] = emailData.email.attachs.map((file) => {
      const clonePath = file.path;

      const fileName = clonePath.replace(/^.*[\\\/]/, '');

      const fileType = /[.]/.exec(fileName)
        ? /[^.]+$/.exec(fileName)?.toString()
        : undefined;

      return {
        name: fileName,
        type: fileType ? fileType : 'file',
        url: file.path,
      };
    });

    return <AttachFiles data={newAttachesFile} isUpload={false} />;
  }, [emailData]);

  const renderSendTo = () => {
    const sendToLength = cloneSendTo.length;

    if (sendToLength > 2) {
      const splice2FirstItems = cloneSendTo.splice(0, 2);

      const restLength = cloneSendTo.length;

      return (
        <Box className="text-sm text-stone-600 first-letter:capitalize">
          <span>{`${splice2FirstItems
            .map((item) => item)
            .join(', ')} and ${restLength} more`}</span>
          <span
            className={`${styles.moreSendTo} pl-1 hover:cursor-pointer relative`}>
            <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
            <ul className="absolute top-0 right-0 translate-x-full bg-white p-0.5 rounded">
              {cloneSendTo.map((value, index) => (
                <li key={index}>
                  <p className="hover:bg-slate-200 py-0.5  px-2 text-[11px]">
                    {value}
                  </p>
                </li>
              ))}
            </ul>
          </span>
        </Box>
      );
    }

    return (
      <p className="text-sm text-stone-600 first-letter:capitalize">
        <span>{`${cloneSendTo.map((item) => item).join(', ')}`}</span>
      </p>
    );
  };

  // useMutation
  const { mutate: updateEmailStatus, isLoading: isLoadingUpdateEmailStatus } =
    useMutation({
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

  const { mutate: setApproveEmail, isLoading: isLoadingApprovedEmail } = useMutation(
    {
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
    },
  );

  const { mutate: undoEmailMutate, isLoading: isUndoEmailLoading } = useMutation({
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

  // localStore
  const currRole = localStorage.getItem('current_role')?.toUpperCase();

  // useDispatch
  const dispatch = useDispatch();

  // Handle FUNC

  const handleApproveNow = () => {
    setApproveEmail({
      user_email_id: emailData.id,
      note: '',
      approve_after: 0,
      status: 'approved',
    });
    setIsOpenModal(false);
  };

  const handleApproveSettime = (e) => {
    setApproveEmail({
      user_email_id: emailData.id,
      note: '',
      approve_after: valueApproveIn.minute() * 60 + valueApproveIn.second(),
      status: 'approved',
    });
    setIsOpenModal(false);
  };

  const handleOnDecline = (data: EmailResponse) => (e) => {
    setAlertDialogData(
      'Alert',
      `Are you sure want to decline with title "${
        data.email.subject ?? 'Empty'
      }" from writer "${
        data.email.from ?? data.email.cc[0] ?? data.email.bcc[0] ?? 'No one'
      }"?`,
      () => updateEmailStatus('DECLINED'),
    );
  };

  const handleOnApprove = (data: EmailResponse) => (e) => {
    // setAlertDialogData(
    //   'Alert',
    //   `Are you sure want to Approve with title "${
    //     data.subject ?? 'Empty'
    //   }" from writer "${data.from ?? data.cc[0] ?? data.bcc[0] ?? 'No one'}"?`,
    //   () =>
    //     setApproveEmail({
    //       email_id: emailData.id,
    //       note: '',
    //       send_after: 15 * 60,
    //       status: 'APPROVED',
    //     }),
    // );
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
    setAlertDialogData('Alert', 'Are you sure to cancel this email', () =>
      setApproveEmail({
        user_email_id: emailData.id,
        status: 'DRAFT',
        approve_after: valueApproveIn.hour() * 60 + valueApproveIn.minute(),
        note: '',
      }),
    );
  };

  // Render FUNC
  const _renderActionsPending = useMemo(() => {
    return (
      <>
        <Button
          onClick={handleOnDecline(emailData)}
          className="mx-1 bg-rose-600 py-1.5 px-5 hover:bg-rose-500">
          DECLINE
        </Button>
        <Button onClick={handleOnApprove(emailData)} className="mx-1 py-1.5 px-5">
          APPROVE
        </Button>
      </>
    );
  }, []);

  const _renderActionsPendingItems = useMemo(() => {
    const _renderActionsPendingItem = () => {
      if (currRole?.startsWith('EMPLOYEE')) {
        if (emailData.type === 'send' && sentAt.getTime() > Date.now())
          return (
            <Box>
              <ControlEmailSend
                variant="cancel"
                remainMinutes={Math.floor(
                  (sentAt.getTime() - Date.now()) / 1000 / 60,
                )}
                onCancel={handleEmployeeCancel}
              />
            </Box>
          );
        else return null;
      } else {
        if (approveAt.getTime() > Date.now())
          return (
            <Box>
              <ControlEmailSend
                variant="undoSendNow"
                remainMinutes={Math.floor(
                  (approveAt.getTime() - Date.now()) / 60000,
                )}
                onUndo={handleUndoEmail}
                onSend={handleApproveNow}
              />
            </Box>
          );
        else
          return (
            <Box className="flex flex-1 justify-end">
              <Button
                onClick={handleOnDecline(emailData)}
                className="mx-1 bg-rose-600 py-1.5 px-5 hover:bg-rose-500">
                DECLINE
              </Button>
              <Button
                onClick={handleOnApprove(emailData)}
                className="mx-1 py-1.5 px-5">
                APPROVE
              </Button>
            </Box>
          );
      }
    };

    if (status.toUpperCase() === 'PENDING' || status.toUpperCase() === 'SENDING')
      return (
        <Box className="flex flex-wrap actions items-center py-4 justify-between">
          {_renderActionsPendingItem()}
        </Box>
      );
    else return null;
  }, [sentAt, approveAt, status, currRole]);

  const _renderActionsSending = useMemo(() => {
    return (
      <Box className="flex items-center bg-[#F6F3FD] rounded-[12px] py-1 px-2.5">
        <Box className="pr-4">
          <p className="text-[#181818] text-[14px] font-medium">
            This email will be sent in:{' '}
            <span className="text-[#554CFF]">13 minutes</span>
          </p>
        </Box>
        <Box>
          <Button className="bg-transparent text-[#181818] font-bold hover:bg-slate-200">
            Undo
          </Button>
          <Button className="bg-transparent text-[#FFB800] font-bold hover:bg-slate-200">
            Send
          </Button>
        </Box>
      </Box>
    );
  }, []);

  const _renderActionsApproved = ({
    remainMinute,
    onCancel,
  }: {
    remainMinute: number;
    onCancel: () => void;
  }) => {
    return (
      <Box className="flex actions justify-end py-4">
        <Box className="flex items-center border border-[#9696C6] px-4 py-2 rounded-[16px]">
          <Box className="pr-7">
            <p className="text-[#181818] text-[14px] font-normal">
              Your email will be sent in
              <span className="text-[#554CFF] inline-block pl-1">
                {remainMinute} minutes
              </span>
            </p>
          </Box>
          <Box>
            <Button
              className="bg-transparent hover:bg-slate-200 text-[#554CFF] font-bold"
              onClick={onCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };

  const _renderStatusLayer = useMemo(() => {
    return (
      <EmailForward
        status={status}
        onChangeEmailStatus={() => {
          onChangeStatus(defaultStatus, index);
        }}
        isReadOnlyReceivers={!(status === 'forward')}
        classNameLayer="absolute top-0 left-0 w-full h-full"
        classNameContent="shadow-lg p-4 absolute z-10 top-1/2 right-[40px] w-[90%] -translate-y-1/2 bg-white rounded-[11px] border border-[#E3E3E3] "
        sendTo={
          status === 'reply'
            ? [emailData.email.from]
            : status === 'replyAll'
            ? emailData.email.to
            : emailData.email.to
        }
        sendToDefault={
          status === 'reply'
            ? [emailData.email.from]
            : status === 'replyAll'
            ? emailData.email.to
            : []
        }
      />
    );
  }, [status]);

  return (
    <Box
      className={`o-EmailMess w-full relative flex flex-wrap ${
        type === 'send' && styles.flexRowReverse
      }`}>
      <Box
        className={`w-full flex flex-wrap ${styles.emailHeader} ${
          isShowHeader && styles.showEmailHeader
        } ${type === 'send' && styles.flexRowReverse}`}>
        <Box className={`flex-1`}>
          <OptionalAvatar
            className={` ${type === 'send' && styles.flexRowReverse}`}
            data={userInfo}
            isShowAvatar={false}
            optionDate={emailData.created_at}
          />
        </Box>
        {isShowActions && (
          <Box className="w-full flex">
            <Box className="flex-1">
              <EmailActions
                type={type}
                isActiveClick={true}
                emailIndex={index}
                handleChangeStatus={onChangeStatus}
              />
            </Box>
          </Box>
        )}
      </Box>

      <Box className={`w-[10%] flex ${type === 'send' && 'justify-end'}`}>
        <Avatar alt={userInfo.name} src={userInfo.avatar} />
      </Box>
      <Box
        sx={{ boxShadow: '0px 10px 23px -15px rgba(159,159,159,0.54)' }}
        className={`flex-1 bg-white ${
          type === 'send'
            ? 'rounded-tl-[36px] rounded-br-[36px]'
            : 'rounded-tr-[36px] rounded-bl-[36px]'
        } pb-4 ${styles.emailWrap} mb-8`}>
        {/* Header */}
        <Box
          className={`cursor-pointer pb-6 bg-violet-200 py-4 ${
            type === 'send'
              ? 'rounded-br-[36px] rounded-tl-[36px]'
              : 'rounded-bl-[36px] rounded-tr-[36px]'
          }  relative`}
          onClick={() => onShowHistory(emailData, emailData.id)}>
          <h1 className="text-stone-700 font-bold text-base mb-2">
            {emailData.email.subject}
          </h1>
          {renderSendTo()}
          {status.toLowerCase() !== 'null' && <EmailStatus emailStatus={status} />}
        </Box>
        {/* Email Content */}
        <Box className="py-9">
          <Box>
            <p dangerouslySetInnerHTML={createMarkup(emailData.email.text_html)} />
          </Box>
        </Box>
        {/* Files List If have */}
        {_renderAttachesFiles}
        {/* Email Private Hashtag */}
        <EmailPrivateHashtagContainer
          defaultData={newHashtagList ? newHashtagList : remapPrivateHashtag}
          onChangeDefaultData={(data) => {
            setNewHashtagList([...data]);
          }}
          onCheckClick={() => {
            if (onUpdateHashtagClick) {
              onUpdateHashtagClick(
                newHashtagList ? newHashtagList : remapPrivateHashtag,
              );
            }
          }}
        />
        {/* Actions */}
        {_renderActionsPendingItems}
        {status === 'APPROVED' && sentAt.getTime() > Date.now() && (
          <ControlEmailSend
            remainMinutes={Math.floor(
              (sentAt.getTime() - new Date().getTime()) / 1000 / 60,
            )}
            onSend={handleUndoEmail}
            onUndo={handleSendEmail}
          />
        )}
      </Box>
      {/* Layer if status === 'Reply || ReplyAll' */}
      {(status === 'reply' || status === 'replyAll' || status === 'forward') &&
        _renderStatusLayer}
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

export default EmailMess;
