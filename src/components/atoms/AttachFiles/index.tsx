import { Box } from '@mui/material';
import React from 'react';

import CloseIcon from '@mui/icons-material/Close';

import pdfFileImg from '@assets/images/icons/pdf-file.png';
import zipFileImg from '@assets/images/icons/zip-file.png';

import styles from './styles.module.scss';

export interface File {
  name: string;
  type: string;
  url: string;
}

type Props = {
  data: File[];
  isDelete?: boolean;
  onDeleteAll?: Function;
  onDeleteFile?: Function;
};

const AttachFiles = (props: Props) => {
  const { data, isDelete, onDeleteAll, onDeleteFile } = props;

  const renderFileIconByType = (file: File) => {
    switch (file.type) {
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
      <Box className={styles.files}>
        {data.map((val, index) => {
          const { name, url } = val;

          return (
            <Box className={`${styles.file} flex mb-4 relative`} key={index}>
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
              {isDelete && (
                <button
                  className="flex items-center justify-center shadow-md absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full"
                  onClick={() => onDeleteFile && onDeleteFile(index)}>
                  <CloseIcon sx={{ fontSize: 14 }} />
                </button>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default AttachFiles;