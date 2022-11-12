import { Box, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './styles.module.scss';
import AttachFiles, { File } from '@components/atoms/AttachFiles';
import EmailStatus from '@components/atoms/EmailStatus';

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

function Email({ status }) {
  const { title, sendTo, mailContent, attachFiles } = newPendingEmailList;

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
    <Box
      className={`bg-white rounded-tr-3xl rounded-bl-3xl overflow-hidden pb-4 ${styles.emailWrap} ml-20 mb-8`}>
      {/* Header */}
      <Box className={`pb-6 bg-violet-200 py-4 rounded-bl-3xl relative`}>
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
      {status === 'pending' && (
        <Box className="flex actions justify-end border-t-2 py-4">
          <Button className="mx-1 bg-rose-600 py-1.5 px-5 hover:bg-rose-500">
            DECLINE
          </Button>
          <Button className="mx-1 py-1.5 px-5">APPROVE</Button>
        </Box>
      )}
    </Box>
  );
}

export default Email;
