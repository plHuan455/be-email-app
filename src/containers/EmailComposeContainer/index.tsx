import { sendEmail, deleteEmail, getHashtags } from '@api/email';
import { motion, useAnimation, useAnimationControls } from 'framer-motion';
import EmailCompose2, {
  EmailComposeFields,
} from '@components/templates/EmailCompose2';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useContext, useEffect, useId, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import utc from 'dayjs/plugin/utc';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '@redux/configureStore';
import { getEditorStateFormHtmlString } from '@utils/functions';
import AlertDialog, { useAlertDialog } from '@components/molecules/AlertDialog';
dayjs.extend(utc);
import { MinimizeEmailColor } from '@components/organisms/MinimizeEmail/interface';
import { useNavigate } from 'react-router-dom';
import useAutoStoreEmail from '../../hooks/Email/useAutoStoreEmail';
import { UserInfo, UserReceiveInfo } from '@components/organisms/Email/Interface';
import { InputContactBlock } from '@components/molecules/AutoCompleteReceive';
import { EmailComposeContext } from '@containers/MainWrapperContainer';
import { getDepartments } from '@api/deparment';
import { Button } from '@mui/material';
dayjs.extend(utc);

const hashtagList = [
  {
    id: 2,
    name: 'hihi',
    created_at: '2022-12-15T11:25:04.515Z',
  },
  {
    id: 3,
    name: 'metanode',
    created_at: '2022-12-15T15:25:12.572Z',
  },
  {
    id: 4,
    name: 'hello',
    created_at: '2022-12-15T15:48:54.342Z',
  },
  {
    id: 5,
    name: 'sale',
    created_at: '2022-12-15T16:42:28.644Z',
  },
];

const currentUserEmail = localStorage.getItem('current_email');

interface EmailComposeContainerProps {}

const EmailComposeContainer: React.FC<EmailComposeContainerProps> = () => {
  const {
    isOpen: isAlertDialogOpen,
    isLoading: isAlertDialogLoading,
    title: alertDialogTitle,
    description: alertDialogDescription,
    setAlertData,
    setIsLoading: setAlertDialog,
    callback: alertDialogCallback,
    onClose: onAlertDialogClose,
  } = useAlertDialog();

  const privateHashtags = useAppSelector((state) => state.email.privateHashtags);

  const workingEmail = useAppSelector((state) => state.email.workingEmail);

  const [isOpenCalendarSelect, setIsOpenCalendarSelect] = useState(false);

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { onFieldsChange } = useAutoStoreEmail(3000);

  const [attachFiles, setAttachFiles] = useState<(File | undefined)[]>([]);

  const {
    inputContactBlocks,
    setInputContactBlocks,
    method,
    tabColor,
    triggerClearData,
    onMinimizeEmailClick,
    onSendEmail,
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

  const { mutate: deleteEmailMutate } = useMutation({
    mutationKey: ['email-compose-delete-email'],
    mutationFn: deleteEmail,
  });

  useQuery(['getDepartments'], getDepartments, {
    onSuccess: (res) => {
      const inputContactBlocks: InputContactBlock[] = res.data.map(
        (dept, index) => ({
          id: index.toString(),
          contact_name: dept?.name || '',
          employeesList: (dept.users || []).map(
            (user) =>
              new UserReceiveInfo(
                user.avatar,
                `${user.first_name} ${user.last_name}`,
                user.email,
                false,
              ),
          ),
        }),
      );

      setInputContactBlocks(inputContactBlocks);
      method.setValue('contactBlock', inputContactBlocks);
    },
    onError: (error) => {
      console.log(error);
    },
  });

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
          inputContactBlocks={inputContactBlocks}
          method={method}
          attachFiles={attachFiles}
          isFullScreen={isFullScreen}
          isShowCCForm={isShowCCForm}
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
        />
      </motion.div>
      <AlertDialog
        isShowDisagreeBtn={false}
        isOpen={isAlertDialogOpen}
        descriptionLabel={alertDialogDescription}
        titleLabel={alertDialogTitle}
        onClose={onAlertDialogClose}
        onAgree={alertDialogCallback}
      />
    </>
  );
};

export default EmailComposeContainer;
