import { Box, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './styles.module.scss';

import pdfFileImg from '@assets/images/icons/pdf-file.png';
import zipFileImg from '@assets/images/icons/zip-file.png';
import EmailStatus from '@components/atoms/EmailStatus';
import useTest from '../../zustand/useTest';
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

interface PendingEmail {
  title: string;
  sendTo: Array<string>;
  mailContent: string;
  attachFiles: Array<AttachFile>;
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
    '<p><p>Hi,Ingredia, Ingredia Nutrisha,</p><p> A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture</p><p> Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem.</p><p>Kind Regards</p> <p>Mr Smith</p> </p>',
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

const renderFileIconByType = (type: string) => {
  switch (type) {
    case 'pdf':
      return (
        <img
          className="w-[22px] h-full object-center object-contain"
          src={pdfFileImg}
          alt="file"
        />
      );

    case 'zip':
      return (
        <img
          className="w-[22px] h-full object-center object-contain"
          src={zipFileImg}
          alt="file"
        />
      );

    default:
      return (
        <img
          className="w-[22px] h-full object-center object-contain"
          src={pdfFileImg}
          alt="file"
        />
      );
  }
};

export const renderAttachFiles = (
  attachFiles: AttachFile[],
  userRead?: UserRead[],
) => (
  <Box>
    <h3 className="text-[#495057] font-bold leading-4 mb-4 text-[16px]">
      Files ({attachFiles.length})
    </h3>
    <Box>
      {attachFiles.map((val, index) => {
        const { name, type, url } = val;

        return (
          <Box className="mb-4">
            <Box className="flex" key={index}>
              <Box>
                <a href={url} target="_blank">
                  {renderFileIconByType(type)}
                </a>
              </Box>
              <Box className="pl-3 flex-1">
                <p className="text-[#495057] text-[14px] font-medium leading-5">
                  {name}
                </p>
                <a
                  className="text-[#0F6AF1] text-[13px] font-medium hover:underline"
                  href={url}
                  target="_blank">
                  {url}
                </a>
              </Box>
            </Box>
            <Box>
              {val.userRead &&
                val.userRead.map((item) => {
                  return (
                    <Box className="flex items-center content-between">
                      <p className="w-[70%] whitespace-nowrap overflow-hidden overflow-ellipsis text-[9px]">
                        Read by{' '}
                        <span className="font-bold text-[11px]">{item.name}</span>
                      </p>
                      <p className="text-[9px]">{item.time}</p>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        );
      })}
    </Box>
  </Box>
);

function Email({ status }) {
  const { name, setName } = useTest();
  console.log('🚀 ~ file: index.tsx ~ line 143 ~ Email ~ name', name);

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
      {attachFiles.length !== 0 && renderAttachFiles(attachFiles)}
      {/* Actions */}
      {status === 'pending' && (
        <Box className="flex actions justify-end border-t-2 py-4">
          <Button className="mx-1 bg-rose-600 py-1.5 px-5 hover:bg-rose-500">
            DECLINE
          </Button>
          <Button onClick={() => setName('asdasdasd')} className="mx-1 py-1.5 px-5">
            APPROVE
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Email;
