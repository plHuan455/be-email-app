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
  EmailComposeSelectedDepartmentTypes,
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
  const [selectedDepartment, setSelectedDepartment] =
    useState<EmailComposeSelectedDepartmentTypes>();
  const [selectedEmployerModalList, setSelectedEmployerModalList] = useState<
    string[]
  >([]);

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

  const convertedSelectEmployersModalRows = useMemo(() => {
    if (selectedDepartment === undefined) return [];
    const field = selectedDepartment.field;
    return (
      selectedDepartment.data.emailInfo
        .filter((value) => {
          switch (field) {
            case 'to':
              return (
                !selectedEmailHash.bcc[value.email] &&
                !selectedEmailHash.cc[value.email]
              );
            case 'cc':
              return (
                !selectedEmailHash.bcc[value.email] &&
                !selectedEmailHash.to[value.email]
              );
            case 'bcc':
              return (
                !selectedEmailHash.to[value.email] &&
                !selectedEmailHash.cc[value.email]
              );
          }
        })
        .map((value) => ({
          identify: value.name,
          email: value.email,
          id: value.email,
        })) ?? []
    );
  }, [selectedDepartment]);

  const { toOptions, ccOptions, bccOptions } = useMemo(() => {
    if (!departmentData)
      return {
        toOptions: [],
        ccOptions: [],
        bccOptions: [],
      };
    const toOptions: AutoCompleteGroupValueTypes[] = [];
    const ccOptions: AutoCompleteGroupValueTypes[] = [];
    const bccOptions: AutoCompleteGroupValueTypes[] = [];

    departmentData?.forEach((department) => {
      const toEmails: string[] = [];
      const ccEmails: string[] = [];
      const bccEmails: string[] = [];
      department.users?.forEach((user) => {
        if (
          !selectedEmailHash.bcc[user.email] &&
          !selectedEmailHash.cc[user.email]
        ) {
          toEmails.push(user.email);
        }
        if (!selectedEmailHash.to[user.email] && !selectedEmailHash.cc[user.email]) {
          bccEmails.push(user.email);
        }
        if (
          !selectedEmailHash.to[user.email] &&
          !selectedEmailHash.bcc[user.email]
        ) {
          ccEmails.push(user.email);
        }
      });

      toOptions.push({
        isGroup: true,
        name: department.name,
        id: department.id,
        data: toEmails,
      });
      ccOptions.push({
        isGroup: true,
        name: department.name,
        id: department.id,
        data: ccEmails,
      });
      bccOptions.push({
        isGroup: true,
        name: department.name,
        id: department.id,
        data: bccEmails,
      });
    });

    return {
      toOptions: toOptions,
      ccOptions: ccOptions,
      bccOptions: bccOptions,
    };
  }, [departmentData, selectedEmailHash]);

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
    { field: 'identify', headerName: 'Identify', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
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

  const handleDepartmentClick = (
    option: AutoCompleteGroupValueTypes,
    field: EmailComposeEmailFieldNames,
  ) => {
    const foundDepartment = departmentData?.find((value) => value.id === option.id);
    if (foundDepartment) {
      const currValue = method.getValues(`${field}`);
      const foundCurrSelectedEmployers = currValue.find(
        (value) => value.id === option.id,
      );
      if (foundCurrSelectedEmployers) {
        setSelectedEmployerModalList(foundCurrSelectedEmployers.data);
      } else {
        setSelectedEmployerModalList(
          foundDepartment.users?.map((value) => value.email) ?? [],
        );
      }
      setSelectedDepartment({
        field,
        data: {
          id: foundDepartment.id,
          name: foundDepartment.name,
          emailInfo:
            foundDepartment.users?.map((value) => ({
              name: value.identity,
              email: value.email,
              id: value.id,
            })) ?? [],
        },
      });
    }
  };

  const handleDeleteDepartmentOnInput = (
    option: AutoCompleteGroupValueTypes,
    field: EmailComposeEmailFieldNames,
  ) => {
    const cloneSelectedEmailHash = { ...selectedEmailHash };
    option.data.forEach((email) => {
      delete cloneSelectedEmailHash[field][email];
    });

    setSelectedEmailHash(cloneSelectedEmailHash);
  };

  const handleConfirmSelectEmployersModalClick = () => {
    if (selectedDepartment) {
      const { field, data: selectedDepartmentData } = selectedDepartment;

      const currValue = method.getValues(`${field}`);
      const foundDepartmentValueIndex = currValue.findIndex(
        (value) => value.id === selectedDepartment.data.id,
      );

      // { [key: string]: true } // email: true
      const cloneSelectedEmailHash = { ...selectedEmailHash };

      selectedDepartment.data.emailInfo.forEach((emailInfo) => {
        if (selectedEmployerModalList.includes(emailInfo.email)) {
          cloneSelectedEmailHash[field][emailInfo.email] = true;
        } else {
          delete cloneSelectedEmailHash[field][emailInfo.email];
        }
      });
      setSelectedEmailHash(cloneSelectedEmailHash);

      if (foundDepartmentValueIndex === -1) {
        if (selectedEmployerModalList.length !== 0) {
          method.setValue(`${field}`, [
            ...currValue,
            {
              id: selectedDepartment.data.id,
              isGroup: true,
              name: selectedDepartment.data.name,
              data: [...selectedEmployerModalList],
            },
          ]);
        }
      } else {
        if (selectedEmployerModalList.length === 0) {
          console.log(foundDepartmentValueIndex);
          // currValue.splice(foundDepartmentValueIndex, 1);
        } else {
          currValue[foundDepartmentValueIndex].data = [...selectedEmployerModalList];
        }
        method.setValue(`${field}`, currValue);
      }
    }
    setSelectedDepartment(undefined);
    setSelectedEmployerModalList([]);
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
                      onGroupClick={(e, option) => {
                        if (option.id && option.isGroup) {
                          handleDepartmentClick(option, 'to');
                        }
                      }}
                      onChange={onChange}
                      onChipClick={(option) => handleDepartmentClick(option, 'to')}
                      onChipDelete={(option) =>
                        option.isGroup && handleDeleteDepartmentOnInput(option, 'to')
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
                onClose={() => setSelectedDepartment(undefined)}>
                <Box sx={{ width: '80vw' }}>
                  <Typography sx={{ py: rem(4) }}>
                    {selectedDepartment?.data.name}
                  </Typography>
                  <DataGrid
                    sx={{ height: '50vh' }}
                    rows={convertedSelectEmployersModalRows}
                    columns={columns}
                    checkboxSelection
                    hideFooter
                    selectionModel={selectedEmployerModalList}
                    onSelectionModelChange={(emails) => {
                      setSelectedEmployerModalList(emails as string[]);
                    }}
                  />
                  <Box display="flex" justifyContent="flex-end" sx={{ mt: rem(8) }}>
                    <Button
                      sx={{
                        backgroundColor: '#dc3545',
                        '&:hover': { backgroundColor: '#bf192a' },
                      }}
                      onClick={() => setSelectedDepartment(undefined)}>
                      Cancel
                    </Button>
                    <Button
                      sx={{ ml: rem(20) }}
                      onClick={handleConfirmSelectEmployersModalClick}>
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
                          onGroupClick={(e, option) => {
                            if (option.id && option.isGroup) {
                              handleDepartmentClick(option, 'cc');
                            }
                          }}
                          onChange={onChange}
                          onChipClick={(option) =>
                            handleDepartmentClick(option, 'cc')
                          }
                          onChipDelete={(option) =>
                            option.isGroup &&
                            handleDeleteDepartmentOnInput(option, 'cc')
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
                          onGroupClick={(e, option) => {
                            if (option.id && option.isGroup) {
                              handleDepartmentClick(option, 'bcc');
                            }
                          }}
                          onChange={onChange}
                          onChipClick={(option) =>
                            handleDepartmentClick(option, 'bcc')
                          }
                          onChipDelete={(option) =>
                            option.isGroup &&
                            handleDeleteDepartmentOnInput(option, 'bcc')
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
