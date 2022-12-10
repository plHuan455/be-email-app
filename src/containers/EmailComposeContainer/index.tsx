import { sendEmail } from "@api/email";
import EmailCompose2, { EmailComposeFields } from "@components/templates/EmailCompose2";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import draftToHtml from 'draftjs-to-html';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "@redux/configureStore";
import { addMinimizeAndSetShowMinimizeEmail, addMinimizeEmail, setShowMinimizeEmail } from "@redux/Email/reducer";
import { getEditorStateFormHtmlString } from "@utils/functions";
import { UserInfo } from "@components/organisms/Email/Interface";
import useDebounce from "@hooks/useDebouce";

const currentUserEmail = localStorage.getItem('current_email');

interface EmailComposeContainerProps {
  
}

const EmailComposeContainer: React.FC<EmailComposeContainerProps> = () => {
  const dispatch = useAppDispatch();
  const minimizeEmailList = useAppSelector(state => state.email.minimizeMailList);
  const showMinimizeEmailId = useAppSelector(state => state.email.showMinimizeEmailId);

  const method = useForm<EmailComposeFields>({
    defaultValues: {
      to: [],
      cc: [],
      bcc: [],
      subject: '',
      content: '',
      attachFiles: [],
      sendAt: null,
    }
  });

  const [calendarValue, setCalendarValue] = useState<Dayjs | null>(
    dayjs(Date.now()),
  );
  const [isShowDate, setIsShowDate] = useState<boolean>(false);

  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isShowCCForm, setIsShowCCForm] = useState<boolean>(false);

  const [isShowCalendarModal, setIsShowCalendarModal] = useState<boolean>(false);

  const [currEmailData, setCurrEmailData] = useState<EmailComposeFields>({
    to: [],
    cc: [],
    bcc: [],
    subject: '',
    content: '',
    attachFiles: [],
    sendAt: null,
  });

  const {mutate: submitEmailComposeMutate, isLoading: isEmailComposeSubmitting} = useMutation({
    mutationKey: ['email-compose-submit'],
    mutationFn: sendEmail,
    onSuccess: () => {
      toast.success('Email have been send');
    }
  })

  method.watch((value, { name, type }) => console.log({value, name, type}));

  useEffect(()=>{
    if(!showMinimizeEmailId) return;
    const foundMinimizeEmail = minimizeEmailList.find(value => value.id === showMinimizeEmailId);
    if(foundMinimizeEmail) {
      if(foundMinimizeEmail.to) method.setValue('to', foundMinimizeEmail.to);
      if(foundMinimizeEmail.cc) method.setValue('cc', foundMinimizeEmail.cc);
      if(foundMinimizeEmail.bcc) method.setValue('bcc', foundMinimizeEmail.bcc);
      if(foundMinimizeEmail.subject) method.setValue('subject', foundMinimizeEmail.subject);
      if(foundMinimizeEmail.content) method.setValue('content', getEditorStateFormHtmlString(foundMinimizeEmail.content));
      if(foundMinimizeEmail.attachFiles) method.setValue('attachFiles', foundMinimizeEmail.attachFiles);
      if(foundMinimizeEmail.sendAt) method.setValue('sendAt', foundMinimizeEmail.sendAt);
    }
  }, [showMinimizeEmailId, minimizeEmailList, method])

  useEffect(() => {
    if(showMinimizeEmailId === undefined) {
      method.reset()
    }
  }, [showMinimizeEmailId, method])

  const handleMinimizeClick = (id?: string) => {
    const values = method.getValues();
    method.reset();
    dispatch(addMinimizeEmail({
      ...values,
      id: id ?? showMinimizeEmailId,
      content: values.content ? draftToHtml(convertToRaw(values.content.getCurrentContent())) : ''
    }))
    setIsFullScreen(false);
  }

  const handleSubmit = (values: EmailComposeFields) => {
    console.log(values);
    submitEmailComposeMutate({
      email: {
        subject: values.subject,
        to: values.to.map(value => value.mail),
        html_string: values.content === '' ? '' : draftToHtml(convertToRaw(values.content.getCurrentContent())),
        content: 'TODO REPLACE CONTENT',
        bcc: values.bcc.map(value => value.mail),
        cc: values.cc.map(value => value.mail),
        file: [],
        from: currentUserEmail ? currentUserEmail : '',
      },
      send_at: isShowDate ? calendarValue?.toISOString() ?? null : null,
    })
  }

  return (
    <EmailCompose2
      method={method}
      isFullScreen={isFullScreen}
      isShowCCForm={isShowCCForm}
      isShowCalendarModal={isShowCalendarModal}
      isShowSendTimeDate={isShowDate}
      calendarValue={calendarValue}
      onMaximizeClick={() => setIsFullScreen(preState => !preState)}
      onMinimizeClick={handleMinimizeClick}
      onCCButtonClick={() => setIsShowCCForm(preState => !preState)}
      onCloseCalendarModal={() => setIsShowCalendarModal(false)}
      onChangeCalendarValue={(value) => setCalendarValue(value)}
      onSubmit={handleSubmit}
      onSendTimeClick={() => setIsShowCalendarModal(true)}
      onUnsetTimeClick={() => setIsShowDate(false)}
      onSetTimeClick={() => setIsShowDate(true)}
    />
  )
}

export default EmailComposeContainer;