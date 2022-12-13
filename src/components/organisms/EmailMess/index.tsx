import { Avatar, Box, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './styles.module.scss';
import AttachFiles from '@components/atoms/AttachFiles';
import EmailStatus from '@components/atoms/EmailStatus';
import OptionalAvatar from '@components/atoms/OptionalAvatar';

import EmailActions from '@components/molecules/EmailActions';
import { useMemo, useState } from 'react';
import EmailForward from '../EmailForward';
import { approveEmail, EmailResponse, updateEmailWithQuery } from '@api/email';
import { UserInfo } from '../Email/Interface';
import EmailPrivateHashtagContainer from '@containers/EmailPrivateHashtagContainer';
import AlertDialog from '@components/molecules/AlertDialog';
import { useMutation } from '@tanstack/react-query';
import { emailData } from '@layouts/EmailStatusBar';
import { toast } from 'react-toastify';
import { string } from 'yup';
import { useDispatch } from 'react-redux';
import { deleteIndexEmail, HashtagTabs } from '@redux/Email/reducer';
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
  onChangeStatus: (status: any, index: any) => void;
  onShowHistory: Function;
  status: string;
  type?: string;
  isShowHeader?: boolean;
  isShowActions?: boolean;
  index?: number;
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
}) => {
  const defaultStatus = useMemo(() => status, []);

  // const [editor, setEditor] = useState(() => EditorState.createEmpty());

  // useEffect(() => {
  //   const contentState = convertFromRaw(JSON.parse(mailContent));
  //   setEditor(EditorState.createWithContent(contentState));
  // }, []);

  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState<boolean>(false);
  const [isOpenAlertDialogEmailApproved, setIsOpenAlertDialogEmailApproved] =
    useState<boolean>(false);
  const [alertDialog, setAlertDialog] = useState<{
    title: string;
    desc: string;
  }>({
    title: 'Alert',
    desc: 'Are you sure?',
  });

  const cloneSendTo = !!emailData.to ? [...emailData.to] : [];

  const remapPrivateHashtag: HashtagTabs[] = emailData.tags
    ? emailData.tags.map((val) => ({
        notiNumber: 0,
        status: 'hashtag',
        title: `#${val}`,
        value: val,
      }))
    : [];

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
      mutationFn: (status: 'PENDING' | 'APPROVED' | 'DECLINED') => approveEmail({ email_id: emailData.id, status: status }),
      onSuccess() {
        dispatch(deleteIndexEmail(index));
        setIsOpenAlertDialog(false);
        toast.success('Decline Successful!');
      },
    });

  const { mutate: setApproveEmail, isLoading: isLoadingApprovedEmail } = useMutation(
    {
      mutationKey: ['Approve-email'],
      mutationFn: async (query: {
        email_id: number;
        status: 'PENDING';
        note: string;
        send_after: number;
      }) => await approveEmail(query),
      onSuccess() {
        dispatch(deleteIndexEmail(index));
        setIsOpenAlertDialogEmailApproved(false);
        toast.success('Email has been Approved');
      },
    },
  );

  // localStore
  const currRole = localStorage.getItem('current_role');

  // useDispatch
  const dispatch = useDispatch();

  // Handle FUNC

  const handleOnDecline = (data: EmailResponse) => (e) => {
    setAlertDialog({
      title: 'Alert',
      desc: `Are you sure want to decline with title "${
        data.subject ?? 'Empty'
      }" from writer "${data.from ?? data.cc[0] ?? data.bcc[0] ?? 'No one'}"?`,
    });
    setIsOpenAlertDialog(true);
  };

  const handleOnApprove = (data: EmailResponse) => (e) => {
    setAlertDialog({
      title: 'Alert',
      desc: `Are you sure want to Approve with title "${
        data.subject ?? 'Empty'
      }" from writer "${data.from ?? data.cc[0] ?? data.bcc[0] ?? 'No one'}"?`,
    });
    setIsOpenAlertDialogEmailApproved(true);
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

  const _renderActionsApproved = useMemo(() => {
    return (
      <Box className="flex actions justify-end py-4">
        <Box className="flex items-center border border-[#9696C6] px-4 py-2 rounded-[16px]">
          <Box className="pr-7">
            <p className="text-[#181818] text-[14px] font-normal">
              Your email will be sent in
              <span className="text-[#554CFF] inline-block pl-1">8 minutes</span>
            </p>
          </Box>
          <Box>
            <Button className="bg-transparent hover:bg-slate-200 text-[#554CFF] font-bold">
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }, []);

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
            ? [emailData.from]
            : status === 'replyAll'
            ? emailData.to
            : emailData.to
        }
        sendToDefault={
          status === 'reply'
            ? [emailData.from]
            : status === 'replyAll'
            ? emailData.to
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
            isShowAvatar={true}
            optionDate={emailData.created_at}
          />
        </Box>
        {isShowActions && (
          <Box className="w-full flex">
            <Box className="flex-1">
              <EmailActions
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
            {emailData.subject}
          </h1>
          {renderSendTo()}
          {status.toLowerCase() !== 'null' && <EmailStatus emailStatus={status} />}
        </Box>
        {/* Email Content */}
        <Box className="py-9">
          <Box>
            <p dangerouslySetInnerHTML={createMarkup(emailData.html_string)} />
          </Box>
        </Box>
        {/* Files List If have */}
        {emailData.attachFiles && (
          <AttachFiles data={emailData.attachFiles} isUpload={false} />
        )}
        {/* Email Private Hashtag */}
        <EmailPrivateHashtagContainer defaultData={remapPrivateHashtag ?? []} />
        {/* Actions */}
        {(status === 'PENDING' || status === 'SENDING') &&
          !currRole?.startsWith('EMPLOYEE') && (
            <Box className="flex flex-wrap actions justify-end py-4">
              <Box className="w-full h-[1px] bg-[#E0E0E0] mb-5"></Box>
              {status === 'PENDING' ? _renderActionsPending : _renderActionsSending}
            </Box>
          )}
        {status === 'APPROVED' && _renderActionsApproved}
      </Box>
      {/* Layer if status === 'Reply || ReplyAll' */}
      {(status === 'reply' || status === 'replyAll' || status === 'forward') &&
        _renderStatusLayer}

      {/* Alert Dialog Declined */}
      <AlertDialog
        descriptionLabel={alertDialog.desc}
        isLoading={isLoadingUpdateEmailStatus}
        isOpen={isOpenAlertDialog}
        onClose={() => {
          setIsOpenAlertDialog(false);
        }}
        onAgree={() => {
          updateEmailStatus('DECLINED');
        }}
        onDisagree={() => {
          setIsOpenAlertDialog(false);
        }}
        titleLabel={alertDialog.title}
      />
      {/* Alert Dialog Approved */}
      <AlertDialog
        titleLabel={alertDialog.title}
        descriptionLabel={alertDialog.desc}
        isLoading={isLoadingApprovedEmail}
        isOpen={isOpenAlertDialogEmailApproved}
        onClose={() => {
          setIsOpenAlertDialogEmailApproved(false);
        }}
        onAgree={() => {
          setApproveEmail({
            email_id: emailData.id,
            note: '',
            send_after: 15,
            status: 'PENDING',
          });
        }}
        onDisagree={() => {
          setIsOpenAlertDialogEmailApproved(false);
        }}
      />
    </Box>
  );
};

export default EmailMess;
