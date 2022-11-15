import Receiver from '@components/atoms/Receiver';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import EmailComposeFormGroup from '../hocs/EmailComposeFormGroup';

import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import AutoCompleteReceive, {
  ReceiverData,
} from '@components/atoms/AutoCompleteReceive';
import { SingleOTPInputComponent } from '@components/atoms/Input/PinInput/SingleInput';
import { Email } from '../EmailMess';
import CustomButton from '@components/atoms/CustomButton';
import AttachButton from '@components/atoms/AttachButton';
import AttachFiles from '@components/atoms/AttachFiles';

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

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

const EmailReply: React.FC<Props> = ({
  classNameLayer,
  classNameContent,
  data,
  onChangeEmailStatus,
}) => {
  const [attachedFiles, setAttachedFile] = useState<any>([]);
  const [attachFiles, setAttachFile] = useState<any>([]);

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const refInputAttachFile = useRef<HTMLInputElement>(null);

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

  const handleDeleteAllAttachedFiles = useCallback(() => {
    setAttachedFile([]);
    setAttachFile([]);
  }, []);

  const handleDeleteAttachedFile = useCallback((index) => {
    setAttachedFile((prevState) => {
      prevState.splice(index, 1);
      return [...prevState];
    });
  }, []);

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
            <AutoCompleteReceive data={data.sendTo} defaultValue={data.sendTo} />
          </Box>
        </Box>
        <Box>
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
