import { Box, Button, Typography } from '@mui/material';
import { addHttp } from '@utils/functions';

import UploadFile from '../UploadFile';

export interface FileInfoTypes {
  isUploaded: boolean;
  file: { name: string; url: string; type: string };
}
interface AttachFiles2Props {
  inputId: string;
  fileList: (File | undefined)[];
  fileUrls: (string | undefined)[];
  onUploaded: (index: number, url: string) => void;
  onDelete: (index: number) => void;
  onDeleteAll: () => void;
}

const AttachFiles2: React.FC<AttachFiles2Props> = ({
  fileList,
  fileUrls,
  onUploaded,
  onDelete,
  onDeleteAll,
}) => {
  console.log(fileList);
  return (
    <Box className="m-attachFile2">
      <Box className="mb-4 flex items-center justify-between">
        <Typography
          variant="h3"
          className="text-[#495057] font-bold leading-4 text-[16px]">
          {`File (${fileList.length})`}
        </Typography>
        <Button variant="text" onClick={() => onDeleteAll()}>
          Delete all
        </Button>
      </Box>

      <Box>
        {fileList.map((value, index) => {
          if (value === undefined) return null;
          return (
            <UploadFile
              key={value.name}
              data={value}
              onUploaded={(url) => {
                onUploaded(index, addHttp(url));
              }}
              onDeleteFile={() => onDelete(index)}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default AttachFiles2;
