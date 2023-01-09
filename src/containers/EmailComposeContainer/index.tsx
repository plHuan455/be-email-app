import { motion, useAnimation, useAnimationControls } from 'framer-motion';
import EmailCompose2, {
  EmailComposeEmailFieldNames,
  EmailComposeFields, EmailComposeSelectedDepartmentTypes,
} from '@components/templates/EmailCompose2';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useContext, useEffect, useId, useMemo, useState } from 'react';
import utc from 'dayjs/plugin/utc';
import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '@redux/configureStore';
import { getEditorStateFormHtmlString, rem } from '@utils/functions';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
dayjs.extend(utc);
import { useNavigate } from 'react-router-dom';
import useAutoStoreEmail from '../../hooks/Email/useAutoStoreEmail';
import { UserInfo, UserReceiveInfo } from '@components/organisms/Email/Interface';
import { InputContactBlock } from '@components/molecules/Autocomplete';
import { EmailComposeContext } from '@containers/MainWrapperContainer';
import { getDepartments } from '@api/deparment';
import { Box, Button } from '@mui/material';
import ModalBase from '@components/atoms/ModalBase';
import EmailTemplateList, {
  EmailTemplateItem,
} from '@components/templates/EmailTemplateList';
import { emailTemplateList } from '@assets/dummyData/emaiTemplate';
import { AutoCompleteGroupValueTypes } from '@components/molecules/AutoCompleteGroup';
import { departmentListDummy } from '@assets/dummyData/departmnetDummy';
dayjs.extend(utc);

type SelectedEmailHashType = {
  [key in EmailComposeEmailFieldNames]: {[key: string]: true};
}

const currentUserEmail = localStorage.getItem('current_email');

interface EmailComposeContainerProps { }

const EmailComposeContainer: React.FC<EmailComposeContainerProps> = () => {
  const alertDialog = useAlertDialog();

  const privateHashtags = useAppSelector((state) => state.email.privateHashtags);

  const workingEmail = useAppSelector((state) => state.email.workingEmail);

  const [isOpenCalendarSelect, setIsOpenCalendarSelect] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<EmailComposeSelectedDepartmentTypes>();
  const [selectedEmployerModalList, setSelectedEmployerModalList] = useState<string[]>([]);
  const [selectedEmailHash, setSelectedEmailHash] = useState<SelectedEmailHashType>({to: {}, cc: {}, bcc: {}});

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const { onFieldsChange } = useAutoStoreEmail(3000);

  const [attachFiles, setAttachFiles] = useState<(File | undefined)[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplateItem>();
  const [isOpenTemplateModal, setIsOpenTemplateModal] = useState<boolean>(false);

  const {
    isEmailSending,
    inputContactBlocks,
    setInputContactBlocks,
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

  // const { mutate: deleteEmailMutate } = useMutation({
  //   mutationKey: ['email-compose-delete-email'],
  //   mutationFn: deleteEmail,
  // });

  // const [inputContactBlocks, setInputContactBlocks] = useState<InputContactBlock[]>(
  //   [],
  // );


  // API
  // const {data: departmentData, isLoading} = useQuery({
  //   queryKey: ['email-compose-get-departments'],
  //   queryFn: async () => {
  //     const res = await getDepartments();
  //     return res.data;
  //   },
  // })
  const departmentData = departmentListDummy;

  const {convertedToOptions, convertedCcOptions, convertedBccOptions} = useMemo(() => {
    const toOptions: AutoCompleteGroupValueTypes[] = [];
    const ccOptions: AutoCompleteGroupValueTypes[] = [];
    const bccOptions: AutoCompleteGroupValueTypes[] = [];

    departmentData.forEach(department => {
      const toEmails: string[] = [];
      const ccEmails: string[] = [];
      const bccEmails: string[] = [];
      department.users?.forEach(user => {
         if(!selectedEmailHash.bcc[user.email] && !selectedEmailHash.cc[user.email]){
          toEmails.push(user.email);
         }
         if(!selectedEmailHash.to[user.email] && !selectedEmailHash.cc[user.email]){
          bccEmails.push(user.email);
         }
         if(!selectedEmailHash.to[user.email] && !selectedEmailHash.bcc[user.email]){
          ccEmails.push(user.email);
         }
      })

      toOptions.push({
        isGroup: true,
        name: department.name,
        id: department.id,
        data: toEmails
      })
      ccOptions.push({
        isGroup: true,
        name: department.name,
        id: department.id,
        data: ccEmails
      })
      bccOptions.push({
        isGroup: true,
        name: department.name,
        id: department.id,
        data: bccEmails
      })
    })

    return {
      convertedToOptions: toOptions,
      convertedCcOptions: ccOptions,
      convertedBccOptions: bccOptions,
    }
  }, [departmentData, selectedEmailHash])

  const convertedSelectEmployersModalRows = useMemo(() => {
    if(selectedDepartment === undefined) return [];
    const field = selectedDepartment.field;
    return selectedDepartment.data.emailInfo
      .filter(value => {
        switch(field){
          case 'to': return !selectedEmailHash.bcc[value.email] && !selectedEmailHash.cc[value.email];
          case 'cc': return !selectedEmailHash.bcc[value.email] && !selectedEmailHash.to[value.email];
          case 'bcc': return !selectedEmailHash.to[value.email] && !selectedEmailHash.cc[value.email];
        }
      })
      .map(value => ({ identify: value.name, email: value.email, id: value.email })) ?? []
  }, [selectedDepartment])

  // useQuery(['getDepartments'], getDepartments, {
  //   onSuccess: (res) => {
  //     const inputContactBlocks: InputContactBlock[] = res.data.map(
  //       (dept, index) => ({
  //         id: index.toString(),
  //         contact_name: dept?.name || '',
  //         isSelected: false,
  //         subMenu: (dept.users || []).map(
  //           (user) =>
  //             new UserReceiveInfo(
  //               user.id,
  //               user.avatar,
  //               `${user.first_name} ${user.last_name}`,
  //               user.email,
  //               false,
  //             ),
  //         ),
  //       }),
  //     );

  //     setInputContactBlocks(inputContactBlocks);
  //     method.setValue('contactBlock', inputContactBlocks);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  // const { mutate: submitEmailComposeMutate, isLoading: isEmailComposeSubmitting } =
  //   useMutation({
  //     mutationKey: ['email-compose-submit'],
  //     mutationFn: sendEmail,
  //     onSuccess: (res) => {
  //       toast.success('Email have been sent');
  //       if (workingEmail.id !== undefined) {
  //         deleteEmailMutate(workingEmail.id);
  //       }
  //       if (res?.data?.user_id)
  //         navigate(`/emails/catalog/pending/${res.data.user_id}`);
  //       queryClient.invalidateQueries({ queryKey: ['get-all-email-status'] });
  //       method.reset();
  //     },
  //   });

  // useEffect(() => {
  //   if (!showMinimizeEmailId) return;
  //   const foundMinimizeEmail = minimizeEmailList.find(
  //     (value) => value.id === showMinimizeEmailId,
  //   );
  //   if (foundMinimizeEmail) {
  //     method.setValue('to', foundMinimizeEmail.to ?? []);
  //     method.setValue('cc', foundMinimizeEmail.cc ?? []);
  //     method.setValue('bcc', foundMinimizeEmail.bcc ?? []);
  //     method.setValue('subject', foundMinimizeEmail.subject ?? '');
  //     method.setValue(
  //       'content',
  //       foundMinimizeEmail.content
  //         ? getEditorStateFormHtmlString(foundMinimizeEmail.content ?? '')
  //         : '',
  //     );
  //     method.setValue('sendAt', foundMinimizeEmail.sendAt ?? '');
  //     method.setValue(
  //       'attachFiles',
  //       foundMinimizeEmail.attachFiles ?? { files: [], fileUrls: [] },
  //     );
  //     method.setValue('hashtags', foundMinimizeEmail?.hashtags ?? []);
  //     setTabBarColor(foundMinimizeEmail?.color);
  //   }
  // }, [showMinimizeEmailId, minimizeEmailList, method]);

  // useEffect(() => {
  //   if (showMinimizeEmailId === undefined) {
  //     method.reset();
  //     setTabBarColor(undefined);
  //   }
  // }, [showMinimizeEmailId, method]);

  // // Convert data
  const convertedHashtagOptions = useMemo(() => {
    return privateHashtags.map((value) => ({
      name: value.title,
      value: value.value,
    }));
  }, [privateHashtags]);

  // // Handle functions
  // const handleMinimizeClick = (id?: string) => {
  //   if(minimizeEmailList.length > 2) {
  //     toast.error('The minimized email limit is two');
  //     return;
  //   }

  //   const values = method.getValues();
  //   const cacheId = Date.now();
  //   method.reset();

  //   const newValue = {
  //     ...values,
  //     id: showMinimizeEmailId === undefined ? cacheId : showMinimizeEmailId,
  //     content: values.content
  //       ? draftToHtml(convertToRaw(values.content.getCurrentContent()))
  //       : '',
  //     color: tabBarColor ? tabBarColor : MinimizeEmailColor.getColor(),
  //     attachFiles: values.attachFiles,
  //     fileUrls: values.attachFiles.fileUrls,
  //     cacheId: showMinimizeEmailId === undefined ? cacheId : showMinimizeEmailId
  //   }
  //   if(showMinimizeEmailId === undefined) {
  //     dispatch(addMinimizeEmail(newValue));
  //   }
  //   else {
  //     dispatch(updateMinimizeEmail({id: showMinimizeEmailId, value: newValue}))
  //   }

  //   onFieldsChange(values, showMinimizeEmailId, showMinimizeEmailId === undefined ? cacheId : undefined );

  //   setIsFullScreen(false);
  //   setTabBarColor(undefined);

  //   dispatch(setShowMinimizeEmail(undefined));
  //   dispatch(setWorkingEmail(undefined))

  // };

  // const handleSubmit = (values: EmailComposeFields) => {

  //   if (
  //     values.to.length === 0 &&
  //     values.cc.length === 0 &&
  //     values.bcc.length === 0
  //   ) {
  //     setAlertData("Can't send email", "Can't send email without receiver", () => {
  //       onAlertDialogClose();
  //     });
  //     return;
  //   }

  //   console.log({
  //     email: {
  //       subject: values.subject,
  //       to: values.to.reduce((curr: string[], next) => {
  //         const mails = next.employeesList.map((employee) => employee.mail);

  //         return [...curr, ...mails];
  //       }, []),
  //       text_html:
  //         values.content === ''
  //           ? ''
  //           : draftToHtml(convertToRaw(values.content.getCurrentContent())),
  //       bcc: values.bcc.map((value) => value.mail),
  //       cc: values.cc.map((value) => value.mail),
  //       attachs: (
  //         values.attachFiles.fileUrls.filter(
  //           (value) => value !== undefined,
  //         ) as string[]
  //       ).map((value) => ({ path: value })),
  //       from: currentUserEmail ? currentUserEmail : '',
  //     },
  //     send_at: selectedDate
  //       ? dayjs.utc(selectedDate).toISOString() ?? dayjs.utc().toISOString()
  //       : dayjs.utc(selectedDate).toISOString(),
  //     tags: values.hashtags.map(value => value.value)
  //   });

  //   submitEmailComposeMutate({
  //     email: {
  //       subject: values.subject,
  //       to: values.to.reduce((curr: string[], next) => {
  //         const mails = next.employeesList.map((employee) => employee.mail);

  //         return [...curr, ...mails];
  //       }, []),
  //       text_html:
  //         values.content === ''
  //           ? ''
  //           : draftToHtml(convertToRaw(values.content.getCurrentContent())),
  //       bcc: values.bcc.map((value) => value.mail),
  //       cc: values.cc.map((value) => value.mail),
  //       attachs: (
  //         values.attachFiles.fileUrls.filter(
  //           (value) => value !== undefined,
  //         ) as string[]
  //       ).map((value) => ({ path: value })),
  //       from: currentUserEmail ? currentUserEmail : '',
  //     },
  //     send_at: selectedDate
  //       ? dayjs.utc(selectedDate).toISOString() ?? dayjs.utc().toISOString()
  //       : dayjs.utc(selectedDate).toISOString(),
  //     tags: values.hashtags.map(value => value.value)
  //   });
  // };

  const handleMinimizeEmailClick = () => {
    onMinimizeEmailClick();
  };

  const handleCloseEmail = () => {
    onCloseEmail();
  };

  const handleApplyTemplate = (template: EmailTemplateItem) => {
    alertDialog.setAlertData(
      'Apply template',
      'If you apply this template, the current content of the email will be changed',
      () => {
        method.setValue(
          'content',
          getEditorStateFormHtmlString(template.htmlString),
        );
        setSelectedTemplate(template);
        alertDialog.onClose();
        setIsOpenTemplateModal(false);
      },
      () => alertDialog.onClose(),
    );
  };

  const handleDepartmentClick = (option: AutoCompleteGroupValueTypes, field: EmailComposeEmailFieldNames) => {
    const foundDepartment = departmentData?.find(value => value.id === option.id)
    if (foundDepartment) {
      const currValue = method.getValues(`${field}2`);
      const foundCurrSelectedEmployers = currValue.find(value => value.id === option.id);
      if(foundCurrSelectedEmployers) {
        setSelectedEmployerModalList(foundCurrSelectedEmployers.data);        
      }
      else {
        setSelectedEmployerModalList(foundDepartment.users?.map(value => value.email) ?? [])
      }
      setSelectedDepartment({
        field,
        data: {
          id: foundDepartment.id,
          name: foundDepartment.name,
          emailInfo: foundDepartment.users?.map(value => ({ name: value.identity, email: value.email, id: value.id })) ?? []
        }
      })
    }
  }

  const handleSelectedEmployersChange = (emails: string[]) => {
    setSelectedEmployerModalList(emails);
  }

  const handleConfirmSelectEmployersModalClick = () => {
    if (selectedDepartment) {
      const {field, data: selectedDepartmentData} = selectedDepartment;

      const currValue = method.getValues(`${field}2`);
      const foundDepartmentValueIndex = currValue.findIndex(value => value.id === selectedDepartment.data.id);

      // { [key: string]: true } // email: true
      const cloneSelectedEmailHash = {...selectedEmailHash};

      selectedDepartment.data.emailInfo.forEach(emailInfo => {
        if(selectedEmployerModalList.includes(emailInfo.email)) {
          cloneSelectedEmailHash[field][emailInfo.email] = true;
        }
        else {
          delete cloneSelectedEmailHash[field][emailInfo.email];
        }
      })
      setSelectedEmailHash(cloneSelectedEmailHash);

      if(foundDepartmentValueIndex === -1){
        if(selectedEmployerModalList.length !== 0){
          method.setValue(
            `${field}2`,
            [
              ...currValue,
              {
                id: selectedDepartment.data.id,
                isGroup: true,
                name: selectedDepartment.data.name,
                data: [...selectedEmployerModalList],
              }
            ]
          )
        }
      } else {
        if(selectedEmployerModalList.length === 0) {
          console.log(foundDepartmentValueIndex);
          // currValue.splice(foundDepartmentValueIndex, 1);
        }
        else {
          currValue[foundDepartmentValueIndex].data = [...selectedEmployerModalList];
        }
        method.setValue(`${field}2`, currValue);
      }
    }
    setSelectedDepartment(undefined);
    setSelectedEmployerModalList([])
  }

  const handleDeleteDepartmentOnInput = (option: AutoCompleteGroupValueTypes, field: EmailComposeEmailFieldNames) => {
    const cloneSelectedEmailHash = {...selectedEmailHash};
    option.data.forEach(email => {
      delete cloneSelectedEmailHash[field][email];
    })

    setSelectedEmailHash(cloneSelectedEmailHash);
  }

  const handleSubmit = (values: EmailComposeFields) => {
    onSendEmail({ ...values, sendAt: selectedDate });
  };

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
        <Box sx={{ width: '80vw', minHeight: rem(100) }}>
          <EmailTemplateList
            selectedTemplateId={selectedTemplate?.id}
            onTemplateClick={handleApplyTemplate}
            isShowTemplateActionWhenHover={false}
            emailTemplateList={emailTemplateList} //TODO: REPLACE THE TEMPLATE LIST WHEN HAVE API
          />
          {/* <Box display="flex" justifyContent="flex-end" sx={{mt: rem(12)}}>
            <Button sx={{minWidth: rem(70)}} onClick={handleApplyTemplate}>Apply template</Button>
          </Box> */}
        </Box>
      </ModalBase>
      <AlertDialog
        isShowDisagreeBtn={alertDialog.isShowAgreeBtn}
        isOpen={alertDialog.isOpen}
        descriptionLabel={alertDialog.description}
        titleLabel={alertDialog.title}
        onClose={alertDialog.onClose}
        onAgree={alertDialog.callback}
        onDisagree={alertDialog.onClose}
      />
    </>
  );
};

export default EmailComposeContainer;
