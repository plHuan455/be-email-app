import { Box, Button, Typography } from '@mui/material';
import { addHttp } from '@utils/functions';
import useMinimizedUpload from '@zustand/useMinimizedUpload';
import { useEffect } from 'react';

import UploadFile from '../UploadFile';

export interface FileInfoTypes {
  isUploaded: boolean;
  file: { name: string; url: string; type: string };
}
interface AttachFiles2Props {
  inputId: string;
  fileList: (File | undefined)[];
  fileUrls: (string | undefined)[];
  emailIndex?: number;
  onUpload: (customData: any, emailIndex?: number) => void;
  onUploaded: (index: number, url: string) => void;
  onDelete: (index: number) => void;
  onDeleteAll: () => void;
}

const AttachFiles2: React.FC<AttachFiles2Props> = ({
  emailIndex,
  fileList,
  fileUrls,
  onUploaded,
  onUpload,
  onDelete,
  onDeleteAll,
}) => {
  console.log(fileList);
  const { emails, deleteEmail, setPercentage, setFiles } = useMinimizedUpload()
  const handleDeleteAll = () => {
    emailIndex ? deleteEmail(emailIndex) : null
    onDeleteAll()
  }

  return (
    <Box className="m-attachFile2">
      <Box className="mb-4 flex items-center justify-between">
        <Typography
          variant="h3"
          className="text-[#495057] font-bold leading-4 text-[16px]">
          {`File (${fileList.length})`}
        </Typography>
        <Button variant="text" onClick={handleDeleteAll}>
          Delete all
        </Button>
      </Box>

      <Box>
        { emails.length > 0 ? 
          emails[emailIndex ?? 0].files.map((file, index) => {
            if(!file) return null
            return (
              <UploadFile
                key={index}
                data={file}
                onDeleteFile={() => onDelete(index)}
              />
            )
          })
        : fileList.map((value, index) => {
          if (value === undefined) return null;
          return (
            <UploadFile
              key={value.name}
              data={value}
              onUploaded={(url) => {
                onUploaded(index, addHttp(url));
                setPercentage(100, emailIndex ?? 0, index, undefined, addHttp(url))
              }}
              onUpload={(customData) => onUpload([customData], emailIndex)}
              onDeleteFile={() => onDelete(index)}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default AttachFiles2;
