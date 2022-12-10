import TableViewIcon from '@mui/icons-material/TableView';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { SingleOTPInputComponent } from "@components/atoms/Input/PinInput/SingleInput";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AutoCompleteReceive from "@components/molecules/AutoCompleteReceive";
import EmailComposeFormGroup from "@components/molecules/EmailComposeFormGroup";
import WindowComposeActions from "@components/molecules/WindowComposeActions";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Box, Button, Typography } from "@mui/material";
import { toolbarCustom } from "@constants/constants";
import AttachFiles from "@components/atoms/AttachFiles";
import EmailGreeting from "@components/molecules/EmailGreeting";
import LogoWithLabel from "@components/atoms/LogoWithLabel";
import CustomButton from "@components/atoms/CustomButton";
import UseTemplateButton from '@components/atoms/UseTemplateButton';
import { UserInfo } from '@components/organisms/Email/Interface';
import { Controller, FormProvider, UseFormReturn } from 'react-hook-form';
import { useCallback, useRef } from 'react';
import ModalBase from '@components/atoms/ModalBase';
import DateTimePicker from '@components/atoms/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { rem } from '@utils/functions';

export interface EmailComposeFields {
  to: UserInfo[];
  cc: UserInfo[];
  bcc: UserInfo[];
  attachFiles: File[];
  subject: string;
  content: any;
  sendAt?: string | null;
}

interface EmailComposeProps {
  method: UseFormReturn<EmailComposeFields>;
  isFullScreen?: boolean;
  isShowCCForm?: boolean;
  selectedData?: Dayjs | null;
  isShowCalendarModal?: boolean;
  calendarValue: Dayjs | null;
  tabBarColor?: string;
  onMaximizeClick?: () => void;
  onMinimizeClick?: () => void;
  onCCButtonClick?: () => void;
  onChangeCalendarValue: (date: Dayjs | null) => void;
  onCloseCalendarModal: () => void;
  onUnsetTimeClick: () => void;
  onSetTimeClick: () => void;
  onSendTimeClick: () => void;
  onSubmit: (values: EmailComposeFields) => void;
}

const EmailCompose2: React.FC<EmailComposeProps> = ({
  method,
  isFullScreen = false,
  selectedData,
  isShowCCForm = false,
  isShowCalendarModal = false,
  calendarValue,
  tabBarColor,
  onMinimizeClick,
  onMaximizeClick,
  onCCButtonClick,
  onChangeCalendarValue,
  onCloseCalendarModal,
  onSetTimeClick,
  onUnsetTimeClick,
  onSendTimeClick,
  onSubmit,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAttachFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const createCustomFiles = useCallback((files: FileList | null) => {
    if (!files) return [];
    return Object.keys(files).map((key) => {
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
  }, [])

  return (
    <Box className="t-emailCompose w-full h-full">
      <FormProvider {...method}>
        <form className="p-8 flex items-center justify-center w-full h-full" onSubmit={method.handleSubmit(onSubmit)}>
          <Box
            className={`flex flex-col h-full w-full mx-auto shadow-xl bg-white rounded-3xl overflow-hidden z-5 transition-all ${isFullScreen && 'fixed top-0 left-0 bottom-0'
              }`}
          >
            <WindowComposeActions
              className="p-3 pr-3pt-3 pr-3"
              sx={{backgroundColor: tabBarColor || 'white'}}
              onMinimizeClick={onMinimizeClick}
              onMaximizeClick={onMaximizeClick}
            />
            <Box className="bg-white flex-1 flex flex-col overflow-scroll">
              <Box className="px-9 py-10 pt-2 flex-1 flex flex-col">
                <Controller
                  name='to'
                  render={({ field: { value, onChange } }) => {
                    return (
                      <EmailComposeFormGroup label="To :">
                        <AutoCompleteReceive
                          isActiveCcFrom={isShowCCForm}
                          onClickCcFromLabel={onCCButtonClick}
                          defaultValue={value}
                          data={value}
                          onChange={(_, value) => { onChange(value) }}
                        />
                      </EmailComposeFormGroup>

                    )
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
                          <AutoCompleteReceive
                            isShowCcFromLabel={false}
                            data={value}
                            defaultValue={value}
                            onChange={(_, value) => { onChange(value) }}
                          />
                        )}
                      />
                    </EmailComposeFormGroup>
                    <EmailComposeFormGroup
                      className="py-1"
                      label="Bcc:"
                      isHaveBorderBottom={true}
                    >
                      <Controller
                        name="bcc"
                        render={({ field: { value, onChange } }) => (
                          <AutoCompleteReceive
                            isShowCcFromLabel={false}
                            data={value}
                            defaultValue={value}
                            onChange={(_, value) => onChange(value)}
                          />
                        )}
                      />
                    </EmailComposeFormGroup>
                    <EmailComposeFormGroup
                      className="py-1"
                      label="From:"
                      isHaveBorderBottom={true}>
                      <AutoCompleteReceive
                        data={[]}
                        defaultValue={[]}
                        isShowCcFromLabel={false}
                        isReadOnly={true}
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
                  }}
                >
                  <Controller
                    name="content"
                    render={({ field: { value, onChange } }) => (
                      <Editor
                        editorState={value}
                        onEditorStateChange={(data) => onChange(data)}
                        wrapperClassName="wrapper-class flex-1 flex flex-col relative"
                        editorClassName="editor-class border flex-1 mt-[100px]"
                        toolbarClassName="toolbar-class absolute top-0 left-0 w-full"
                        placeholder="Enter content here..."
                        toolbar={toolbarCustom}
                      />
                    )}
                  />
                  <Box>
                    {/* Private Hashtag
                <EmailPrivateHashtagContainer /> */}
                    {/* Files List */}
                    <Box>
                      <Controller
                        name="attachFiles"
                        render={({ field: { value, onChange } }) => {
                          if (value.length !== 0) return (
                            <AttachFiles
                              data={createCustomFiles(value)}
                              dataFiles={[...value]}
                              isUpload={true}
                              isDelete={true}
                              onDeleteAll={() => { onChange([]) }}
                              onDeleteFile={(index: number) => {
                                const newValue = [...value];
                                newValue.splice(index, 1);
                                onChange([...newValue])
                              }}
                            />)
                          return <></>;
                        }}
                      />
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
            <Box className="p-6 bg-[#F1F1F6] flex items-center h-[88px]">
              {/* manipulation */}
              <Box display="flex" alignItems="center">
                <CustomButton
                  className='flex-shrink-1'
                  padding="8px 10px"
                  label="SEND TIMER"
                  bgButtonColor="#554CFF"
                  color="#fff"
                  textSize={15}
                  isBeforeIcon={true}
                  beforeIcon={<TableViewIcon fontSize="small" />}
                  onClick={onSendTimeClick}
                />
                {Boolean(selectedData) && (
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant='body1'
                      sx={{ ml: rem(8) }}
                    >
                      {dayjs(selectedData).format('hh:mm DD/MM/YYYY')}
                    </Typography>
                    <Button
                      variant='text'
                      sx={{
                        color: '#7E7E7E',
                        minWidth: 'auto',
                        ml: rem(4),
                        p: rem(4)
                      }}
                      onClick={onUnsetTimeClick}
                    >
                      <CancelIcon sx={{ fontSize: rem(12) }} />
                    </Button>
                  </Box>
                )}
              </Box>

              {/* ACTIONS */}
              <Box className="flex justify-end items-center flex-1">
                <UseTemplateButton />
                {/* <Tooltip title="Insert link"> */}
                <Button
                  className="bg-transparent p-2 hover:bg-transparent"
                  onClick={handleAttachFileClick}>
                  <Controller
                    name="attachFiles"
                    render={({ field: { value, onChange } }) => (
                      <input
                        type="file"
                        name="attachFile"
                        id="email-compose-file"
                        hidden
                        ref={fileInputRef}
                        onChange={(e) => {
                          if (e.target.files) {
                            const fileList: File[] = Object.keys(e.target.files).map(value => e.target.files ? e.target.files[value] : null);
                            onChange([...value, ...fileList])
                          }
                          else {
                            onChange([]);
                          }
                        }}
                        multiple
                      />
                    )}
                  />
                  <AttachFileIcon className="text-[#7D7E80]" />
                </Button>
                {/* </Tooltip> */}
                <CustomButton
                  padding="8px 10px"
                  label="SEND NOW"
                  type="submit"
                  bgButtonColor="#554CFF"
                  color="#fff"
                  textSize={15}
                  isBeforeIcon={true}
                  beforeIcon={<SendIcon fontSize="small" />}
                />
              </Box>
            </Box>
            <ModalBase
              title="Set Time To Send"
              isOpen={isShowCalendarModal}
              style={{ minHeight: rem(200) }}
              onClose={onCloseCalendarModal}
              submitLabel={''}
              modalType={'submit'}
              onSubmit={() => onSubmit(method.getValues())}
            >
              <DateTimePicker
                value={calendarValue}
                setValueCalendar={onChangeCalendarValue}
              />
              <Box className="" display="flex">
                <Button className="button-create-mui" sx={{ flexBasis: "50%" }} color={"error"} onClick={onUnsetTimeClick}>
                  UNSET
                </Button>
                <Button className="button-create-mui" sx={{ flexBasis: "50%", ml: rem(12) }} onClick={onSetTimeClick}>
                  SET TIME
                </Button>
              </Box>
            </ModalBase>
          </Box>
        </form>
      </FormProvider>
    </Box>
  )
}

export default EmailCompose2;
