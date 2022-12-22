import { uploadFile } from '@api/uploadFile';
import { renderFileIconByType } from '@components/atoms/AttachFiles';
import ProgressBar from '@components/atoms/ProgressBar';
import { AttachFile } from '@components/organisms/EmailMessEmpty';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import useMinimizedUpload from '@zustand/useMinimizedUpload';

interface Props {
  data: any;
  uploadedData?: { name: string; type: string; url: string };
  onUploaded?: (uploadUrl: string) => void;
  onDeleteFile: () => void;
  onUploading?: (isUploading: boolean) => void;
}

const UploadFile: React.FC<Props> = ({
  data,
  uploadedData,
  onUploading = () => {},
  onDeleteFile,
  onUploaded,
}) => {
  const [progressPercent, setProgressPercent] = useState<number>(
    data.percentage ?? 10,
  );
  const [customData, setCustomData] = useState(() => {
    // data.preview = URL.createObjectURL(data);

    const res = {
      ...data,
      percentage: data?.percentage ?? 0,
    };

    return res;
  });

  console.log('upload file', progressPercent);

  const { isLoading: isUploadingFile } = useQuery({
    queryKey: [`upload-file-${data.name}`, data],
    queryFn: async () => {
      onUploading(true);
      return await uploadFile(data);
    },
    onSuccess(res) {
      setCustomData((prevState) => ({
        ...prevState,
        url: `http://${res.data}`,
        percentage: 100,
      }));
      setProgressPercent(100);
      if (onUploaded) onUploaded(res.data);
      onUploading(false);
    },
    onError(err) {
      setCustomData((prevState) => ({
        ...prevState,
        type: `error`,
        percentage: 100,
      }));
      setProgressPercent(100);
      onUploading(false);
    },
    enabled: !Boolean(uploadedData) || !(data.percentage === 100),
  });

  useEffect(() => {
    const fileType = data.type;

    if (fileType) {
      const splitFileType = fileType.split('/');
      const [firstSplitFileType, secondSplitFileType, ...restFileType] =
        splitFileType;
      if (firstSplitFileType === 'image')
        setCustomData((prevState) => ({ ...prevState, type: `image` }));
      else if (secondSplitFileType === 'pdf')
        setCustomData((prevState) => ({ ...prevState, type: `pdf` }));
      else setCustomData((prevState) => ({ ...prevState, type: `file` }));
    }
  }, []);

  useEffect(() => {
    if (isUploadingFile) {
      const timer = setInterval(() => {
        setProgressPercent((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + 10,
        );
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }
  }, [isUploadingFile]);

  const { name, url, type, percentage } = customData;

  const _renderIconFile = useMemo(() => {
    return (
      <a href={url} target="_blank">
        {renderFileIconByType(customData)}
      </a>
    );
  }, [customData]);

  return (
    <Box className={`${styles.file} flex mb-4 relative flex-col`}>
      <Box className="flex">
        <Box>{_renderIconFile}</Box>
        <Box className={`${styles.main} pl-3 flex-1`}>
          <p className="text-[#495057] text-[14px] font-medium leading-5">{name}</p>

          {progressPercent < 100 ? (
            <ProgressBar percent={progressPercent} />
          ) : type === 'error' ? (
            <p className="font-medium text-[14px] text-[#CF0808]">
              An error occurred while uploading the file
            </p>
          ) : (
            <a
              className="text-[#0F6AF1] text-[13px] font-medium hover:underline"
              href={url}
              target="_blank">
              {url}
            </a>
          )}
        </Box>
      </Box>
      <button
        type="button"
        className="flex items-center justify-center shadow-md absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 rounded-full"
        onClick={() => onDeleteFile()}>
        <CloseIcon sx={{ fontSize: 14 }} />
      </button>
    </Box>
  );
};

export default UploadFile;
