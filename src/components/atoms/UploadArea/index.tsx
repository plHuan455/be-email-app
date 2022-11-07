import useUploadFile from '@hooks/useUploadFile';
import { convertFileToImage } from '@utils/convertFile';
import React, { Dispatch, SetStateAction, useCallback, useRef } from 'react';
import Icon from '../Icon';
import { v4 as uuidV4 } from 'uuid';
import ImageComponent from '../LazyImage';

interface UploadAreaProps {
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileSelected?: FileList;

  //
  defaultValue?: string[];
  onFileChange?: (files: FileList | undefined) => void;
  containerId?: string;
  dragDrop?: boolean;
  preview?: boolean;
}

const UploadArea: React.FC<UploadAreaProps> = ({
  onChange,
  name,
  fileSelected,
  defaultValue = [],
  onFileChange,
  containerId,
  dragDrop,
  preview,
}) => {
  const { onUpload, fileList } = useUploadFile({ dragDrop, containerId, onChange });

  const files = React.useMemo(() => {
    return fileSelected && fileSelected.length > 0
      ? convertFileToImage(fileSelected)
      : defaultValue.filter((ele) => ele);
  }, [fileSelected, defaultValue]);

  /**
   * Todo
   * 1. Bug mở cửa sổ chọn ảnh 2 lần
   */
  const handleClickUploadArea = () => {
    onUpload();
  };

  console.log('has file -->', fileSelected, typeof fileSelected);

  React.useEffect(() => {
    console.log({ fileList });
    onFileChange && onFileChange(fileList);
  }, [onFileChange, fileList]);

  return (
    <div className="upload-area-wrapper relative" onClick={handleClickUploadArea}>
      {preview && files.length > 0 ? (
        <ImageComponent.LazyImage
          alt=""
          className="w-full h-full"
          height={'100%'}
          src={files[0]}
        />
      ) : (
        <>
          <div className="upload-area-img-cloud">
            <Icon icon="uploadCloud" color="grey-1" />
          </div>
          <div className="upload-area-text truncate">
            {fileSelected && fileSelected[0] ? (
              <span>{fileSelected[0]?.name}</span>
            ) : (
              <span>
                Drag&Drop files here <br /> or
              </span>
            )}
          </div>

          <div className="upload-area-button">
            <button className="button-browser-upload">Browser files</button>
          </div>
        </>
      )}
      <div className="absolute inset-0">
        <div id={containerId} className="w-full h-full"></div>
      </div>
    </div>
  );
};

export default UploadArea;
