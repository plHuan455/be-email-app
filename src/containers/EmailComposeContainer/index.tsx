import { motion, useAnimationControls } from 'framer-motion';
import EmailCompose2, {
  EmailComposeEmailFieldNames,
  EmailComposeFields,
  EmailComposeModalRowTypes,
  EmailComposeSelectedDepartmentTypes,
  useEmailComposeContactFields,
} from '@components/templates/EmailCompose2';
import { useQuery,  } from '@tanstack/react-query';
import { useContext, useEffect, useMemo, useState } from 'react';
import utc from 'dayjs/plugin/utc';
import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '@redux/configureStore';
import {
  getEditorStateFormHtmlString,
  rem,
} from '@utils/functions';
dayjs.extend(utc);
import { EmailComposeContext } from '@containers/MainWrapperContainer';
import { getDepartments } from '@api/deparment';
import { Box } from '@mui/material';
import ModalBase from '@components/atoms/ModalBase';
import EmailTemplateList, {
  EmailTemplateItem,
} from '@components/templates/EmailTemplateList';
import { AutoCompleteGroupValueTypes } from '@components/molecules/AutoCompleteGroup';
import { getTemplateListService } from '@api/template';
import { departmentListDummy } from '@assets/dummyData/departmnetDummy';
dayjs.extend(utc);

interface EmailComposeContainerProps {}

const EmailComposeContainer: React.FC<EmailComposeContainerProps> = () => {
  const privateHashtags = useAppSelector((state) => state.email.privateHashtags);
  const currSignature = useAppSelector((state) => state.user.signature);

  const [isOpenCalendarSelect, setIsOpenCalendarSelect] = useState(false);

  const [attachFiles, setAttachFiles] = useState<(File | undefined)[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplateItem>();
  const [isOpenTemplateModal, setIsOpenTemplateModal] = useState<boolean>(false);

  const {
    isEmailSending,
    inputContactBlocks,
    selectedEmailHash,
    onChangeSelectedEmailHash,
    method,
    tabColor,
    triggerClearData,
    onMinimizeEmailClick,
    onSendEmail,
    onCloseEmail,
  } = useContext(EmailComposeContext);

  if (!method) return null;

  const [calendarValue, setCalendarValue] = useState<Dayjs | null>(
    dayjs(Date.now()),
  );
  const [selectedDate, setSelectedDate] = useState<Dayjs | null | undefined>();

  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isShowCCForm, setIsShowCCForm] = useState<boolean>(false);

  const [isShowCalendarModal, setIsShowCalendarModal] = useState<boolean>(false);

  // API
  const { data: departmentData, isLoading } = useQuery({
    queryKey: ['email-compose-get-departments'],
    queryFn: async () => {
      const res = await getDepartments();
      return res.data;
    },
  });

  const { data: templateData, isLoading: isTemplateDataGetting } = useQuery({
    queryKey: ['email-template-get'],
    queryFn: getTemplateListService,
  })

  // const departmentData = departmentListDummy;

  const contactFieldsHandle = useEmailComposeContactFields({method, departmentList: departmentData ?? [], selectedEmailHash, onChangeSelectedEmailHash});

  const convertedEmailTemplateList = useMemo<EmailTemplateItem[] | undefined>(() => {
    return templateData?.data.map(template => ({
      id: template.id,
      description: template.describe,
      htmlString: template.text_html,
      name: template.title,
      imgSrc: template.images?.[0]?.path ?? ''
    }))
  }, [templateData]) 

  const convertedHashtagOptions = useMemo(() => {
    return privateHashtags.map((value) => ({
      name: value.title,
      value: value.value,
    }));
  }, [privateHashtags]);

  const handleMinimizeEmailClick = () => {
    onMinimizeEmailClick();
  };

  const handleCloseEmail = () => {
    onCloseEmail();
  };

  const handleApplyTemplate = (template: EmailTemplateItem) => {
    method.setValue('content', getEditorStateFormHtmlString(template.htmlString));
    setSelectedTemplate(template);
    setIsOpenTemplateModal(false);
  };

  const handleSubmit = (values: EmailComposeFields) => {
    onSendEmail({ ...values, sendAt: selectedDate });
  };

  // Ring Animation
  const ringAnimationControl = useAnimationControls();
  useEffect(() => {
    if (triggerClearData) {
      ringAnimationControl.start({
        translateX: ['5px', '-5px', '5px', '-5px', '0px'],
      });
    }
  }, [triggerClearData]);

  return (
    <>
      <motion.div animate={ringAnimationControl} transition={{ duration: 0.2 }}>
        <EmailCompose2
          {...contactFieldsHandle}
          isSubmitting={isEmailSending}
          inputContactBlocks={inputContactBlocks}
          method={method}
          attachFiles={attachFiles}
          isFullScreen={isFullScreen}
          isShowCCForm={isShowCCForm}
          signature={currSignature ? {id: currSignature.id, name: currSignature.name, htmlString: currSignature.text_html} : undefined}
          isShowCalendarModal={isShowCalendarModal}
          isOpenCalendarSelect={isOpenCalendarSelect}
          hashtagOptions={convertedHashtagOptions}
          selectedDate={selectedDate}
          tabBarColor={tabColor}
          calendarValue={calendarValue}
          onMaximizeClick={() => setIsFullScreen((preState) => !preState)}
          onMinimizeClick={handleMinimizeEmailClick}
          onCCButtonClick={() => setIsShowCCForm((preState) => !preState)}
          onCloseCalendarModal={() => setIsShowCalendarModal(false)}
          onChangeCalendarValue={(value) => setCalendarValue(value)}
          onCloseEmail={handleCloseEmail}
          onSubmit={handleSubmit}
          onSendTimeClick={() => {
            setIsOpenCalendarSelect(true);
            setIsShowCalendarModal(true);
            setCalendarValue(dayjs(Date.now()));
          }}
          onUnsetTimeClick={() => {
            setSelectedDate(undefined);
            setIsShowCalendarModal(false);
          }}
          onSetTimeClick={() => {
            setSelectedDate(calendarValue?.clone());
            setIsShowCalendarModal(false);
          }}
          onSetTimeCancel={() => {
            setIsOpenCalendarSelect(false);
          }}
          onUseTemplateClick={() => {
            setIsOpenTemplateModal(true);
          }}
        />
      </motion.div>
      <ModalBase
        isOpen={isOpenTemplateModal}
        title="Select template"
        submitLabel=""
        onClose={() => {
          setIsOpenTemplateModal(false);
          setSelectedTemplate(undefined);
        }}>
        <Box sx={{ width: '80vw', height: '75vh' }}>
          <EmailTemplateList
            selectedTemplateId={selectedTemplate?.id}
            onTemplateClick={handleApplyTemplate}
            isShowTemplateActionWhenHover={false}
            emailTemplateList={convertedEmailTemplateList ?? []}
          />
        </Box>
      </ModalBase>
    </>
  );
};

export default EmailComposeContainer;
