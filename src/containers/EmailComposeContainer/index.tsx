import { motion, useAnimationControls } from 'framer-motion';
import EmailCompose2, {
  EmailComposeEmailFieldNames,
  EmailComposeFields,
  EmailComposeModalRowTypes,
  EmailComposeSelectedDepartmentTypes,
} from '@components/templates/EmailCompose2';
import { useQuery,  } from '@tanstack/react-query';
import { useContext, useEffect, useMemo, useState } from 'react';
import utc from 'dayjs/plugin/utc';
import dayjs, { Dayjs } from 'dayjs';
import { useAppSelector } from '@redux/configureStore';
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
dayjs.extend(utc);

const currentUserEmail = localStorage.getItem('current_email');

interface EmailComposeContainerProps {}

const EmailComposeContainer: React.FC<EmailComposeContainerProps> = () => {
  const privateHashtags = useAppSelector((state) => state.email.privateHashtags);

  const [isOpenCalendarSelect, setIsOpenCalendarSelect] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<EmailComposeSelectedDepartmentTypes>();
  const [selectedEmployerModalList, setSelectedEmployerModalList] = useState<
    string[]
  >([]);

  const [attachFiles, setAttachFiles] = useState<(File | undefined)[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplateItem>();
  const [isOpenTemplateModal, setIsOpenTemplateModal] = useState<boolean>(false);

  const {
    isEmailSending,
    inputContactBlocks,
    setInputContactBlocks,
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

  // // Convert data
  const {
    convertedToOptions = [],
    convertedCcOptions = [],
    convertedBccOptions = [],
  } = useMemo(() => {
    if (!departmentData) return {};
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
      convertedToOptions: toOptions,
      convertedCcOptions: ccOptions,
      convertedBccOptions: bccOptions,
    };
  }, [departmentData, selectedEmailHash]);

  const convertedEmailTemplateList = useMemo<EmailTemplateItem[] | undefined>(() => {
    return templateData?.data.map(template => ({
      id: template.id,
      description: template.describe,
      htmlString: template.text_html,
      name: template.title,
      imgSrc: template.images?.[0]?.path ?? ''
    }))
  }, [templateData]) 

  const convertedSelectEmployersModalRows = useMemo<EmailComposeModalRowTypes[]>(() => {
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

  const handleDepartmentClick = (
    option: AutoCompleteGroupValueTypes,
    field: EmailComposeEmailFieldNames,
  ) => {
    const foundDepartment = departmentData?.find((value) => value.id === option.id);
    if (foundDepartment) {
      const currValue = method.getValues(`${field}2`);
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

  const handleSelectedEmployersChange = (emails: string[]) => {
    setSelectedEmployerModalList(emails);
  };

  const handleConfirmSelectEmployersModalClick = () => {
    if (selectedDepartment) {
      const { field, data: selectedDepartmentData } = selectedDepartment;

      const currValue = method.getValues(`${field}2`);
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

      if (foundDepartmentValueIndex === -1) {
        if (selectedEmployerModalList.length !== 0) {
          method.setValue(`${field}2`, [
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
        method.setValue(`${field}2`, currValue);
      }
    }
    setSelectedDepartment(undefined);
    setSelectedEmployerModalList([]);
  };

  const handleDeleteDepartmentOnInput = (
    option: AutoCompleteGroupValueTypes,
    field: EmailComposeEmailFieldNames,
  ) => {
    const cloneSelectedEmailHash = { ...selectedEmailHash };
    option.data.forEach((email) => {
      delete cloneSelectedEmailHash[field][email];
    });

    onChangeSelectedEmailHash(cloneSelectedEmailHash);
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
          selectedDepartment={selectedDepartment}
          selectedEmployerEmailList={selectedEmployerModalList}
          isSubmitting={isEmailSending}
          inputContactBlocks={inputContactBlocks}
          isOpenSelectEmployersModal={Boolean(selectedDepartment)}
          method={method}
          attachFiles={attachFiles}
          isFullScreen={isFullScreen}
          isShowCCForm={isShowCCForm}
          selectEmployersModalRows={convertedSelectEmployersModalRows}
          toOptions={convertedToOptions}
          ccOptions={convertedCcOptions}
          bccOptions={convertedBccOptions}
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
          onCloseSelectEmployersModal={() => setSelectedDepartment(undefined)}
          onDepartmentClick={handleDepartmentClick}
          onSelectEmployersChange={handleSelectedEmployersChange}
          onConfirmSelectEmployersModalClick={handleConfirmSelectEmployersModalClick}
          onSelectedDepartmentClick={handleDepartmentClick}
          onDeleteDepartmentOnInput={handleDeleteDepartmentOnInput}
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
