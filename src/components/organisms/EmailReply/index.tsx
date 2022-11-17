import Receiver from '@components/atoms/Receiver';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import AutoCompleteReceive from '@components/molecules/AutoCompleteReceive';
import { SingleOTPInputComponent } from '@components/atoms/Input/PinInput/SingleInput';
import CustomButton from '@components/atoms/CustomButton';
import AttachButton from '@components/atoms/AttachButton';
import AttachFiles from '@components/atoms/AttachFiles';

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import avatarImg from '@assets/images/avatars/avatar-1.jpg';
import { Email, ReceiverData } from '../Email/Interface';
import EmailComposeFormGroup from '@components/molecules/EmailComposeFormGroup';

interface Props {
  onChangeEmailStatus: Function;
  classNameLayer?: string;
  classNameContent?: string;
  data: Email;
}

// const receiversList: ReceiverData[] = [
//   { avatar: avatarImg, mail: 'giangz0009@gmail.com', abbreviations: 'GI' },
//   { avatar: '', mail: 'mail1@gmail.com', abbreviations: 'T2' },
//   { avatar: avatarImg, mail: 'mail2@gmail.com', abbreviations: 'T3' },
// ];

const fromData: ReceiverData[] = [
  new ReceiverData(avatarImg, 'sender', 'sender@gmail.com'),
];

const EmailReply: React.FC<Props> = ({
  classNameLayer,
  classNameContent,
  data,
  onChangeEmailStatus,
}) => {
  const [attachedFiles, setAttachedFile] = useState<any>([]);
  const [attachFiles, setAttachFile] = useState<any>([]);

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const [isShowCcFrom, setIsShowCcFrom] = useState(false);

  const refInputAttachFile = useRef<HTMLInputElement>(null);

  const handleClickCcFromLabel = useCallback(() => {
    setIsShowCcFrom((preState) => !preState);
  }, []);

  const handleAttachFile = (e) => {
    const checkRef = !!refInputAttachFile.current;

    if (checkRef) {
      refInputAttachFile.current.click();
    }
  };

  const onEditorStateChange = (val) => {
    setEditorState(val);
    console.log(
      'state -->',
      JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    );
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

    e.target.value = null;
    // const file = e.target.files[0];

    // file.preview = URL.createObjectURL(file);
    // setAvatar(file);
  };

  // useEffect(() => {
  //   return () => {
  //     attachFiles.length !== 0 &&
  //       Object.keys(attachFiles).forEach((key) => {
  //         const file = attachFiles[key];

  //         URL.revokeObjectURL(file.preview);
  //       });
  //   };
  // }, [attachFiles]);

  const handleDeleteAllAttachedFiles = useCallback(() => {
    setAttachedFile([]);

    {
      attachFiles.length !== 0 &&
        Object.keys(attachFiles).forEach((key) => {
          const file = attachFiles[key];

          URL.revokeObjectURL(file.preview);
        });
    }

    setAttachFile([]);
  }, []);

  const handleDeleteAttachedFile = useCallback(
    (index) => {
      const file = attachFiles[index];

      URL.revokeObjectURL(file.preview);
      setAttachFile((prevState) => {
        prevState.splice(index, 1);
        return [...prevState];
      });
      setAttachedFile((prevState) => {
        prevState.splice(index, 1);
        return [...prevState];
      });
    },
    [attachFiles, attachedFiles],
  );

  return (
    <Box className={`${classNameLayer} `} onClick={() => onChangeEmailStatus()}>
      <Box className={`${classNameContent}`} onClick={(e) => e.stopPropagation()}>
        <Box>
          <EmailComposeFormGroup label="Re">
            <SingleOTPInputComponent className="outline-none w-full text-black text-[18px] font-bold h-full" />
          </EmailComposeFormGroup>
        </Box>
        <Box>
          <Box className="py-3">
            <AutoCompleteReceive
              isReadOnly={true}
              data={data.sendTo}
              defaultValue={data.sendTo}
              onClickCcFromLabel={handleClickCcFromLabel}
            />
          </Box>
        </Box>
        <Box>
          {/* Cc, From */}
          {isShowCcFrom && (
            <Box className="mb-2">
              <EmailComposeFormGroup
                className="py-1"
                label="Cc:"
                isHaveBorderBottom={false}>
                <SingleOTPInputComponent className="outline-none w-full text-[14px] font-medium h-full" />
              </EmailComposeFormGroup>
              <EmailComposeFormGroup
                className="py-1"
                label="Bcc:"
                isHaveBorderBottom={false}>
                <SingleOTPInputComponent className="outline-none w-full text-[14px] font-medium h-full" />
              </EmailComposeFormGroup>
              <EmailComposeFormGroup
                className="py-1"
                label="From:"
                isHaveBorderBottom={false}>
                <AutoCompleteReceive
                  data={fromData}
                  defaultValue={fromData}
                  isShowCcFromLabel={false}
                  isReadOnly={true}
                />
              </EmailComposeFormGroup>
            </Box>
          )}
          <Box>
            <Editor
              toolbarHidden
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class border"
              toolbarClassName="toolbar-class"
              placeholder="Write something..."
            />
          </Box>
          <Box>
            {attachedFiles.length !== 0 && (
              <AttachFiles
                data={attachedFiles}
                isDelete={true}
                onDeleteAll={handleDeleteAllAttachedFiles}
                onDeleteFile={handleDeleteAttachedFile}
              />
            )}
          </Box>
        </Box>
        <Box className="py-2">
          <Button className="bg-transparent text-[#7D7E80] hover:text-[#5724C5] hover:bg-transparent">
            <SendOutlinedIcon fontSize="large" />
          </Button>
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
        </Box>
      </Box>
    </Box>
  );
};

export default EmailReply;
