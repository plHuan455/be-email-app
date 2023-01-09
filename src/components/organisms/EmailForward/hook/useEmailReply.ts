import { CreateEmailParam, sendEmail } from '@api/email';
import { AutoCompleteGroupValueTypes } from '@components/molecules/AutoCompleteGroup';
import { CustomFile } from '@components/templates/EmailCompose2';
import { useMutation } from '@tanstack/react-query';
import { getHtmlStringFromEditorState } from '@utils/functions';
import dayjs, { Dayjs } from 'dayjs';
import { EditorState } from 'draft-js';
import { useState } from 'react';
import * as yup from 'yup';

export interface EmailReplyInitialValue {
  to: AutoCompleteGroupValueTypes[];
  cc: AutoCompleteGroupValueTypes[];
  bcc: AutoCompleteGroupValueTypes[];
  attachFiles: {
    fileUrls: (string | undefined)[];
    files: (CustomFile | undefined)[];
  };
  subject: string;
  content: any;
  hashtags: { name: string; value: string }[];
  from: string | null;
}

const currentUserEmail = localStorage.getItem('current_email') ?? '';

const initialValue: EmailReplyInitialValue = {
  to: [],
  cc: [],
  bcc: [],
  subject: '',
  content: EditorState.createEmpty(),
  attachFiles: { fileUrls: [], files: [] },
  hashtags: [],
  from: currentUserEmail ?? '',
};

const useEmailReply = () => {
  const [emailReply, setEmailReply] = useState(initialValue);

  const convertContactField = (fieldData: AutoCompleteGroupValueTypes[]) => {
    return fieldData.reduce<string[]>((preValue, value) => {
      if (!value.isGroup) return [...preValue, value.name];
      return [...preValue, ...value.data.map((email) => email)];
    }, []);
  };

  return {
    emailReply,
    setEmailReply,
    convertContactField,
  };
};

const useCreateEmailReply = () => {
  const hook = useEmailReply();
  const { emailReply, setEmailReply, convertContactField } = hook;

  const { mutate: createEmailReply } = useMutation({
    mutationKey: ['create-email-reply'],
    mutationFn: sendEmail,
  });

  const createApiData = (
    values: EmailReplyInitialValue & { sendAt?: Dayjs | null | undefined },
    isDraft?: Boolean,
  ): CreateEmailParam => {
    // const { contactBlock } = values;
    // const { to, cc, bcc } = convertContactField(contactBlock);
    return {
      email: {
        to: convertContactField(values.to),
        bcc: convertContactField(values.bcc),
        cc: convertContactField(values.cc),
        from: currentUserEmail ?? '',
        text_html: getHtmlStringFromEditorState(values.content),
        subject: values.subject,
        attachs: values.attachFiles.fileUrls.map((value) => ({ path: value })),
      },
      hashtags: values.hashtags.map((value) => value.value),
      send_at: values.sendAt?.toISOString() ?? dayjs().toISOString(),
    };
  };

  const handleCreateEmailReply = () => {
    createEmailReply(createApiData(emailReply));
  };

  return { ...hook, handleCreateEmailReply };
};

export { useCreateEmailReply };
