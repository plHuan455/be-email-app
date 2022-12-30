import { SingleOTPInputComponent } from '@components/atoms/Input/PinInput/SingleInput';
import { Box, IconButton } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import EmailComposeFormGroup from '../EmailComposeFormGroup';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Editor } from 'react-draft-wysiwyg';
import { toolbarCustom } from '@constants/constants';
import CancelIcon from '@mui/icons-material/Cancel';
import { Controller, FormProvider, UseFormReturn } from 'react-hook-form';
import { EmailComposeFields } from '@components/templates/EmailCompose2';
import AttachFiles2 from '../AttachFiles2';

import styles from './style.module.scss';

interface Test {
  editor: { focus: () => void };
}

interface Props {
  method: UseFormReturn<EmailComposeFields>;
  isShow: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const EmailReplyMessLayout: React.FC<Props> = ({
  method,
  isShow,
  onClose,
  onOpen,
}) => {
  // useRef
  const fileInputRef = useRef<HTMLInputElement>(null);
  const composeScrollRef = useRef<HTMLDivElement>(null);
  const refEditor = useRef<Test>();

  // useEffect
  useEffect(() => {
    if (!refEditor.current) return;
    refEditor.current.editor.focus();
  });

  //   render FNC
  const _renderReceiverList = () => {
    return (
      <>
        <Box>
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
                height: '200px',
                overflow: 'scroll',
              },
            }}>
            <Controller
              name="content"
              render={({ field: { value, onChange } }) => (
                <Editor
                  //   toolbarHidden
                  editorState={value}
                  onEditorStateChange={(data) => onChange(data)}
                  wrapperClassName="wrapper-class flex-1 flex flex-col"
                  editorClassName="editor-class border flex-1"
                  toolbarClassName="toolbar-class w-full"
                  placeholder="Write something..."
                  toolbar={toolbarCustom}
                  ref={refEditor}
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
      </>
    );
  };

  //   Handler FNC

  const handleAttachFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (!isShow) return null;

  return (
    <Box className="fixed top-0 bottom-0 left-0 right-0 z-[110]">
      <Box className="relative w-full h-full ">
        {/* Mask Layout */}
        <Box className="w-full h-full bg-slate-600/50" onClick={onClose}></Box>
        <Box
          className={`${styles.mainCompose} absolute left-1/2 -translate-y-1/2 -translate-x-1/2 h-[80%]`}>
          <FormProvider {...method}>
            <Box className="min-w-[600px] h-full bg-white rounded-2xl border border-[#E3E3E3]">
              <Box className="p-4 flex flex-col h-full">
                {/* Header */}
                <Box>
                  <EmailComposeFormGroup label="Re">
                    <SingleOTPInputComponent className="outline-none w-full text-black text-[18px] font-bold h-full" />
                  </EmailComposeFormGroup>
                </Box>
                {/* Content */}
                <Box className="flex-1 overflow-scroll">{_renderReceiverList()}</Box>
                {/* Footer */}
                <Box className="py-2">
                  <IconButton className="bg-transparent text-[#7D7E80] hover:text-[#5724C5] hover:bg-transparent">
                    <SendOutlinedIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    className="bg-transparent p-2 hover:bg-transparent"
                    onClick={handleAttachFileClick}>
                    <input
                      type="file"
                      name="test"
                      id="react-compose-file-input"
                      hidden
                      accept="file"
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
                  </IconButton>
                </Box>
                {/* Close Icon */}
                <Box className="absolute top-0 right-0">
                  <IconButton onClick={onClose}>
                    <CancelIcon fontSize="large" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </FormProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default EmailReplyMessLayout;
