import { Avatar, Badge, Box, Button, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './styles.module.scss';
import AttachFiles from '@components/atoms/AttachFiles';
import EmailStatus from '@components/atoms/EmailStatus';
import OptionalAvatar from '@components/atoms/OptionalAvatar';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import EmailActions, {
  ActionListTypes,
  ActionNameTypes,
} from '@components/molecules/EmailActions';
import { useCallback, useMemo, useRef, useState } from 'react';
import EmailForward from '../EmailForward';
import { attachs, EmailResponse } from '@api/email';
import { UserInfo } from '../Email/Interface';
import EmailPrivateHashtagContainer from '@containers/EmailPrivateHashtagContainer';
import { HashtagTabs } from '@redux/Email/reducer';
import dayjs, { Dayjs } from 'dayjs';
import ControlEmailSend from '../ControlEmailSend';
import EmailGreeting from '@components/molecules/EmailGreeting';
import LogoWithLabel from '@components/atoms/LogoWithLabel';
import Icon from '@components/atoms/Icon';
import { rem } from '@utils/functions';
import { useParams, useSearchParams } from 'react-router-dom';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import SendIcon from '@mui/icons-material/Send';
import { color } from 'd3-color';
import { data } from 'autoprefixer';
import EmailActionLayoutContainer, {
  useEmailActionLayout,
} from '@containers/EmailActionsLayoutContainer';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
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
  // onChangeStatus: (status: any, index: any) => void;
  onShowHistory: Function;
  type: 'receive' | 'send';
  isShowHeader?: boolean;
  hiddenActions?: ActionListTypes;
  isShowActions?: boolean;
  index?: number;
  onUpdateHashtagClick?: (hashtags: HashtagTabs[]) => void;

  onDecline: (data: EmailResponse) => void;
  onApprove: (data: EmailResponse) => void;
  onEmployeeCancel: () => void;
  onUndoEmail: () => void;
  onApproveNow: () => void;
  onSendEmail: () => void;
  onContinueClick?: () => void;
  onActionsClick?: (action: ActionNameTypes) => void;
  onInterSecting?: (entry: IntersectionObserverEntry) => void;
  onUnInterSecting?: () => void;
}

export const attachsToAttachFiles: (attachs: attachs[]) => AttachFile[] = (
  attachs,
) =>
  attachs.map((file) => {
    const clonePath = file.path ?? "file 's not found";

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

interface EmailMessRightSideBarProps {
  userInfo: UserInfo;
  emailData: EmailResponse;
  sentAt: Date;
}

const EmailMessRightSideBar: React.FC<EmailMessRightSideBarProps> = ({
  userInfo,
  emailData,
  sentAt,
}) => {
  const emailActionType = useMemo(() => {
    const isTimeNowLessThanSendTime = sentAt.getTime() > Date.now();

    if (emailData.type === 'sender') {
      if (isTimeNowLessThanSendTime) return 'sendAfter';
      return 'sender';
    }
    return 'receive';
  }, [emailData.type]);

  const _renderEmailActionTypeIcon = useMemo(() => {
    switch (emailActionType) {
      case 'receive':
        return (
          <Box className="flex justify-center">
            <Icon icon="reply" />
          </Box>
        );
      case 'sender':
        return (
          <Box className="flex justify-center">
            <SendIcon sx={{ color: '#999999' }} />
          </Box>
        );
      case 'sendAfter':
        return (
          <Box className="flex justify-center">
            <ScheduleSendIcon sx={{ color: '#999999' }} />
          </Box>
        );

      default:
        return (
          <Box>
            <SendIcon />
          </Box>
        );
    }
  }, [emailActionType]);

  return (
    <Box className={`px-4 flex flex-col gap-4`}>
      <Box>
        <Avatar alt={userInfo.name} src={userInfo.avatar} />
      </Box>
      {_renderEmailActionTypeIcon}
      <Box>
        <Icon
          icon="star"
          color={`${emailData.is_important ? '#FAAF00' : '#999999'}`}
          width={22}
          height={22}
        />
      </Box>
      <Box className="flex flex-col justify-center gap-4">
        <Badge
          badgeContent={4}
          color="error"
          max={9}
          sx={{
            justifyContent: 'center',
          }}>
          <Icon width={30} height={30} icon="reply" />
        </Badge>
        <Badge
          badgeContent={11}
          color="error"
          max={9}
          sx={{
            justifyContent: 'center',
          }}>
          <Icon width={30} height={30} icon="replyAll" />
        </Badge>
      </Box>
    </Box>
  );
};

const EmailMess: React.FC<Props> = ({
  type,
  userInfo,
  emailData,
  onShowHistory,
  isShowHeader = false,
  hiddenActions = true,
  isShowActions = false,
  index,
  // onChangeStatus,
  onUpdateHashtagClick,

  onDecline,
  onApprove,
  onEmployeeCancel,
  onUndoEmail,
  onApproveNow,
  onSendEmail,
  onActionsClick,
  onContinueClick,
  onInterSecting,
  onUnInterSecting
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultStatus = useMemo(() => emailData.status, []);
  const [newHashtagList, setNewHashtagList] = useState<HashtagTabs[] | undefined>(
    undefined,
  );
  const [isShowLimitTitle, setIsShowLimitTitle] = useState<boolean>(false);

  const sentAt = new Date(emailData.send_at);
  const approveAt = new Date(emailData.approve_at);

  useIntersectionObserver(
    containerRef,
    (entry) => {
      if (onInterSecting) onInterSecting(entry);
    },
    onUnInterSecting,
  );


  const cloneSendTo = [
    ...(emailData.email.to ?? []),
    ...(emailData.email.cc ?? []),
    ...(emailData.email.bcc ?? []),
  ];

  // useMemo

  const remapPrivateHashtag = useMemo<HashtagTabs[]>(() => {
    return emailData.hashtags
      ? emailData.hashtags.map((val) => ({
        notiNumber: 0,
        status: 'hashtag',
        title: `#${val.hashtag}`,
        value: val.hashtag,
        color: '#4BAAA2',
      }))
      : [];
  }, [emailData]);

  const _renderAttachesFiles = useMemo(() => {
    if (!emailData.email.attachments) return null;

    const newAttachesFile: AttachFile[] = attachsToAttachFiles(
      emailData.email.attachments.map(value => ({ id: value.id, email_id: value.email_id, path: value.filename })),
    );

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

  // localStore
  const currRole = localStorage.getItem('current_role')?.toUpperCase();

  // Handle FNC
  const handleNavigateShowLimitTitle = (e) => {
    e.stopPropagation();

    setIsShowLimitTitle((prevState) => !prevState);
  };

  // Render FUNC

  const _renderActionsPendingItems = useMemo(() => {
    const _renderActionsPendingItem = () => {
      if (currRole?.startsWith('EMPLOYEE')) {
        if (approveAt.getTime() > Date.now())
          return (
            <Box className={`${type === 'send' && 'flex-1'}`}>
              <ControlEmailSend
                variant="employeeViewApproveTime"
                title="Email will be approved in: "
                // scheduleAt={dayjs(sentAt).format('MMMM, DD YYYY - HH:mm')}
                remainMinutes={Math.floor(
                  (approveAt.getTime() - Date.now()) / 1000 / 60,
                )}
              />
            </Box>
          );

        if (emailData.type === 'sender' && sentAt.getTime() > Date.now())
          return (
            <Box>
              <ControlEmailSend
                variant="cancel"
                scheduleAt={dayjs(sentAt).format('MMMM, DD YYYY - HH:mm')}
                remainMinutes={Math.floor(
                  (sentAt.getTime() - Date.now()) / 1000 / 60,
                )}
                onCancel={onEmployeeCancel}
              />
            </Box>
          );
        else {
          return (
            <Box>
              <ControlEmailSend
                variant="cancel"
                scheduleAt={dayjs(sentAt).format('MMMM, DD YYYY - HH:mm')}
                remainMinutes={Math.floor(
                  (sentAt.getTime() - Date.now()) / 1000 / 60,
                )}
                onCancel={onEmployeeCancel}
              />
            </Box>
          );
        }
      } else {
        if (approveAt.getTime() > Date.now())
          return (
            <Box className="flex-1">
              <ControlEmailSend
                variant="undoSendNow"
                scheduleAt={dayjs(approveAt).format('MMMM, DD YYYY - HH:mm')}
                remainMinutes={Math.floor(
                  (approveAt.getTime() - Date.now()) / 60000,
                )}
                onUndo={onUndoEmail}
                onSend={onApproveNow}
              />
            </Box>
          );
        else
          return (
            <Box className="flex flex-1 justify-end">
              <Button
                onClick={() => onDecline(emailData)}
                className="mx-1 bg-rose-600 py-1.5 px-5 hover:bg-rose-500">
                DECLINE
              </Button>
              <Button onClick={() => onApprove(emailData)} className="mx-1 py-1.5 px-5">
                APPROVE
              </Button>
            </Box>
          );
      }
    };

    if (
      emailData.status.toUpperCase() === 'PENDING' ||
      emailData.status.toUpperCase() === 'SENDING'
    )
      return (
        <Box className="flex flex-wrap actions items-center py-4 justify-between w-full">
          {_renderActionsPendingItem()}
        </Box>
      );
    else return null;
  }, [sentAt, approveAt, emailData.status, currRole]);

  const _renderStatusLayer = useMemo(() => {
    return (
      <EmailForward
        emailData={emailData}
        onChangeEmailStatus={() => {
          onActionsClick && onActionsClick(defaultStatus as ActionNameTypes);
        }}
        isReadOnlyReceivers={!(emailData.status === 'forward')}
        sendTo={
          emailData.status === 'reply'
            ? [emailData.email.from]
            : emailData.status === 'replyAll'
              ? emailData.email.to
              : emailData.email.to
        }
      />
    );
  }, [emailData.status]);

  const _renderEmailTitle = useMemo(() => {
    const emailTitle = emailData.email.subject;
    const limitShow = 250;
    if (!emailTitle) return <h1 className="text-stone-700 font-bold text-base"></h1>;
    if (emailTitle?.length < limitShow) {
      return (
        <h1 className="text-stone-700 font-bold text-base">
          {emailData.email.subject}
        </h1>
      );
    }
    return (
      <h1 className="text-stone-700 font-bold text-base">
        <span>{emailTitle?.substring(0, limitShow)}...</span>
        {isShowLimitTitle && <span>{emailTitle?.substring(limitShow)}</span>}
        <span
          onClick={handleNavigateShowLimitTitle}
          className="pl-2 inline-block text-[14px] hover:opacity-80"
          style={{
            color: '#304ffe',
          }}>
          {isShowLimitTitle ? 'Show Less' : 'Show More'}
        </span>
      </h1>
    );
  }, [emailData, isShowLimitTitle]);

  return (
    <Box
      className={`o-EmailMess w-full relative flex flex-wrap ${type === 'send' && styles.flexRowReverse
        }`}
      ref={containerRef}
    >
      <Box
        className={`w-full flex flex-wrap ${styles.emailHeader} ${isShowHeader && styles.showEmailHeader
          } ${type === 'send' && styles.flexRowReverse}`}>
        <Box className={`flex-1`}>
          <OptionalAvatar
            className={` ${type === 'send' && styles.flexRowReverse}`}
            data={userInfo}
            isShowAvatar={false}
            optionDate={emailData.created_at}
          />
        </Box>
        {hiddenActions !== true && (
          <Box className="w-full flex">
            <Box className="flex-1">
              <EmailActions
                hiddenActions={hiddenActions}
                isImportant={!!emailData.is_important}
                type={type}
                isActiveClick={true}
                emailId={emailData.id}
                onActionClick={onActionsClick}
              />
            </Box>
          </Box>
        )}
      </Box>

      <EmailMessRightSideBar
        emailData={emailData}
        sentAt={sentAt}
        userInfo={userInfo}
      />
      <Box
        sx={{ boxShadow: '0px 10px 23px -15px rgba(159,159,159,0.54)' }}
        className={`flex-1 overflow-hidden bg-white ${type === 'send'
            ? 'rounded-tl-[36px] rounded-br-[36px]'
            : 'rounded-tr-[36px] rounded-bl-[36px]'
          } ${styles.emailWrap} mb-8`}>
        {/* Header */}
        <Box
          className={`flex items-center justify-between cursor-pointer pb-6 bg-violet-200 py-4 ${type === 'send'
              ? 'rounded-br-[36px] rounded-tl-[36px]'
              : 'rounded-bl-[36px] rounded-tr-[36px]'
            }  relative`}
          onClick={() => onShowHistory(emailData, emailData.id)}>
          <div className="flex flex-col gap-2">
            {_renderEmailTitle}
            {renderSendTo()}
          </div>
          {emailData.status.toLowerCase() !== 'null' && (
            <Box display="flex" alignItems="center">
              {emailData?.status?.toLowerCase() === 'draft' && (
                <Button
                  sx={{ mr: rem(16), borderRadius: rem(20) }}
                  onClick={onContinueClick}>
                  <CreateIcon sx={{ fontSize: rem(20) }} />
                  <Typography
                    sx={{ ml: rem(8), fontSize: rem(14), fontWeight: 500, lineHeight: rem(20) }}>
                    Continue
                  </Typography>
                </Button>
              )}
              <EmailStatus emailStatus={emailData.status.toLowerCase()} />
            </Box>
          )}
        </Box>
        {/* Email Content */}
        <Box className="py-9">
          <Box>
            <p dangerouslySetInnerHTML={createMarkup(emailData.email.html_body)} />
          </Box>
        </Box>
        {/* Signature */}
        {emailData.email?.signature && (
          <Box>
            <Typography dangerouslySetInnerHTML={{ __html: emailData.email.signature.text_html }}></Typography>
          </Box>
        )}
        {/* <EmailGreeting
          greetingLabel="Thanks and Best regards, ------"
          isHaveLogo={true}
          logo={<LogoWithLabel />}
        /> */}
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
        <Box sx={{ backgroundColor: '#F1F1F6' }} display="flex" alignItems="center">
          {_renderActionsPendingItems}
          {emailData.status.toUpperCase() === 'APPROVED' &&
            !currRole?.startsWith('EMPLOYEE') &&
            approveAt.getTime() > Date.now() && (
              <Box className="py-4">
                <ControlEmailSend
                  remainMinutes={Math.floor(
                    ((sentAt.getTime() > approveAt.getTime()
                      ? sentAt.getTime()
                      : approveAt.getTime()) -
                      new Date().getTime()) /
                    1000 /
                    60,
                  )}
                  onSend={onSendEmail}
                  onUndo={onUndoEmail}
                />
              </Box>
            )}
        </Box>
      </Box>
      {/* Layer if status === 'Reply || ReplyAll' */}
      {(emailData.status === 'reply' ||
        emailData.status === 'replyAll' ||
        emailData.status === 'forward') &&
        _renderStatusLayer}
    </Box>
  );
};

export default EmailMess;
