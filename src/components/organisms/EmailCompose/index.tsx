import { SingleOTPInputComponent } from '@components/atoms/Input/PinInput/SingleInput';
import Receiver from '@components/atoms/Receiver';
import WindowComposeActions from '@components/molecules/WindowComposeActions';
import { Box, Button } from '@mui/material';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import TableViewIcon from '@mui/icons-material/TableView';

import avatarImg from '@assets/images/avatars/avatar-1.jpg';

import CustomButton from '@components/atoms/CustomButton';
import { useCallback, useEffect, useRef, useState } from 'react';
import AttachFiles from '@components/atoms/AttachFiles';
import AutoCompleteReceive from '@components/molecules/AutoCompleteReceive';

import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import EmailComposeFormGroup from '@components/molecules/EmailComposeFormGroup';
import { toolbarCustom } from '@constants/constants';
import LogoWithLabel from '@components/atoms/LogoWithLabel';
import EmailGreeting from '@components/molecules/EmailGreeting';
import UseTemplateButton from '@components/atoms/UseTemplateButton';
import { toast } from 'react-toastify';
import { useTranslation } from '@@packages/localization/src';
import useEmailCompose from '../../../zustand/useEmailCompose';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { UserInfo } from '../Email/Interface';
import { CreateEmailParam, sendEmail } from '@api/email';
import {
  MESSAGE_SEND_EMAIL_FAILED,
  MESSAGE_SEND_EMAIL_SUCCESSFUL,
} from '@constants/EmailAPI';
import { useNavigate } from 'react-router-dom';

const fromData: UserInfo[] = [new UserInfo(avatarImg, 'sender', 'sender@gmail.com')];

const receiversList: UserInfo[] = [
  new UserInfo(avatarImg, 'Giang', 'giangz0009@begmail.com'),
  new UserInfo(
    'https://vcdn1-vnexpress.vnecdn.net/2022/10/28/-5369-1666951215.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=RzncK6dCQpia2MrWYaQJ8g',
    'Elon Musk',
    'elonmusk@bemail.com',
  ),
  new UserInfo(avatarImg, 'Ri Đỗ Sa Tị', 'usertest@bemail.com'),
];

function EmailCompose() {
  const [attachedFiles, setAttachedFiles] = useState<any>([]);
  const [attachFiles, setAttachFiles] = useState<any>([]);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [isShowCcFrom, setIsShowCcFrom] = useState(false);
  const refInputAttachFile = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const currentUserEmail = localStorage.getItem('current_email')
    ? localStorage.getItem('current_email')
    : '';

  const {
    isZoom,
    cc,
    setCc,
    bcc,
    setBcc,
    content,
    setContent,
    subject,
    setSubject,
    receivers,
    check,
    getAll,
    reset,
    setNewReceivers,
    negativeIsCompose,
  } = useEmailCompose();

  useEffect(() => {
    const contentBlock = htmlToDraft(content);

    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);

  const navigate = useNavigate();

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

    setAttachFiles((prevState) => [...prevState, ...files]);
    setAttachedFiles((prevState) => [...prevState, ...customFiles]);

    e.target.value = null;
  };

  const handleDeleteAllAttachedFiles = useCallback(() => {
    setAttachedFiles([]);
    {
      attachFiles.length !== 0 &&
        Object.keys(attachFiles).forEach((key) => {
          const file = attachFiles[key];

          URL.revokeObjectURL(file.preview);
        });
    }
    setAttachFiles([]);
  }, []);

  const handleDeleteAttachedFile = useCallback(
    (index) => {
      const file = attachFiles[index];

      URL.revokeObjectURL(file.preview);
      setAttachFiles((prevState) => {
        prevState.splice(index, 1);
        return [...prevState];
      });
      setAttachedFiles((prevState) => {
        prevState.splice(index, 1);
        return [...prevState];
      });
    },
    [attachFiles, attachedFiles],
  );

  const handleChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  const handleChangeReceivers = useCallback((e, newValue) => {
    setNewReceivers(newValue);
  }, []);
  const handleChangeCc = useCallback((e, newValue) => {
    setCc(newValue);
  }, []);
  const handleChangeBcc = useCallback((e, newValue) => {
    setBcc(newValue);
  }, []);

  const handleOnClickSubmitCompose = async () => {
    const checkData = await check();
    const emailData = getAll();
    if (checkData) {
      const params: CreateEmailParam = {
        subject: emailData.subject,
        to: emailData.receivers.map((item) => item.mail),
        content: 'asdasdasdasd',
        html_string: emailData.content,
        from: currentUserEmail ? currentUserEmail : '',
        cc: emailData.cc.map((item) => item.mail),
        bcc: emailData.bcc.map((item) => item.mail),
        file: [],
      };
      const res = await sendEmail(params);
      console.log(
        '🚀 ~ file: index.tsx ~ line 180 ~ handleOnClickSubmitCompose ~ res',
        res,
      );
      if (res.statusText == 'OK') {
        toast.success(MESSAGE_SEND_EMAIL_SUCCESSFUL);
        reset();
        navigate(-1);
        return;
      } else {
        reset();
        return toast.error(MESSAGE_SEND_EMAIL_FAILED);
      }
    }
    return toast.error('*Vui lòng nhập người nhận!');
  };

  const onEditorStateChange = (val) => {
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setEditorState(val);
    console.log(
      'state -->',
      JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))),
    );

    // const test = convertToRaw(editorState.getCurrentContent()).blocks.map(
    //   (item) => item.text,
    // );
    // console.log('state --> test', test);
  };

  return (
    <Box
      className={`flex flex-col w-full mx-auto shadow-xl rounded-3xl overflow-hidden z-5 transition-all ${
        isZoom && 'fixed top-0 left-0 bottom-0'
      }`}>
      {/* Header */}
      <Box className="bg-white flex-1 flex flex-col">
        {/* Window Compose Actions  */}
        <WindowComposeActions className="pt-3 pr-3" />
        <Box className="px-9 py-10 pt-2 flex-1 flex flex-col">
          {/* Compose To */}
          <EmailComposeFormGroup label={'To:'}>
            <AutoCompleteReceive
              data={receiversList}
              defaultValue={receivers}
              onClickCcFromLabel={handleClickCcFromLabel}
              onChange={handleChangeReceivers}
            />
          </EmailComposeFormGroup>
          {/* Subject */}
          <EmailComposeFormGroup label={'Subject:'}>
            <SingleOTPInputComponent
              value={subject}
              onChange={handleChangeSubject}
              className="outline-none w-full text-black text-[18px] font-bold h-full"
            />
          </EmailComposeFormGroup>
          {/* Cc, From */}
          {isShowCcFrom && (
            <Box className="mb-2">
              <EmailComposeFormGroup
                className="py-1"
                label="Cc:"
                isHaveBorderBottom={false}>
                <AutoCompleteReceive
                  isShowCcFromLabel={false}
                  data={receiversList}
                  defaultValue={cc}
                  onClickCcFromLabel={handleClickCcFromLabel}
                  onChange={handleChangeCc}
                />
              </EmailComposeFormGroup>
              <EmailComposeFormGroup
                className="py-1"
                label="Bcc:"
                isHaveBorderBottom={false}>
                <AutoCompleteReceive
                  isShowCcFromLabel={false}
                  data={receiversList}
                  defaultValue={bcc}
                  onClickCcFromLabel={handleClickCcFromLabel}
                  onChange={handleChangeBcc}
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

          {/* Edit Content */}

          <Box className="flex flex-col flex-1">
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              wrapperClassName="wrapper-class flex-1"
              editorClassName="editor-class border"
              toolbarClassName="toolbar-class"
              placeholder="Enter content here..."
              toolbar={toolbarCustom}
            />
            <Box>
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
              <EmailGreeting
                greetingLabel="Thanks and Best regards, ------"
                isHaveLogo={true}
                logo={<LogoWithLabel />}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Footer */}
      <Box className="p-6 bg-[#F1F1F6]">
        {/* manipulation */}
        <Box></Box>
        {/* Actions */}
        <Box className="flex justify-end items-center">
          <UseTemplateButton />
          {/* <Tooltip title="Insert link"> */}
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
          {/* </Tooltip> */}

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
            onClick={handleOnClickSubmitCompose}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default EmailCompose;
