import Receiver from '@components/atoms/Receiver';
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
import AutoCompleteGroup, {
  AutoCompleteGroupValueTypes,
} from '@components/molecules/AutoCompleteGroup';
import { emailRegex } from '@constants/constants';
import AttachFiles2 from '@components/molecules/AttachFiles2';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
import { toast } from 'react-toastify';
import { getDepartments } from '@api/deparment';
import { useQuery } from '@tanstack/react-query';
import {
  EmailComposeEmailFieldNames,
  EmailComposeModalRowTypes,
  EmailComposeSelectedDepartmentTypes,
  SelectedEmailHashType,
  useEmailComposeContactFields,
} from '@components/templates/EmailCompose2';
import classNames from 'classnames';
import ModalBase from '@components/atoms/ModalBase';
import { rem } from '@utils/functions';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

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
  const [isShowCCForm, setIsShowCCForm] = useState<boolean>(false);

  const alertDialog = useAlertDialog();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const composeScrollRef = useRef<HTMLDivElement>(null);

  const {
    emailReply,
    selectedEmailHash,
    setSelectedEmailHash,
    setEmailReply,
    handleCreateEmailReply,
  } = useCreateEmailReply();

  const method = useForm<EmailReplyInitialValue>({
    defaultValues: emailReply,
  });

  // API
  const { data: departmentData, isLoading } = useQuery({
    queryKey: ['email-compose-get-departments'],
    queryFn: async () => {
      const res = await getDepartments();
      return res.data;
    },
  });

  const {
    toOptions,
    bccOptions,
    ccOptions,
    selectedDepartment,
    selectedEmployerEmailList,
    selectEmployersModalRows,
    onDepartmentClick,
    onDeleteDepartmentOnInput,
    onConfirmSelectEmployersModalClick,
    onSelectEmployersChange,
    onCloseSelectEmployersModal,
  } = useEmailComposeContactFields({
    method,
    departmentList: departmentData ?? [],
    selectedEmailHash: selectedEmailHash,
    onChangeSelectedEmailHash: setSelectedEmailHash,
  });

  useEffect(() => {
    method.reset();
    method.setValue('subject', `[${emailData.status}]${emailData.email.subject}`);

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
    if (emailData.status === 'replyAll') {
      const convertArr = new Set([
        ...(emailData.email.cc ?? []),
        ...(emailData.email.to ?? []),
        ...(emailData.email.bcc ?? []),
      ]);

      method.setValue('cc', convertToAutoCompleteGroup(Array.from(convertArr)));
    }
  }, [emailData]);

  const columns: GridColDef[] = [
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 3 },
  ];

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
        {emailData.status !== 'forward' ? (
          <Box>
            <EmailComposeFormGroup
              className="flex items-center"
              classNameContent="flex items-center justify-between"
              label="To :">
              <Controller
                name={`${emailData.status === 'reply' ? 'to' : 'cc'}`}
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
        ) : (
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
                      value={value}
                      options={toOptions}
                      autoAddOptionMatchRegex={emailRegex}
                      onGroupClick={(option, e) => {
                        if (option.id && option.isGroup) {
                          onDepartmentClick(option, 'to');
                        }
                      }}
                      onChange={onChange}
                      onChipClick={(option) => onDepartmentClick(option, 'to')}
                      onChipDelete={(option) =>
                        option.isGroup && onDeleteDepartmentOnInput(option, 'to')
                      }
                    />
                  </Box>
                )}
              />
              <span
                className={classNames(
                  'flex items-center',
                  'text-[#7E7E7E] text-[14px] border rounded-md p-2 py-1 cursor-pointer',
                  isShowCCForm && 'font-bold border-2',
                )}
                onClick={() => setIsShowCCForm((preState) => !preState)}>
                Cc,Bcc
              </span>
              <ModalBase
                isOpen={Boolean(selectedDepartment)}
                title="Select employers"
                submitLabel=""
                onClose={() => onCloseSelectEmployersModal()}>
                <Box sx={{ width: '80vw' }}>
                  <Typography sx={{ py: rem(4) }}>
                    {selectedDepartment?.data.name}
                  </Typography>
                  <DataGrid
                    sx={{ height: '50vh' }}
                    rows={selectEmployersModalRows}
                    columns={columns}
                    checkboxSelection
                    hideFooter
                    selectionModel={selectedEmployerEmailList}
                    onSelectionModelChange={(emails) => {
                      onSelectEmployersChange(emails as string[]);
                    }}
                  />
                  <Box display="flex" justifyContent="flex-end" sx={{ mt: rem(8) }}>
                    <Button
                      sx={{
                        backgroundColor: '#dc3545',
                        '&:hover': { backgroundColor: '#bf192a' },
                      }}
                      onClick={() => onCloseSelectEmployersModal()}>
                      Cancel
                    </Button>
                    <Button
                      sx={{ ml: rem(20) }}
                      onClick={onConfirmSelectEmployersModalClick}>
                      OK
                    </Button>
                  </Box>
                </Box>
              </ModalBase>
            </EmailComposeFormGroup>
            {isShowCCForm && (
              <Box className="mb-2">
                <EmailComposeFormGroup
                  className="py-1"
                  label="Cc:"
                  isHaveBorderBottom={true}>
                  <Controller
                    name="cc"
                    render={({ field: { value, onChange } }) => (
                      <Box sx={{ flexGrow: 1 }}>
                        <AutoCompleteGroup
                          value={value}
                          options={ccOptions}
                          autoAddOptionMatchRegex={emailRegex}
                          onGroupClick={(option, e) => {
                            if (option.id && option.isGroup) {
                              onDepartmentClick(option, 'cc');
                            }
                          }}
                          onChange={onChange}
                          onChipClick={(option) =>
                            onDepartmentClick(option, 'cc')
                          }
                          onChipDelete={(option) =>
                            option.isGroup &&
                            onDeleteDepartmentOnInput(option, 'cc')
                          }
                        />
                      </Box>
                    )}
                  />
                </EmailComposeFormGroup>
                <EmailComposeFormGroup
                  className="py-1"
                  label="Bcc:"
                  isHaveBorderBottom={true}>
                  <Controller
                    name="bcc"
                    render={({ field: { value, onChange } }) => (
                      <Box sx={{ flexGrow: 1 }}>
                        <AutoCompleteGroup
                          value={value}
                          options={bccOptions}
                          autoAddOptionMatchRegex={emailRegex}
                          onGroupClick={(option, e) => {
                            if (option.id && option.isGroup) {
                              onDepartmentClick(option, 'bcc');
                            }
                          }}
                          onChange={onChange}
                          onChipClick={(option) =>
                            onDepartmentClick(option, 'bcc')
                          }
                          onChipDelete={(option) =>
                            option.isGroup &&
                            onDeleteDepartmentOnInput(option, 'bcc')
                          }
                        />
                      </Box>
                    )}
                  />
                </EmailComposeFormGroup>
              </Box>
            )}
          </Box>
        )}
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
