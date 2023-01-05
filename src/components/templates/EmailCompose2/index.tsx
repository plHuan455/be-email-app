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
import { useCallback, useEffect, useRef, useState } from 'react';
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

export interface CustomFile extends File {
  percentage: number;
}

export interface EmailComposeFields {
  to: InputContactBlock[];
  cc: InputContactBlock[];
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

interface EmailComposeProps {
  inputContactBlocks: InputContactBlock[];
  method: UseFormReturn<EmailComposeFields>;
  index?: number;
  isSubmitting?: boolean;
  isFullScreen?: boolean;
  isShowCCForm?: boolean;
  attachFiles: (File | undefined)[];
  hashtagOptions: HashtagOptionTypes[];
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
}

const EmailCompose2: React.FC<EmailComposeProps> = ({
  inputContactBlocks,
  method,
  index,
  isSubmitting = false,
  isFullScreen = false,
  selectedDate,
  isShowCCForm = false,
  isShowCalendarModal = false,
  isOpenCalendarSelect = false,
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
}) => {
  // redux
  const defaultSignId = useSelector(getDefaultSignId);

  // states
  const [options, setOptions] = useState(inputContactBlocks);

  React.useEffect(() => {
    setOptions(inputContactBlocks);
  }, [inputContactBlocks]);

  const [toData, setToData] = useState([]);
  const [ccData, setCcData] = useState([]);
  const [bccData, setBccData] = useState([]);

  // react hooks
  const fileInputRef = useRef<HTMLInputElement>(null);
  const composeScrollRef = useRef<HTMLDivElement>(null);

  // functions
  const handleAttachFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const { to, cc, bcc, onUpdate } = useAutoCompleteReceive({
    options: inputContactBlocks,
    fields: ['to', 'cc', 'bcc'] as const,
    filterFunc: (field) => (option) => {
      const employees = option.subMenu;

      // Nếu là mail
      if (!employees) {
        return (option.field === field && option.isSelected) || !option.isSelected;
      }

      if (employees.length === 0) return true;

      let isSomeEmploySelected = false;
      let isSomeEmployEqualField = false;

      const isFullEmploySelected = employees.every((employ) => {
        if (employ.isSelected) isSomeEmploySelected = true;
        if (employ.field === field) isSomeEmployEqualField = true;
        return employ.isSelected;
      });

      // Nếu tất cả employ được chọn
      if (isFullEmploySelected) {
        // Nếu có employ thuộc field => return true
        // Nếu không có employ thuộc filed => return false
        return isSomeEmployEqualField;
      }

      // Nếu có ít nhất 1 employ được chọn => return true
      // Nếu không có employ được chọn => return true
      // Còn lại => return false
      return isSomeEmploySelected || !isFullEmploySelected;
    },
  });

  React.useEffect(() => {
    onUpdate();
  }, [toData, ccData, bccData, options]);

  return (
    <Box className="t-emailCompose w-full h-full py-10 mt-4">
      <FormProvider {...method}>
        <form
          className="p-8 flex items-center justify-center w-full h-full"
          onSubmit={method.handleSubmit(onSubmit)}>
          <Box
            className={`flex flex-col h-full w-full mx-auto shadow-xl bg-white rounded-3xl overflow-hidden z-[80] transition-all ${
              isFullScreen && 'fixed top-0 left-0 bottom-0'
            }`}>
            <WindowComposeActions
              className="p-3 pr-3pt-3 pr-3"
              sx={{
                backgroundColor: tabBarColor || 'white',
                transition: 'background .25s linear',
              }}
              onMinimizeClick={onMinimizeClick}
              onMaximizeClick={onMaximizeClick}
              onCloseClick={onCloseEmail}
            />
            <Box
              className="bg-white flex-1 flex flex-col overflow-scroll"
              ref={composeScrollRef}>
              <Box className="px-9 py-10 pt-2 flex-1 flex flex-col">
                <Controller
                  name="to"
                  render={({ field: { value, onChange } }) => {
                    return (
                      <EmailComposeFormGroup
                        classNameContent="flex items-center justify-between"
                        label="To :">
                        <AutoCompleteReceive
                          className="flex-1"
                          options={to.options}
                          name="to"
                          value={value}
                          onChange={(v) => {
                            console.log(v);
                            onChange(v);
                            method.setValue(
                              'contactBlock',
                              Array.from(new Set([...inputContactBlocks, ...v])),
                            );
                          }}
                          onChangeOptions={(option) => {
                            setOptions((options) => {
                              return [...options, option];
                            });
                          }}
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
                      </EmailComposeFormGroup>
                    );
                  }}
                />
                {isShowCCForm && (
                  <Box className="mb-2">
                    <EmailComposeFormGroup
                      className="py-1"
                      label="Cc:"
                      isHaveBorderBottom={true}>
                      <Controller
                        name="cc"
                        render={({ field: { value, onChange } }) => (
                          // <AutoCompleteReceive
                          //   forField={'cc'}
                          //   value={ccValue}
                          //   data={ccData}
                          //   defaultValue={value}
                          //   onChangeValue={(v) => {
                          //     onChange(v);
                          //     setCcValue(v);
                          //     update();
                          //     method.setValue(
                          //       'contactBlock',
                          //       Array.from(new Set([...inputContactBlocks, ...v])),
                          //     );
                          //   }}
                          // />
                          <AutoCompleteReceive
                            options={cc.options}
                            name="cc"
                            value={value}
                            onChange={(v) => {
                              onChange(v);
                              console.log(v);
                              method.setValue(
                                'contactBlock',
                                Array.from(new Set([...inputContactBlocks, ...v])),
                              );
                            }}
                            onChangeOptions={(option) => {
                              setOptions((options) => {
                                return [...options, option];
                              });
                            }}
                          />
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
                          // <AutoCompleteReceive
                          //   forField={'bcc'}
                          //   value={bccValue}
                          //   data={bccData}
                          //   defaultValue={value}
                          //   onChangeValue={(v) => {
                          //     onChange(v);
                          //     setBccValue(v);
                          //     update();
                          //     method.setValue(
                          //       'contactBlock',
                          //       Array.from(new Set([...inputContactBlocks, ...v])),
                          //     );
                          //   }}
                          // />
                          <AutoCompleteReceive
                            options={bcc.options}
                            name="bcc"
                            value={value}
                            onChange={(v) => {
                              onChange(v);
                              method.setValue(
                                'contactBlock',
                                Array.from(new Set([...inputContactBlocks, ...v])),
                              );
                            }}
                            onChangeOptions={(option) => {
                              setOptions((options) => {
                                return [...options, option];
                              });
                            }}
                          />
                        )}
                      />
                    </EmailComposeFormGroup>
                    {/* <EmailComposeFormGroup
                      className="py-1"
                      label="From:"
                      isHaveBorderBottom={true}>
                      <Controller
                        name="from"
                        render={({ field: { value } }) => (
                          <AutoCompleteReceive
                            value={[]}
                            data={[]}
                            defaultValue={[]}
                            isReadOnly={true}
                          />
                        )}
                      />
                    </EmailComposeFormGroup> */}
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
                  className="flex flex-col flex-1"
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
                        editorState={value}
                        onEditorStateChange={(data) => onChange(data)}
                        wrapperClassName="wrapper-class flex-1 flex flex-col"
                        editorClassName="editor-class border flex-1"
                        toolbarClassName="toolbar-class w-full"
                        placeholder="Enter content here..."
                        toolbar={toolbarCustom}
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
              <Box className="flex justify-end items-center flex-1">
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
                  type="submit"
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
                  }>
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
