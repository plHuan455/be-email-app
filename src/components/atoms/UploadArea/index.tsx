import useUploadFile from '@hooks/useUploadFile';
import { convertFileToImage } from '@utils/convertFile';
import React, { Dispatch, SetStateAction, useCallback, useRef } from 'react';
import Icon from '../Icon';
import { v4 as uuidV4 } from 'uuid';
import ImageComponent from '../LazyImage';
import { Button } from '@mui/material';
import classNames from 'classnames';

interface UploadAreaProps {
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileSelected?: FileList;

  //
  defaultValue?: string[];
  onFileChange?: (files: FileList | undefined) => void;
  containerId?: string;
  dragDrop?: boolean;
  preview?: boolean;
  accept?: 'image/*' | 'application/pdf';
  /** Note:
   * Tạm, chưa ổn định, còn check tiếp
   */
  checkType?: boolean;
  disabled?: boolean;
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
  accept,
  checkType,
  disabled,
}) => {
  const { onUpload, fileList } = useUploadFile({
    dragDrop,
    containerId,
    onChange,
    accept: [accept],
    checkType,
    disabled,
  });

  const ImgComponent = React.useMemo(() => {
    return fileSelected && fileSelected.length > 0
      ? ({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
          <img {...props} className={classNames(className, 'object-contain')} />
        )
      : ImageComponent.LazyImage;
  }, [fileSelected, defaultValue]);

  const files = React.useMemo(() => {
    return fileSelected && fileSelected.length > 0
      ? convertFileToImage(fileSelected)
      : defaultValue.filter((ele) => ele);
  }, [fileSelected, defaultValue]);

  const handleClickUploadArea = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (dragDrop) return;
    onUpload();
  };

  React.useEffect(() => {
    onFileChange && onFileChange(fileList);
  }, [fileList]);

  return (
    <div
      id="wrapper"
      className="upload-area-wrapper relative"
      onClick={handleClickUploadArea}>
      {preview && files.length > 0 ? (
        <ImgComponent
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
