import { uploadFile } from '@api/uploadFile';
import { renderFileIconByType } from '@components/atoms/AttachFiles';
import ProgressBar from '@components/atoms/ProgressBar';
import { AttachFile } from '@components/organisms/EmailMessEmpty';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { maxFileSize } from '@utils/variable';

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
      name: data.name,
      url: '',
      type: data.type,
      percentage: data?.percentage ?? 0,
    };

    return res;
  });

  console.log('upload file name', progressPercent);

  useEffect(() => {
    console.log('uploaded');
    console.log(customData);
  }, [customData]);

  const { isLoading: isUploadingFile } = useQuery({
    queryKey: [`upload-file-${data.name}`, data],
    queryFn: async () => {
      onUploading(true);
      console.log('uploading', data);
      if (data.size > maxFileSize) {
        throw new Error('Exceed maximum file size');
      }
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
    onError(err: any) {
      if (err.message.includes('Exceed maximum file size')) {
        setCustomData((prevState) => ({
          ...prevState,
          type: 'exceedFileSize',
          percentage: 100,
        }));
        console.log('Should be here');
        setProgressPercent(100);
        onUploading(false);
        return;
      }
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

  const { name, url, type } = customData;
  console.log('file name', name);

  const _renderIconFile = useMemo(() => {
    return (
      <a href={url} target="_blank">
        {renderFileIconByType(customData)}
      </a>
    );
  }, [customData]);

  const renderUploadAlert = useCallback(() => {
    console.log('uploaded file type', type);
    if (type === 'exceedFileSize') {
      return (
        <p className="font-medium text-[14px] text-[#CF0808]">
          Exceeds maximum upload file size (Max: 200MB)
        </p>
      );
    }
    if (type === 'error') {
      return (
        <p className="font-medium text-[14px] text-[#CF0808]">
          An error occurred while uploading the file
        </p>
      );
    }
    return (
      <a
        className="text-[#0F6AF1] text-[13px] font-medium hover:underline"
        href={url}
        target="_blank">
        {url}
      </a>
    );
  }, [type, url]);

  return (
    <Box className={`${styles.file} flex mb-4 relative flex-col`}>
      <Box className="flex">
        <Box>{_renderIconFile}</Box>
        <Box className={`${styles.main} pl-3 flex-1`}>
          <p className="text-[#495057] text-[14px] font-medium leading-5">
            {data.name}
          </p>

          {
            progressPercent < 100 ? (
              <ProgressBar percent={progressPercent} />
            ) : (
              renderUploadAlert()
            )
            // type === 'error' ? (
            //   <p className="font-medium text-[14px] text-[#CF0808]">
            //     An error occurred while uploading the file
            //   </p>
            // ) : (
            //   <a
            //     className="text-[#0F6AF1] text-[13px] font-medium hover:underline"
            //     href={url}
            //     target="_blank">
            //     {url}
            //   </a>
            // )
          }
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
