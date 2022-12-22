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
import { attachs, EmailResponse } from '@api/email';
import { UserInfo } from '../Email/Interface';
import EmailPrivateHashtagContainer from '@containers/EmailPrivateHashtagContainer';
import { HashtagTabs } from '@redux/Email/reducer';
import dayjs, { Dayjs } from 'dayjs';
import ControlEmailSend from '../ControlEmailSend';
import EmailGreeting from '@components/molecules/EmailGreeting';
import LogoWithLabel from '@components/atoms/LogoWithLabel';
import Icon from '@components/atoms/Icon';
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
  type: 'receive' | 'send';
  isShowHeader?: boolean;
  isShowActions?: boolean;
  index?: number;
  onUpdateHashtagClick?: (hashtags: HashtagTabs[]) => void;

  onDecline: (data: EmailResponse) => (e: any) => void;
  onApprove: (data: EmailResponse) => (e: any) => void;
  onEmployeeCancel: () => void;
  onUndoEmail: () => void;
  onApproveNow: () => void;
  onSendEmail: () => void;
}

export const attachsToAttachFiles: (attachs: attachs[]) => AttachFile[] = (
  attachs,
) =>
  attachs.map((file) => {
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

const EmailMess: React.FC<Props> = ({
  type,
  userInfo,
  emailData,
  onShowHistory,
  isShowHeader = false,
  isShowActions = false,
  index,
  onChangeStatus,
  onUpdateHashtagClick,

  onDecline,
  onApprove,
  onEmployeeCancel,
  onUndoEmail,
  onApproveNow,
  onSendEmail,
}) => {
  const defaultStatus = useMemo(() => emailData.status, []);
  const [newHashtagList, setNewHashtagList] = useState<HashtagTabs[] | undefined>(
    undefined,
  );
  const [isShowLimitTitle, setIsShowLimitTitle] = useState<boolean>(false);

  const sentAt = new Date(emailData.send_at);
  const approveAt = new Date(emailData.approve_at);

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

    const newAttachesFile: AttachFile[] = attachsToAttachFiles(
      emailData.email.attachs,
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
        if (emailData.type === 'send' && sentAt.getTime() > Date.now())
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
        else return null;
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
                onClick={onDecline(emailData)}
                className="mx-1 bg-rose-600 py-1.5 px-5 hover:bg-rose-500">
                DECLINE
              </Button>
              <Button onClick={onApprove(emailData)} className="mx-1 py-1.5 px-5">
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
        <Box className="flex flex-wrap actions items-center py-4 justify-between">
          {_renderActionsPendingItem()}
        </Box>
      );
    else return null;
  }, [sentAt, approveAt, emailData.status, currRole]);

  const _renderStatusLayer = useMemo(() => {
    return (
      <EmailForward
        status={emailData.status}
        onChangeEmailStatus={() => {
          onChangeStatus(defaultStatus, index);
        }}
        isReadOnlyReceivers={!(emailData.status === 'forward')}
        classNameLayer="absolute top-0 left-0 w-full h-full"
        classNameContent="shadow-lg p-4 absolute z-10 top-1/2 right-[40px] w-[90%] -translate-y-1/2 bg-white rounded-[11px] border border-[#E3E3E3] "
        sendTo={
          emailData.status === 'reply'
            ? [emailData.email.from]
            : emailData.status === 'replyAll'
            ? emailData.email.to
            : emailData.email.to
        }
        sendToDefault={
          emailData.status === 'reply'
            ? [emailData.email.from]
            : emailData.status === 'replyAll'
            ? emailData.email.to
            : []
        }
      />
    );
  }, [emailData.status]);

  const _renderEmailTitle = useMemo(() => {
    const emailTitle = emailData.email.subject;
    const limitShow = 250;
    if (emailTitle.length < limitShow)
      return (
        <h1 className="text-stone-700 font-bold text-base">
          {emailData.email.subject}
        </h1>
      );
    return (
      <h1 className="text-stone-700 font-bold text-base">
        <span>{emailTitle.substring(0, limitShow)}...</span>
        {isShowLimitTitle && <span>{emailTitle.substring(limitShow)}</span>}
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

      <Box className={`px-4 flex flex-col gap-2`}>
        <Box>
          <Avatar alt={userInfo.name} src={userInfo.avatar} />
        </Box>
        <Box>
          <Icon
            icon="reply"
            className={`${emailData.type === 'send' && 'rotate-180'}`}
          />
        </Box>
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
          className={`flex items-center justify-between cursor-pointer pb-6 bg-violet-200 py-4 ${
            type === 'send'
              ? 'rounded-br-[36px] rounded-tl-[36px]'
              : 'rounded-bl-[36px] rounded-tr-[36px]'
          }  relative`}
          onClick={() => onShowHistory(emailData, emailData.id)}>
          <div className="flex flex-col gap-2">
            {_renderEmailTitle}
            {renderSendTo()}
          </div>
          {emailData.status.toLowerCase() !== 'null' && (
            <EmailStatus emailStatus={emailData.status.toLowerCase()} />
          )}
        </Box>
        {/* Email Content */}
        <Box className="py-9">
          <Box>
            <p dangerouslySetInnerHTML={createMarkup(emailData.email.text_html)} />
          </Box>
        </Box>
        {/* Greeting */}
        <EmailGreeting
          greetingLabel="Thanks and Best regards, ------"
          isHaveLogo={true}
          logo={<LogoWithLabel />}
        />
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
        {emailData.status === 'APPROVED' && sentAt.getTime() > Date.now() && (
          <ControlEmailSend
            remainMinutes={Math.floor(
              (sentAt.getTime() - new Date().getTime()) / 1000 / 60,
            )}
            onSend={onUndoEmail}
            onUndo={onSendEmail}
          />
        )}
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
