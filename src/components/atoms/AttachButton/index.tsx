import { Button } from '@mui/material';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';

type Props = {
  onClick?: Function;
};
type HandleStart = {
  attachedFiles: any[];
  attachFiles: any[];
  deleteAll: () => void;
  deleteByIndex: (index: number) => void;
};

const AttachButton: React.ForwardRefRenderFunction<HandleStart, Props> = (
  { onClick = () => {} },
  ref,
) => {
  const [attachedFiles, setAttachedFile] = useState<any>([]);
  const [attachFiles, setAttachFile] = useState<any>([]);

  useImperativeHandle(
    ref,
    () => ({
      attachedFiles: attachedFiles,
      attachFiles: attachFiles,
      deleteAll() {
        setAttachedFile([]);
        setAttachFile([]);
      },
      deleteByIndex(index) {
        setAttachedFile((prevState) => {
          prevState.splice(index, 1);
          return [...prevState];
        });
      },
    }),
    [attachFiles, attachedFiles],
  );

  const refInputAttachFile = useRef<HTMLInputElement>(null);

  const handleAttachFile = (e) => {
    const checkRef = !!refInputAttachFile.current;

    if (checkRef) {
      refInputAttachFile.current.click();
    }
  };

  const handleOnAttachedFiles = (e) => {
    const files = e.target.files;

    const customFiles = Object.keys(files).map((key) => {
      const file = files[key];
      const fileType = file.type;
      file.preview = URL.createObjectURL(file);
      const res = {
        name: file.name,
        type: '',
        url: file.preview,
      };

      if (fileType) {
        const splitFileType = fileType.split('/');
        const [firstSplitFileType, secondSplitFileType, ...restFileType] =
          splitFileType;
        if (firstSplitFileType === 'image') res.type = 'image';
        else if (secondSplitFileType === 'pdf') res.type = 'pdf';
        else res.type = 'file';
      }

      return res;
    });

    setAttachFile((prevState) => [...prevState, ...files]);
    setAttachedFile((prevState) => [...prevState, ...customFiles]);
    // const file = e.target.files[0];

    // file.preview = URL.createObjectURL(file);
    // setAvatar(file);
  };

  useEffect(() => {
    return () => {
      attachFiles.length !== 0 &&
        Object.keys(attachFiles).forEach((key) => {
          const file = attachFiles[key];

          URL.revokeObjectURL(file.preview);
        });
    };
  }, [attachFiles]);

  return (
    <Button
      className="bg-transparent p-2 hover:bg-transparent"
      onClick={handleAttachFile}>
      <input
        type="file"
        name="file"
        id="file"
        hidden
        ref={refInputAttachFile}
        onChange={handleOnAttachedFiles}
        multiple
      />
      <AttachFileIcon className="text-[#7D7E80]" />
    </Button>
  );
};

export default forwardRef(AttachButton);
