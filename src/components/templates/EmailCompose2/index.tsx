import ArticleIcon from '@mui/icons-material/Article';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import TableViewIcon from '@mui/icons-material/TableView';
import SendIcon from '@mui/icons-material/Send';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelIcon from '@mui/icons-material/Cancel';
import { SingleOTPInputComponent } from '@components/atoms/Input/PinInput/SingleInput';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmailComposeFormGroup from '@components/molecules/EmailComposeFormGroup';
import WindowComposeActions from '@components/molecules/WindowComposeActions';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Box, Button, Typography } from '@mui/material';
import { emailRegex, toolbarCustom } from '@constants/constants';
import AttachFiles from '@components/atoms/AttachFiles';
import EmailGreeting from '@components/molecules/EmailGreeting';
import LogoWithLabel from '@components/atoms/LogoWithLabel';
import CustomButton from '@components/atoms/CustomButton';
import UseTemplateButton from '@components/atoms/UseTemplateButton';
import { UserInfo } from '@components/organisms/Email/Interface';
import { Controller, FormProvider, UseFormReturn } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ModalBase from '@components/atoms/ModalBase';
import DateTimePicker from '@components/atoms/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { addHttp, rem } from '@utils/functions';
import AttachFiles2, { FileInfoTypes } from '@components/molecules/AttachFiles2';
import EmailPrivateHashtagContainer from '@containers/EmailPrivateHashtagContainer';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';
import { HashtagTabs } from '@redux/Email/reducer';
import HashtagInput, {
  HashtagOptionTypes,
} from '@components/atoms/Input/HashtagInput';
import { getDefaultSignId } from '@redux/selector';
import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import SignatureTmpTemplate from '@layouts/SignatureTmpTemplate';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  AutoCompleteReceive,
  InputContactBlock,
  useAutoCompleteReceive,
} from '@components/molecules/Autocomplete';
import AutoCompleteGroup, {
  AutoCompleteGroupValueTypes,
} from '@components/molecules/AutoCompleteGroup';
import { DepartmentResponse } from '@api/deparment/interface';

export interface CustomFile extends File {
  percentage: number;
}

export type EmailComposeEmailFieldNames = 'to' | 'cc' | 'bcc';

export interface EmailComposeSignatureType {
  id: number;
  name: string;
  htmlString: string;
}

export interface EmailComposeFields {
  to: AutoCompleteGroupValueTypes[];
  cc: AutoCompleteGroupValueTypes[];
  bcc: AutoCompleteGroupValueTypes[];
  contactBlock: InputContactBlock[];
  attachFiles: {
    fileUrls: (string | undefined)[];
    files: (CustomFile | undefined)[];
  };
  subject: string;
  content: any;
  hashtags: { name: string; value: string }[];
  from: string | null;
}

// export interface HashTagTypes {
//   id: number;
//   name: string;
// }

export interface EmailComposeSelectedDepartmentTypes {
  field: EmailComposeEmailFieldNames;
  data: {
    id: number;
    name: string;
    emailInfo: { lastName: string; firstName: string; email: string; id: number }[];
  };
}

export interface EmailComposeModalRowTypes {
  lastName: string;
  firstName: string;
  email: string;
  id: string;
}

interface EmailComposeProps {
  inputContactBlocks: InputContactBlock[];
  method: UseFormReturn<EmailComposeFields>;
  index?: number;
  isSubmitting?: boolean;
  signature?: EmailComposeSignatureType;
  isOpenSelectEmployersModal?: boolean;
  isFullScreen?: boolean;
  selectedDepartment?: EmailComposeSelectedDepartmentTypes;
  selectedEmployerEmailList: string[];
  isShowCCForm?: boolean;
  attachFiles: (File | undefined)[];
  hashtagOptions: HashtagOptionTypes[];
  toOptions: AutoCompleteGroupValueTypes[];
  bccOptions: AutoCompleteGroupValueTypes[];
  ccOptions: AutoCompleteGroupValueTypes[];
  selectEmployersModalRows: EmailComposeModalRowTypes[];
  selectedDate?: Dayjs | null;
  isShowCalendarModal?: boolean;
  isOpenCalendarSelect?: boolean;
  calendarValue: Dayjs | null;
  tabBarColor?: string;
  onMaximizeClick?: () => void;
  onMinimizeClick?: () => void;
  onCCButtonClick?: () => void;
  onChangeCalendarValue: (date: Dayjs | null) => void;
  onCloseCalendarModal: () => void;
  onCloseEmail: () => void;
  onUnsetTimeClick: () => void;
  onSetTimeClick: () => void;
  onSendTimeClick: () => void;
  onSetTimeAccept?: (date: Dayjs | null) => void;
  onSetTimeCancel?: () => void;
  onSubmit: (values: EmailComposeFields) => void;
  onUseTemplateClick?: () => void;
  onDepartmentClick?: (
    option: AutoCompleteGroupValueTypes,
    field: EmailComposeEmailFieldNames,
  ) => void;
  onSelectEmployersChange?: (emails: string[]) => void;
  onCloseSelectEmployersModal?: () => void;
  onConfirmSelectEmployersModalClick?: () => void;
  onSelectedContactClick?: (
    option: AutoCompleteGroupValueTypes,
    field: EmailComposeEmailFieldNames,
  ) => void;
  onDeleteDepartmentOnInput?: (
    option: AutoCompleteGroupValueTypes,
    field: EmailComposeEmailFieldNames,
  ) => void;
}

const EmailCompose2: React.FC<EmailComposeProps> = ({
  inputContactBlocks,
  method,
  index,
  signature,
  isSubmitting = false,
  isFullScreen = false,
  isOpenSelectEmployersModal = false,
  selectedDate,
  isShowCCForm = false,
  isShowCalendarModal = false,
  isOpenCalendarSelect = false,
  selectedDepartment,
  selectedEmployerEmailList = [],
  selectEmployersModalRows,
  toOptions,
  ccOptions,
  bccOptions,
  calendarValue,
  tabBarColor,
  onMinimizeClick,
  hashtagOptions,
  onMaximizeClick,
  onCCButtonClick,
  onChangeCalendarValue,
  onCloseEmail,
  onCloseCalendarModal,
  onSetTimeClick,
  onUnsetTimeClick,
  onSendTimeClick,
  onSubmit,
  onSetTimeAccept,
  onSetTimeCancel,
  onUseTemplateClick,
  onDepartmentClick,
  onCloseSelectEmployersModal,
  onSelectEmployersChange,
  onConfirmSelectEmployersModalClick,
  onSelectedContactClick,
  onDeleteDepartmentOnInput,
}) => {
  // redux
  const defaultSignId = useSelector(getDefaultSignId);

  // states
  const [options, setOptions] = useState(inputContactBlocks);

  React.useEffect(() => {
    setOptions(inputContactBlocks);
  }, [inputContactBlocks]);

  // react hooks
  const fileInputRef = useRef<HTMLInputElement>(null);
  const composeScrollRef = useRef<HTMLDivElement>(null);

  const columns: GridColDef[] = [
    // { field: 'identify', headerName: 'Identify', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 3 },
  ];

  // functions
  const handleAttachFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box className="t-emailCompose w-full h-full py-10 mt-4">
      <FormProvider {...method}>
        <form className="pt-8 px-8 flex items-center justify-center w-full h-full">
          <Box
            className={`flex flex-col h-full w-full mx-auto shadow-xl bg-white rounded-3xl transition-all ${
              isFullScreen ? 'fixed top-0 left-0 bottom-0 z-[150]' : 'z-[80]'
            }`}>
            <WindowComposeActions
              className="pt-3 px-3 rounded-tl-3xl rounded-tr-3xl"
              sx={{
                backgroundColor: tabBarColor || 'white',
                transition: 'background .25s linear',
              }}
              onMinimizeClick={onMinimizeClick}
              onMaximizeClick={onMaximizeClick}
              onCloseClick={onCloseEmail}
            />
            <Box className="bg-white flex-1 flex flex-col" ref={composeScrollRef}>
              <Box className="px-9 py-10 pt-2 flex-1 flex flex-col">
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
                              onDepartmentClick && onDepartmentClick(option, 'to');
                            }
                          }}
                          onChange={onChange}
                          onChipClick={(option) => {
                            onDepartmentClick && onDepartmentClick(option, 'to');
                          }}
                          onChipDelete={(option) =>
                            onDeleteDepartmentOnInput &&
                            option.isGroup &&
                            onDeleteDepartmentOnInput(option, 'to')
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
                    onClick={onCCButtonClick}>
                    Cc,Bcc
                  </span>
                  <ModalBase
                    isOpen={isOpenSelectEmployersModal}
                    title="Select employers"
                    submitLabel=""
                    onClose={() => {
                      onCloseSelectEmployersModal && onCloseSelectEmployersModal();
                      setTimeout(() => {
                        document.getElementById('autocomplete-to')?.focus();
                      }, 200);
                    }}>
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
                          onSelectEmployersChange &&
                            onSelectEmployersChange(emails as string[]);
                        }}
                      />
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        sx={{ mt: rem(8) }}>
                        <Button
                          sx={{
                            backgroundColor: '#dc3545',
                            '&:hover': { backgroundColor: '#bf192a' },
                          }}
                          onClick={onCloseSelectEmployersModal}>
                          Cancel
                        </Button>
                        <Button
                          sx={{ ml: rem(20) }}
                          onClick={onConfirmSelectEmployersModalClick}
                          disabled={selectEmployersModalRows.length === 0}>
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
                              onGroupClick={(option) => {
                                if (option.id && option.isGroup) {
                                  onDepartmentClick &&
                                    onDepartmentClick(option, 'cc');
                                }
                              }}
                              onChange={onChange}
                              onChipClick={(option) =>
                                onSelectedContactClick &&
                                onSelectedContactClick(option, 'cc')
                              }
                              onChipDelete={(option) =>
                                onDeleteDepartmentOnInput &&
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
                              onGroupClick={(option) => {
                                if (option.id && option.isGroup) {
                                  onDepartmentClick &&
                                    onDepartmentClick(option, 'bcc');
                                }
                              }}
                              onChange={onChange}
                              onChipClick={(option) =>
                                onSelectedContactClick &&
                                onSelectedContactClick(option, 'bcc')
                              }
                              onChipDelete={(option) =>
                                onDeleteDepartmentOnInput &&
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

                {/* SUBJECT */}
                <EmailComposeFormGroup label={'Subject:'}>
                  <Controller
                    name="subject"
                    render={({ field: { value, onChange } }) => (
                      <SingleOTPInputComponent
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="outline-none w-full text-black text-[18px] font-bold h-full"
                      />
                    )}
                  />
                </EmailComposeFormGroup>

                {/* Edit Content */}
                <Box
                  className="flex flex-1 flex-col"
                  sx={{
                    '& .public-DraftStyleDefault-block': {
                      marginBlock: 0,
                    },
                    '& .public-DraftEditorPlaceholder-root': {
                      height: '100%',
                      '& .public-DraftEditorPlaceholder-inner': { height: '100%' },
                    },
                    '& .public-DraftEditor-content': {
                      minHeight: '100px',
                    },
                    // Align Text
                    '& .rdw-center-aligned-block *': {
                      textAlign: 'center',
                    },
                    '& .rdw-right-aligned-block *': {
                      textAlign: 'right',
                    },
                    '& .rdw-left-aligned-block *': {
                      textAlign: 'left',
                    },
                    '& .rdw-justify-aligned-block *': {
                      textAlign: 'justify',
                    },
                  }}>
                  <Controller
                    name="content"
                    render={({ field: { value, onChange } }) => (
                      <Editor
                        editorState={value}
                        onEditorStateChange={(data) => onChange(data)}
                        wrapperClassName="wrapper-class flex flex-col relative"
                        editorClassName="editor-class border flex-1"
                        toolbarClassName="toolbar-class w-full bg-white relative top-0 z-50"
                        placeholder="Enter content here..."
                        toolbar={toolbarCustom}
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
                      />
                    )}
                  />
                  {signature && (
                    <Box className="mt-4">
                      <Typography
                        dangerouslySetInnerHTML={{
                          __html: signature.htmlString,
                        }}></Typography>
                    </Box>
                  )}
                  {/* <SignatureTmpTemplate /> */}
                  <Box className="mt-4">
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
                    {/* Private Hashtag */}
                    <Controller
                      name="hashtags"
                      render={({ field: { value, onChange } }) => (
                        <HashtagInput
                          label="Hashtags: "
                          optionList={hashtagOptions}
                          value={value}
                          onChange={onChange}
                          placeholder="Enter hashtags"
                          optionRegex={new RegExp(/([a-zA-Z0-9]+\b)/)}
                        />
                      )}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Footer */}
            <Box className="p-6 bg-[#F1F1F6] flex items-center h-[88px] rounded-br-3xl rounded-bl-3xl">
              {/* manipulation */}
              <Box display="flex" alignItems="center">
                <CustomButton
                  className="flex-shrink-1"
                  padding="8px 10px"
                  label="SCHEDULE"
                  bgButtonColor="#554CFF"
                  color="#fff"
                  textSize={15}
                  isBeforeIcon={true}
                  beforeIcon={<TableViewIcon fontSize="small" />}
                  onClick={onSendTimeClick}
                />
                {Boolean(selectedDate) && (
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1" sx={{ ml: rem(8) }}>
                      {dayjs(selectedDate).format('lll')}
                    </Typography>
                    <Button
                      variant="text"
                      sx={{
                        color: '#7E7E7E',
                        minWidth: 'auto',
                        ml: rem(4),
                        p: rem(4),
                      }}
                      onClick={onUnsetTimeClick}>
                      <CancelIcon sx={{ fontSize: rem(12) }} />
                    </Button>
                  </Box>
                )}
              </Box>

              {/* ACTIONS */}
              <Box className="flex justify-end items-center flex-1">
                <Button
                  sx={{
                    width: rem(34),
                    height: rem(40),
                    px: rem(4),
                    minWidth: 'auto',
                    mr: rem(12),
                    '&:hover': { backgroundColor: '#E0E0EA' },
                  }}
                  variant="text"
                  onClick={onUseTemplateClick}>
                  <ArticleIcon className="text-[#7D7E80]" />
                </Button>
                {/* <Tooltip title="Insert link"> */}
                <Button
                  sx={{
                    width: rem(34),
                    height: rem(40),
                    px: rem(4),
                    minWidth: 'auto',
                    mr: rem(12),
                    '&:hover': { backgroundColor: '#E0E0EA' },
                  }}
                  variant="text"
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
                </Button>
                {/* <CustomButton
                  padding="8px 10px"
                  classNameLabel="pr-1"
                  label={selectedDate ? 'SEND' : 'SEND NOW'}
                  type="submit"
                  bgButtonColor="#554CFF"
                  color="#fff"
                  textSize={15}
                  isBeforeIcon={!Boolean(selectedDate)}
                  beforeIcon={<SendIcon fontSize="small" />}
                  isAfterIcon={Boolean(selectedDate)}
                  afterIcon={<AccessTimeIcon fontSize="small" />}
                /> */}
                <LoadingButton
                  loading={isSubmitting}
                  loadingPosition="start"
                  sx={{
                    backgroundColor: '#554CFF',
                    color: '#fff',
                    padding: `${rem(6)} ${rem(16)}`,
                    '&:hover': {
                      backgroundColor: '#6d66fb',
                    },
                    '&.MuiLoadingButton-root.Mui-disabled': {
                      color: '#c6c5c5',
                      '& .MuiButton-startIcon': {
                        mr: 0,
                      },
                    },
                  }}
                  startIcon={<SendIcon fontSize="small" />}
                  endIcon={
                    selectedDate ? <AccessTimeIcon fontSize="small" /> : undefined
                  }
                  onClick={() => {
                    method.handleSubmit(onSubmit)();
                  }}>
                  {selectedDate ? 'SEND' : 'SEND NOW'}
                </LoadingButton>
              </Box>
            </Box>
            <ModalBase
              title="Set Time To Send"
              isOpen={isShowCalendarModal}
              style={{ minHeight: rem(200) }}
              onClose={onCloseCalendarModal}
              submitLabel={''}
              modalType={'submit'}
              onSubmit={() => onSubmit(method.getValues())}>
              <DateTimePicker
                value={calendarValue}
                isOpen={isOpenCalendarSelect}
                setValueCalendar={onChangeCalendarValue}
                onAccept={onSetTimeAccept}
                onClose={onSetTimeCancel}
              />
              <Box className="" display="flex">
                <Button
                  className="button-create-mui"
                  sx={{ flexBasis: '50%' }}
                  color={'error'}
                  onClick={onUnsetTimeClick}>
                  NOW
                </Button>
                <Button
                  className="button-create-mui"
                  sx={{ flexBasis: '50%', ml: rem(12) }}
                  onClick={onSetTimeClick}>
                  SET TIME
                </Button>
              </Box>
            </ModalBase>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export type SelectedEmailHashType = {
  [key in EmailComposeEmailFieldNames]: { [key: string]: true };
};

interface UseEmailComposeContactFieldsProps {
  method: UseFormReturn<any>;
  departmentList: DepartmentResponse[];
  selectedEmailHash: SelectedEmailHashType;
  onChangeSelectedEmailHash: (value: SelectedEmailHashType) => void;
}

export const useEmailComposeContactFields = ({
  method,
  departmentList,
  selectedEmailHash,
  onChangeSelectedEmailHash,
}: UseEmailComposeContactFieldsProps) => {
  const [selectedDepartment, setSelectedDepartment] =
    useState<EmailComposeSelectedDepartmentTypes>();

  const [selectedEmployerModalList, setSelectedEmployerModalList] = useState<
    string[]
  >([]);

  const {
    convertedToOptions = [],
    convertedCcOptions = [],
    convertedBccOptions = [],
  } = useMemo(() => {
    if (!departmentList) return {};
    const toOptions: AutoCompleteGroupValueTypes[] = [];
    const ccOptions: AutoCompleteGroupValueTypes[] = [];
    const bccOptions: AutoCompleteGroupValueTypes[] = [];

    departmentList?.forEach((department) => {
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
      convertedToOptions: toOptions,
      convertedCcOptions: ccOptions,
      convertedBccOptions: bccOptions,
    };
  }, [departmentList, selectedEmailHash]);

  const convertedSelectEmployersModalRows = useMemo<
    EmailComposeModalRowTypes[]
  >(() => {
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
          email: value.email,
          lastName: value.lastName,
          firstName: value.firstName,
          id: value.email,
        })) ?? []
    );
  }, [selectedDepartment]);

  const onDepartmentClick = (
    option: AutoCompleteGroupValueTypes,
    field: EmailComposeEmailFieldNames,
  ) => {
    const foundDepartment = departmentList?.find((value) => value.id === option.id);
    if (foundDepartment) {
      const currValue = method.getValues(field);
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
              firstName: value.first_name,
              lastName: value.last_name,
              email: value.email,
              id: value.id,
            })) ?? [],
        },
      });
    }
  };

  const onSelectEmployersChange = (emails: string[]) => {
    setSelectedEmployerModalList(emails);
  };

  const onDeleteDepartmentOnInput = (
    option: AutoCompleteGroupValueTypes,
    field: EmailComposeEmailFieldNames,
  ) => {
    const cloneSelectedEmailHash = { ...selectedEmailHash };
    option.data.forEach((email) => {
      delete cloneSelectedEmailHash[field][email];
    });

    onChangeSelectedEmailHash(cloneSelectedEmailHash);
  };

  const onCloseSelectEmployersModal = () => {
    setSelectedDepartment(undefined);
  };

  const onConfirmSelectEmployersModalClick = () => {
    if (selectedDepartment) {
      const { field, data: selectedDepartmentData } = selectedDepartment;

      const currValue = method.getValues(field);
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
      onChangeSelectedEmailHash(cloneSelectedEmailHash);

      // Selected Department on Modal is not exist in currValue
      if (foundDepartmentValueIndex === -1) {
        if (selectedEmployerModalList.length !== 0) {
          method.setValue(field, [
            ...currValue,
            {
              id: selectedDepartment.data.id,
              isGroup: true,
              name: selectedDepartment.data.name,
              data: [...selectedEmployerModalList],
              selectedDataLabelAfter: ` (${selectedEmployerModalList.length}/${selectedDepartment.data.emailInfo.length})`,
            },
          ]);
        }
      } else {
        if (selectedEmployerModalList.length === 0) {
          currValue.splice(foundDepartmentValueIndex, 1);
        } else {
          currValue[foundDepartmentValueIndex].data = [...selectedEmployerModalList];
          currValue[
            foundDepartmentValueIndex
          ].selectedDataLabelAfter = ` (${selectedEmployerModalList.length}/${selectedDepartment.data.emailInfo.length})`;
        }
        method.setValue(field, currValue);
      }
    }
    setSelectedDepartment(undefined);
    setSelectedEmployerModalList([]);
  };

  return {
    isOpenSelectEmployersModal: Boolean(selectedDepartment),
    toOptions: convertedToOptions,
    ccOptions: convertedCcOptions,
    bccOptions: convertedBccOptions,
    selectedEmployerEmailList: selectedEmployerModalList,
    selectedDepartment,
    selectEmployersModalRows: convertedSelectEmployersModalRows,
    onDepartmentClick,
    onSelectedContactClick: onDepartmentClick,
    onSelectEmployersChange,
    onDeleteDepartmentOnInput,
    onCloseSelectEmployersModal,
    onConfirmSelectEmployersModalClick,
  };
};

export default EmailCompose2;
