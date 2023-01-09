import Receiver from '@components/atoms/Receiver';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import { SingleOTPInputComponent } from '@components/atoms/Input/PinInput/SingleInput';
import AttachFiles from '@components/atoms/AttachFiles';

import { EditorState, convertToRaw, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import { UserInfo } from '../Email/Interface';
import EmailComposeFormGroup from '@components/molecules/EmailComposeFormGroup';
import { EmailResponse } from '@api/email';
import { EmailReplyInitialValue, useCreateEmailReply } from './hook/useEmailReply';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import AutoCompleteGroup from '@components/molecules/AutoCompleteGroup';
import { emailRegex } from '@constants/constants';

interface Props {
  onChangeEmailStatus: Function;
  sendTo: string[];
  emailData: EmailResponse;
  isReadOnlyReceivers?: boolean;
}

const EmailForward: React.FC<Props> = ({
  sendTo,
  onChangeEmailStatus,
  isReadOnlyReceivers = true,
  emailData,
}) => {
  const [attachedFiles, setAttachedFile] = useState<any>([]);
  const [attachFiles, setAttachFile] = useState<any>([]);

  const [isShowCcFrom, setIsShowCcFrom] = useState(false);

  const refInputAttachFile = useRef<HTMLInputElement>(null);

  const { emailReply, setEmailReply, handleCreateEmailReply } =
    useCreateEmailReply();

  const method = useForm<EmailReplyInitialValue>({
    defaultValues: emailReply,
  });

  useEffect(() => {
    method.setValue('subject', `[Reply]${emailData.email.subject}`);

    const convertToAutoCompleteGroup = (values: string[]) => {
      return values.map((value) => ({
        isGroup: false,
        name: value,
        data: [value],
      }));
    };

    if (emailData.status === 'reply') {
      method.setValue('to', convertToAutoCompleteGroup([emailData.email.from]));
    }
    if (emailData.status === 'replyAll')
      method.setValue('cc', [
        ...convertToAutoCompleteGroup(emailData.email.cc),
        ...convertToAutoCompleteGroup(emailData.email.bcc),
        ...convertToAutoCompleteGroup([emailData.email.from]),
      ]);
  }, [emailData]);

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

  const renderReceiverList = () => {
    return (
      <Box className="flex-1">
        <Box>
          <EmailComposeFormGroup
            className="flex items-center"
            classNameContent="flex items-center justify-between"
            label="To :">
            <Controller
              name="to"
              render={({ field: { value, onChange } }) => (
                <Box sx={{ flexGrow: 1 }}>
                  <AutoCompleteGroup
                    isDisable
                    value={value}
                    options={value}
                    autoAddOptionMatchRegex={emailRegex}
                    onChange={onChange}
                  />
                </Box>
              )}
            />
          </EmailComposeFormGroup>
        </Box>
        <Box
          sx={{
            '& .public-DraftStyleDefault-block': {
              marginBlock: 0,
            },
            '& .public-DraftEditorPlaceholder-root': {
              height: '100%',
              '& .public-DraftEditorPlaceholder-inner': { height: '100%' },
            },
            '& .public-DraftEditor-content': {
              minHeight: '200px',
              // overflow: 'scroll',
            },
          }}>
          <Controller
            name="content"
            render={({ field: { value, onChange } }) => (
              <Editor
                // toolbarHidden
                editorState={value}
                onEditorStateChange={(data) => onChange(data)}
                wrapperClassName="wrapper-class relative"
                editorClassName="editor-class border"
                toolbarClassName="toolbar-class bg-white relative top-0 z-50"
                onFocus={() => {
                  const toolbar = document.querySelector(
                    '.rdw-editor-toolbar',
                  ) as HTMLElement;

                  toolbar.style.position = 'sticky';
                }}
                onBlur={() => {
                  const toolbar = document.querySelector(
                    '.rdw-editor-toolbar',
                  ) as HTMLElement;

                  toolbar.style.position = 'relative';
                }}
                placeholder="Write something..."
              />
            )}
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
    );
  };

  return (
    <Box
      className={`fixed z-[100] top-0 left-0 w-full h-full`}
      onClick={() => onChangeEmailStatus()}>
      <Box className="w-full h-full bg-slate-600/50"></Box>
      <Box
        className={`flex flex-col shadow-lg p-4 absolute top-1/2 left-1/2 right-[40px] w-[80vw] h-[80vh] -translate-y-1/2 -translate-x-1/2 bg-white rounded-[11px] border border-[#E3E3E3] `}
        onClick={(e) => e.stopPropagation()}>
        <Box className="flex flex-col flex-1 overflow-scroll">
          <FormProvider {...method}>
            <form className="flex flex-col">
              <Box>
                <Controller
                  name="subject"
                  render={({ field: { value, onChange } }) => (
                    <EmailComposeFormGroup label="Re">
                      <SingleOTPInputComponent
                        className="outline-none w-full text-black text-[18px] font-bold h-full"
                        onChange={onChange}
                        value={value}
                        disabled
                      />
                    </EmailComposeFormGroup>
                  )}
                />
              </Box>
              {renderReceiverList()}
            </form>
          </FormProvider>
        </Box>
        <Box className="py-2 ">
          <Button
            className="bg-transparent text-[#7D7E80] hover:text-[#5724C5] hover:bg-transparent"
            onClick={() => method.handleSubmit(handleCreateEmailReply)}>
            <SendOutlinedIcon />
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
