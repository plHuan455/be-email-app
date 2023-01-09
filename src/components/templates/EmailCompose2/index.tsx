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
import ModalDrawSignature from '@components/atoms/ModalDrawSignature';
import ModalChooseSignature from '@components/atoms/ModalChooseSignature';
import { rowsSign } from '@containers/SettingsContainer/SignatureContainer/Main';
import { parseSignToHtml } from '@utils/parseSignToHtml';
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

export interface CustomFile extends File {
  percentage: number;
}

export type EmailComposeEmailFieldNames = 'to' | 'cc' | 'bcc';

export interface EmailComposeFields {
  to2: AutoCompleteGroupValueTypes[];
  to: InputContactBlock[];
  cc2: AutoCompleteGroupValueTypes[];
  cc: InputContactBlock[];
  bcc2: AutoCompleteGroupValueTypes[];
  bcc: InputContactBlock[];
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
    emailInfo: { name: string; email: string; id: number }[];
  };
}

interface EmailComposeProps {
  inputContactBlocks: InputContactBlock[];
  method: UseFormReturn<EmailComposeFields>;
  index?: number;
  isSubmitting?: boolean;
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
  selectEmployersModalRows: { identify: string; email: string; id: string }[];
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
  onSelectedDepartmentClick?: (
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
  onSelectedDepartmentClick,
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
    { field: 'identify', headerName: 'Identify', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
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
        <form className="p-8 flex items-center justify-center w-full h-full">
          <Box
            className={`flex flex-col h-full w-full mx-auto shadow-xl bg-white rounded-3xl z-[80] transition-all ${
              isFullScreen && 'fixed top-0 left-0 bottom-0'
            }`}>
            <WindowComposeActions
              className="pt-3 px-3"
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
                    name="to2"
                    render={({ field: { value, onChange } }) => (
                      <Box sx={{ flexGrow: 1 }}>
                        <AutoCompleteGroup
                          value={value}
                          options={toOptions}
                          autoAddOptionMatchRegex={emailRegex}
                          onGroupClick={(e, option) => {
                            if (option.id && option.isGroup) {
                              onDepartmentClick && onDepartmentClick(option, 'to');
                            }
                          }}
                          onChange={onChange}
                          onChipClick={(option) =>
                            onSelectedDepartmentClick &&
                            onSelectedDepartmentClick(option, 'to')
                          }
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
                    onClose={onCloseSelectEmployersModal}>
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
                        name="cc2"
                        render={({ field: { value, onChange } }) => (
                          <Box sx={{ flexGrow: 1 }}>
                            <AutoCompleteGroup
                              value={value}
                              options={ccOptions}
                              autoAddOptionMatchRegex={emailRegex}
                              onGroupClick={(e, option) => {
                                if (option.id && option.isGroup) {
                                  onDepartmentClick &&
                                    onDepartmentClick(option, 'cc');
                                }
                              }}
                              onChange={onChange}
                              onChipClick={(option) =>
                                onSelectedDepartmentClick &&
                                onSelectedDepartmentClick(option, 'cc')
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
                        name="bcc2"
                        render={({ field: { value, onChange } }) => (
                          <Box sx={{ flexGrow: 1 }}>
                            <AutoCompleteGroup
                              value={value}
                              options={ccOptions}
                              autoAddOptionMatchRegex={emailRegex}
                              onGroupClick={(e, option) => {
                                if (option.id && option.isGroup) {
                                  onDepartmentClick &&
                                    onDepartmentClick(option, 'bcc');
                                }
                              }}
                              onChange={onChange}
                              onChipClick={(option) =>
                                onSelectedDepartmentClick &&
                                onSelectedDepartmentClick(option, 'bcc')
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
                  className="flex flex-col"
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
                      // overflow: 'scroll',
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

                  <SignatureTmpTemplate />
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
            <Box className="p-6 bg-[#F1F1F6] flex items-center h-[88px]">
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
              <Box className="flex justify-end items-center flex-1 rounded-br-3xl rounded-bl-3xl">
                <UseTemplateButton
                  settings={[
                    { id: 1, name: 'Use template' },
                    { id: 2, name: 'Insert file link' },
                  ]}
                  onSettingClick={(settingId) => {
                    if (settingId === 1 && onUseTemplateClick) {
                      onUseTemplateClick();
                      return;
                    }
                  }}
                />
                {/* <Tooltip title="Insert link"> */}
                <Button
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

export default EmailCompose2;
