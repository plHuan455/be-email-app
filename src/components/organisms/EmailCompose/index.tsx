import { SingleOTPInputComponent } from '@components/atoms/Input/PinInput/SingleInput';
import Receiver from '@components/atoms/Receiver';
import WindowComposeActions from '@components/molecules/WindowComposeActions';
import { Autocomplete, Box, Button, TextField, Tooltip } from '@mui/material';

import ArticleIcon from '@mui/icons-material/Article';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import logoImg from '@assets/images/logo_without_text.png';
import SendIcon from '@mui/icons-material/Send';
import TableViewIcon from '@mui/icons-material/TableView';

import avatarImg from '@assets/images/avatars/avatar-1.jpg';

import EditContent from '@components/atoms/EditContent';
import CustomButton from '@components/atoms/CustomButton';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import AttachFiles from '@components/atoms/AttachFiles';
import AutoCompleteReceive from '@components/molecules/AutoCompleteReceive';

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { ReceiverData } from '../Email/Interface';
import EmailComposeFormGroup from '@components/molecules/EmailComposeFormGroup';

const fromData: ReceiverData[] = [
  new ReceiverData(avatarImg, 'sender', 'sender@gmail.com'),
];

const receiversList: ReceiverData[] = [
  new ReceiverData(avatarImg, 'Giang', 'giangz0009@gmail.com'),
  new ReceiverData('', 'mail1', 'mail1@gmail.com'),
  new ReceiverData(avatarImg, 'mail2', 'mail2@gmail.com'),
];

function EmailCompose() {
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

  const onEditorStateChange = (val) => {
    setEditorState(val);
    console.log(
      'state -->',
      JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    );
  };

  return (
    <Box className="w-full mx-auto shadow-xl rounded-3xl overflow-hidden">
      {/* Header */}
      <Box className="bg-white">
        {/* Window Compose Actions  */}
        <WindowComposeActions className="pt-3 pr-3" />
        <Box className="px-9 py-10 pt-2">
          {/* Compose To */}
          <EmailComposeFormGroup label={'To:'}>
            <AutoCompleteReceive
              data={receiversList}
              onClickCcFromLabel={handleClickCcFromLabel}
            />
          </EmailComposeFormGroup>
          {/* Subject */}
          <EmailComposeFormGroup label={'Subject:'}>
            <SingleOTPInputComponent className="outline-none w-full text-black text-[18px] font-bold h-full" />
          </EmailComposeFormGroup>
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

          {/* Edit Content */}
          {/* <EditContent /> */}

          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class border"
            toolbarClassName="toolbar-class"
            placeholder="Enter content here..."
          />
          {/* Files List */}
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
          {/* Greeting */}
          <Box>
            <p className="text-black text-[16px] font-normal">
              Thanks and Best regards, ------
            </p>
          </Box>
          {/* Logo */}
          <Box className="flex items-center">
            <img src={logoImg} alt="Logo" />
            <span className="bg-gradient-to-r text-[#675FFF] font-[900] text-[28px] pl-3">
              METANODE
            </span>
          </Box>
        </Box>
      </Box>
      {/* Footer */}
      <Box className="p-6 bg-[#F1F1F6]">
        {/* manipulation */}
        <Box></Box>
        {/* Actions */}
        <Box className="flex justify-end items-center">
          <Tooltip title="Use template">
            <Button className="bg-transparent p-2 hover:bg-transparent">
              <ArticleIcon className="text-[#7D7E80]" />
            </Button>
          </Tooltip>
          <Tooltip title="Insert link">
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
          </Tooltip>

          <CustomButton
            padding="8px 10px"
            label="SEND NOW"
            bgButtonColor="#554CFF"
            color="#fff"
            textSize={15}
            isBeforeIcon={true}
            beforeIcon={<SendIcon fontSize="small" />}
            isAfterIcon={true}
            afterIcon={<TableViewIcon fontSize="small" />}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default EmailCompose;
