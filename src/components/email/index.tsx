import { Avatar, Box, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './styles.module.scss';
import AttachFiles, { File } from '@components/atoms/AttachFiles';
import EmailStatus from '@components/atoms/EmailStatus';
import OptionalAvatar from '@components/atoms/OptionalAvatar';

interface PendingEmail {
  title: string;
  sendTo: Array<string>;
  mailContent: string;
  attachFiles: Array<File>;
}

const newPendingEmailList: PendingEmail = {
  title: 'M&A Testa to Metanode',
  sendTo: [
    'me',
    'billgates@microsoft.com',
    'email1@mail.com',
    'email2@mail.com',
    'email3@mail.com',
    'email4@mail.com',
  ],
  mailContent:
    'Hi,Ingredia, Ingredia Nutrisha,<br> A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture<br><br> Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem.<br><br> Kind Regards<br> Mr Smith',
  attachFiles: [
    {
      name: 'Metanode - White Paper v.1.5.2',
      type: 'pdf',
      url: 'meta.node/9YQC7us',
    },
    {
      name: 'Metanode - SDK Bundle',
      type: 'zip',
      url: 'meta.node/34ED7uc',
    },
  ],
};

function createMarkup(text: string) {
  return { __html: text };
}

function Email({
  status,
  type,
  userInfo,
  emailData,
  onShowHistory,
  isShowHistory = false,
}) {
  const { title, sendTo, mailContent, attachFiles } = emailData;

  const cloneSendTo = [...sendTo];

  const renderSendTo = () => {
    const sendToLength = cloneSendTo.length;

    if (sendToLength > 2) {
      const splice2FirstItems = cloneSendTo.splice(0, 2);

      const restLength = cloneSendTo.length;

      return (
        <Box className="text-sm text-stone-600 first-letter:capitalize">
          <span>{`${splice2FirstItems.join(', ')} and ${restLength} more`}</span>
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
        <span>{`${cloneSendTo.join(', ')}`}</span>
      </p>
    );
  };

  return (
    <Box className={`flex flex-wrap ${type === 'send' && styles.flexRowReverse}`}>
      <Box className={`w-full flex  ${type === 'send' && styles.flexRowReverse}`}>
        <Box className="w-[10%]"></Box>
        <Box
          className={`${styles.userInfo} ${
            isShowHistory && styles.showUserInfo
          } flex-1`}>
          <OptionalAvatar
            className={` ${type === 'send' && styles.flexRowReverse}`}
            data={userInfo}
            isShowAvatar={false}
          />
        </Box>
      </Box>
      <Box className="w-[10%] flex justify-center">
        <Avatar alt={userInfo.name} src={userInfo.avatar} />
      </Box>
      <Box
        className={`flex-1 bg-white ${
          type === 'send'
            ? 'rounded-tl-[36px] rounded-br-[36px]'
            : 'rounded-tr-[36px] rounded-bl-[36px]'
        } overflow-hidden pb-4 ${styles.emailWrap} mb-8`}>
        {/* Header */}
        <Box
          className={`pb-6 bg-violet-200 py-4 ${
            type === 'send' ? 'rounded-br-[36px]' : 'rounded-bl-[36px]'
          }  relative`}
          onClick={() => onShowHistory(emailData, emailData.id)}>
          <h1 className="text-stone-700 font-bold text-base mb-2">{title}</h1>
          {renderSendTo()}
          <EmailStatus emailStatus={status} />
        </Box>
        {/* Email Content */}
        <Box className="py-9">
          <Box>
            <p
              className="text-black font-medium text-[16px]"
              dangerouslySetInnerHTML={createMarkup(mailContent)}
            />
          </Box>
          <Box></Box>
        </Box>
        {/* Files List If have */}
        {attachFiles.length !== 0 && <AttachFiles data={attachFiles} />}
        {/* Actions */}
        {(status === 'pending' || status === 'sending') && (
          <Box className="flex flex-wrap actions justify-end py-4">
            <Box className="w-full h-[1px] bg-[#E0E0E0] mb-5"></Box>
            {status === 'pending' ? (
              <>
                <Button className="mx-1 bg-rose-600 py-1.5 px-5 hover:bg-rose-500">
                  DECLINE
                </Button>
                <Button className="mx-1 py-1.5 px-5">APPROVE</Button>
              </>
            ) : (
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
            )}
          </Box>
        )}
        {status === 'approved' && (
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
        )}
      </Box>
    </Box>
  );
}

export default Email;
