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
import AttachFiles2 from '@components/molecules/AttachFiles2';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
import { toast } from 'react-toastify';

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
  const alertDialog = useAlertDialog();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const composeScrollRef = useRef<HTMLDivElement>(null);

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

  const handleSendEmailReply = (values: EmailReplyInitialValue) => {
    const { to, cc, bcc } = values;

    if (to.length === 0 && cc.length === 0 && bcc.length === 0) {
      alertDialog.setAlertData(
        "Can't send email",
        "Can't send email without receiver",
        () => {
          alertDialog.onClose();
        },
      );
      return;
    }

    handleCreateEmailReply(values, () => {
      toast.success('Reply Successfully!');
      onChangeEmailStatus();
    });
  };

  const handleAttachFile = (e) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
          <Controller
            name="attachFiles"
            render={({ field: { value, onChange } }) => {
              if (value.files.length === 0) return <></>;
              return (
                <AttachFiles2
                  fileList={value.files}
                  inputId="react-compose-file-input"
                  onUploaded={(index, url) => {
                    console.log('uploading');
                    const cloneAttachFiles = { ...value };
                    cloneAttachFiles.fileUrls[index] = url;
                    cloneAttachFiles.files[index].percentage = 100;
                    onChange(cloneAttachFiles);
                  }}
                  onDelete={(index) => {
                    const cloneAttachFile = { ...value };
                    cloneAttachFile.files.splice(index, 1);
                    cloneAttachFile.fileUrls.splice(index, 1);
                    onChange(cloneAttachFile);
                  }}
                  onDeleteAll={() => {
                    onChange({ files: [], fileUrls: [] });
                  }}
                />
              );
            }}
          />
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
        <Box className="flex flex-col flex-1 overflow-scroll" ref={composeScrollRef}>
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
            onClick={() => {
              method.handleSubmit(handleSendEmailReply)();
            }}>
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
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files) {
                  const cloneAttachFile = method.getValues('attachFiles');
                  cloneAttachFile.files = [
                    ...cloneAttachFile.files,
                    ...Object.keys(e.target.files).map(
                      (key) => e.target.files?.[key],
                    ),
                  ];
                  e.target.value = '';
                  method.setValue('attachFiles', cloneAttachFile);
                  // if (attachFileRef.current) {
                  //   attachFileRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
                  // }
                  setTimeout(() => {
                    if (composeScrollRef.current) {
                      composeScrollRef.current.scrollTo({
                        top: composeScrollRef.current.scrollHeight,
                      });
                    }
                  }, 300);
                  // onChangeAttachFile([
                  //   ...method.getValues('attachFiles'),
                  //   ...Object.keys(e.target.files).map((key) => e.target.files?.[key])
                  // ])
                }
              }}
              multiple
            />
            <AttachFileIcon className="text-[#7D7E80]" />
          </Button>
        </Box>
      </Box>
      <AlertDialog
        titleLabel={alertDialog.title}
        descriptionLabel={alertDialog.description}
        isOpen={alertDialog.isOpen}
        onClose={() => {
          alertDialog.onClose();
          if (alertDialog.onCloseCallBack) {
            alertDialog.onCloseCallBack();
          }
        }}
        onAgree={alertDialog.callback}
        onDisagree={alertDialog.onClose}
      />
    </Box>
  );
};

export default EmailForward;
