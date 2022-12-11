import { Box } from '@mui/material';
import React, { useCallback, useMemo } from 'react';

import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloseIcon from '@mui/icons-material/Close';
import pdfFileImg from '@assets/images/icons/pdf-file.png';
import zipFileImg from '@assets/images/icons/zip-file.png';

import styles from './styles.module.scss';
import { AttachFile } from '@components/organisms/EmailMess';
import ProgressBar from '../ProgressBar';
import UploadFile from '@components/molecules/UploadFile';

type Props = {
  data: AttachFile[];
  dataFiles?: any;
  isUpload?: boolean;
  isDelete?: boolean;
  onDeleteAll?: Function;
  onDeleteFile?: Function;
};

export const renderFileIconByType = (file: AttachFile) => {
  switch (file.type) {
    case 'error':
      return <WarningAmberIcon color="error" />;

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

    case 'file':
      return (
        <img
          className="w-[22px] h-full object-center object-contain"
          src={zipFileImg}
          alt="file"
        />
      );

    case 'image':
      return (
        <img
          className="w-[22px] h-full object-center object-contain"
          src={file.url}
          alt="file"
        />
      );

    default:
      return (
        <img
          className="w-[22px] h-full object-center object-contain"
          src={zipFileImg}
          alt="file"
        />
      );
  }
};

const AttachFiles: React.FC<Props> = ({
  data,
  dataFiles,
  isUpload = false,
  isDelete,
  onDeleteAll,
  onDeleteFile,
}) => {
  const _renderUserRead = useCallback((user) => {
    return (
      user &&
      user.map((item, index) => {
        return (
          <Box className="flex items-center content-between" key={index}>
            <p className="w-[70%] whitespace-nowrap overflow-hidden overflow-ellipsis text-[9px]">
              Read by <span className="font-bold text-[11px]">{item.name}</span>
            </p>
            <p className="text-[9px]">{item.time}</p>
          </Box>
        );
      })
    );
  }, []);

  const _renderFiles = useMemo(() => {
    return data.map((val, index) => {
      const { name, url, userRead } = val;

      return (
        <Box className={`${styles.file} flex mb-4 relative flex-col`} key={index}>
          <Box className="flex">
            <Box>
              <a href={url} target="_blank">
                {renderFileIconByType(val)}
              </a>
            </Box>
            <Box className={`${styles.main} pl-3 flex-1`}>
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
          {_renderUserRead(userRead)}
          {isDelete && (
            <button
              className="flex items-center justify-center shadow-md absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full"
              type="button"
              onClick={() => onDeleteFile && onDeleteFile(index)}>
              <CloseIcon sx={{ fontSize: 14 }} />
            </button>
          )}
        </Box>
      );
    });
  }, [data]);

  const _renderUploadFiles = useMemo(() => {
    return (
      dataFiles &&
      dataFiles.map((val, index) => {
        return (
          <UploadFile
            data={val}
            key={index}
            onDeleteFile={() => {
              onDeleteFile && onDeleteFile(index);
            }}
          />
        );
      })
    );
  }, [dataFiles]);

  return (
    <Box
      className={`${styles.attachFiles} ${isDelete && styles.attachedFilesDelete}`}>
      <Box className="mb-4 flex items-center justify-between">
        <h3 className="text-[#495057] font-bold leading-4 text-[16px]">
          Files ({data.length})
        </h3>
        {isDelete && (
          <span
            className={`${styles.deleteAll} text-[#827CFF] text-[16px] hover:cursor-pointer`}
            onClick={() => onDeleteAll && onDeleteAll()}>
            Delete all
          </span>
        )}
      </Box>
      <Box className={`max-h-[160px] overflow-scroll ${styles.files}`}>
        {isUpload ? _renderUploadFiles : _renderFiles}
      </Box>
    </Box>
  );
};

export default AttachFiles;
