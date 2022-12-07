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
import { Email, UserInfo } from '../Email/Interface';
import EmailComposeFormGroup from '@components/molecules/EmailComposeFormGroup';
import useEmailCompose from '../../../zustand/useEmailCompose';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { toast } from 'react-toastify';
import { sendEmail } from '@api/email';

interface Props {
  onChangeEmailStatus: Function;
  classNameLayer?: string;
  classNameContent?: string;
  sendTo: string[];
  sendToDefault: string[];
  status: string;
  isReadOnlyReceivers?: boolean;
}

// const receiversList: UserInfo[] = [
//   { avatar: avatarImg, mail: 'giangz0009@gmail.com', abbreviations: 'GI' },
//   { avatar: '', mail: 'mail1@gmail.com', abbreviations: 'T2' },
//   { avatar: avatarImg, mail: 'mail2@gmail.com', abbreviations: 'T3' },
// ];

const fromData: UserInfo[] = [new UserInfo(avatarImg, 'sender', 'sender@gmail.com')];

const EmailForward: React.FC<Props> = ({
  classNameLayer,
  classNameContent,
  sendTo,
  sendToDefault,
  onChangeEmailStatus,
  isReadOnlyReceivers = true,
  status,
}) => {
  const [attachedFiles, setAttachedFile] = useState<any>([]);
  const [attachFiles, setAttachFile] = useState<any>([]);

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const [isShowCcFrom, setIsShowCcFrom] = useState(false);

  const refInputAttachFile = useRef<HTMLInputElement>(null);

  const {
    subject,
    cc,
    bcc,
    receivers,
    getAll,
    reset,
    check,
    setNewReceivers,
    setCc,
    setBcc,
    setContent,
    setSubject,
  } = useEmailCompose();

  const currentUserEmail = localStorage.getItem('current_email')
    ? localStorage.getItem('current_email')
    : '';

  const newSendTo =
    sendTo[0] === '' ? [] : sendTo.map((item) => new UserInfo('', item, item));
  const newSendToDefault =
    sendToDefault[0] === ''
      ? []
      : sendToDefault.map((item) => new UserInfo('', item, item));

  useEffect(() => {
    if (status === 'reply') setNewReceivers(newSendToDefault);
    if (status === 'replyAll') setCc(newSendToDefault);
  }, []);

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
  };

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

  const handleChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  const onEditorStateChange = (val) => {
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setEditorState(val);
    console.log(
      'state --> line 146',
      JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))),
    );
  };

  const onChangeReceiversData = useCallback((e, newValue) => {
    setNewReceivers(newValue);
  }, []);

  const onChangeCcData = useCallback((e, newValue) => {
    setCc(newValue);
  }, []);

  const onChangeBccData = useCallback((e, newValue) => {
    setBcc(newValue);
  }, []);

  const handleSubmitEmail = async (e) => {
    const canSubmit = await check();
    const emailData = getAll();
    if (canSubmit) {
      const res = await sendEmail({
        email: {
          subject: emailData.subject,
          to: emailData.receivers.map((item) => item.mail),
          content: emailData.content,
          html_string: emailData.content,
          from: currentUserEmail ? currentUserEmail : '',
          cc: emailData.cc.map((item) => item.mail),
          bcc: emailData.bcc.map((item) => item.mail),
          file: emailData.file,
        },
      });
      toast.success(`Thành công!`);
      await reset();
      onChangeEmailStatus();
    } else {
      toast.error('Có lỗi xãy ra, vui lòng kiểm tra lại!');
    }
  };

  const renderReceiverList = () => {
    return (
      <>
        <Box>
          <Box className="py-3">
            <EmailComposeFormGroup
              className="py-1"
              label="To:"
              isHaveBorderBottom={false}>
              <AutoCompleteReceive
                isReadOnly={isReadOnlyReceivers}
                data={newSendTo}
                defaultValue={newSendToDefault}
                isShowCcFromLabel={status === 'forward'}
                onClickCcFromLabel={handleClickCcFromLabel}
                onChange={onChangeReceiversData}
              />
            </EmailComposeFormGroup>
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
                <AutoCompleteReceive
                  isReadOnly={isReadOnlyReceivers}
                  data={newSendTo}
                  defaultValue={newSendToDefault}
                  isShowCcFromLabel={false}
                  onClickCcFromLabel={handleClickCcFromLabel}
                  onChange={onChangeCcData}
                />
              </EmailComposeFormGroup>
              <EmailComposeFormGroup
                className="py-1"
                label="Bcc:"
                isHaveBorderBottom={false}>
                <AutoCompleteReceive
                  isReadOnly={isReadOnlyReceivers}
                  data={newSendTo}
                  defaultValue={newSendToDefault}
                  isShowCcFromLabel={false}
                  onClickCcFromLabel={handleClickCcFromLabel}
                  onChange={onChangeBccData}
                />
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
      </>
    );
  };

  return (
    <Box className={`${classNameLayer} `} onClick={() => onChangeEmailStatus()}>
      <Box className={`${classNameContent}`} onClick={(e) => e.stopPropagation()}>
        <Box>
          <EmailComposeFormGroup label="Re">
            <SingleOTPInputComponent
              className="outline-none w-full text-black text-[18px] font-bold h-full"
              onChange={handleChangeSubject}
            />
          </EmailComposeFormGroup>
        </Box>
        {renderReceiverList()}
        <Box className="py-2">
          <Button
            className="bg-transparent text-[#7D7E80] hover:text-[#5724C5] hover:bg-transparent"
            onClick={handleSubmitEmail}>
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

export default EmailForward;
