import { CreateEmailParam, sendEmail } from '@api/email';
import { AutoCompleteGroupValueTypes } from '@components/molecules/AutoCompleteGroup';
import {
  CustomFile,
  EmailComposeEmailFieldNames,
} from '@components/templates/EmailCompose2';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getHtmlStringFromEditorState } from '@utils/functions';
import dayjs, { Dayjs } from 'dayjs';
import { EditorState } from 'draft-js';
import { useState } from 'react';
import * as yup from 'yup';

type SelectedEmailHashType = {
  [key in EmailComposeEmailFieldNames]: { [key: string]: true };
};
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
  const queryClient = useQueryClient();
  const [emailReply, setEmailReply] = useState(initialValue);
  const [selectedEmailHash, setSelectedEmailHash] = useState<SelectedEmailHashType>({
    to: {},
    cc: {},
    bcc: {},
  });

  const convertContactField = (fieldData: AutoCompleteGroupValueTypes[]) => {
    return fieldData.reduce<string[]>((preValue, value) => {
      if (!value.isGroup) return [...preValue, value.name];
      return [...preValue, ...value.data.map((email) => email)];
    }, []);
  };

  return {
    emailReply,
    selectedEmailHash,
    setSelectedEmailHash,
    setEmailReply,
    convertContactField,
    queryClient,
  };
};

const useCreateEmailReply = () => {
  const hook = useEmailReply();
  const { emailReply, setEmailReply, convertContactField, queryClient } = hook;

  const { mutate: createEmailReply } = useMutation({
    mutationKey: ['create-email-reply'],
    mutationFn: sendEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-emails-list'] });
    },
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
        html_body: getHtmlStringFromEditorState(values.content),
        subject: values.subject,
        attachments: values.attachFiles.fileUrls.filter(value => value).map((value) => ({ filename: value ?? '' })),
      },
      hashtags: values.hashtags.map((value) => value.value),
      send_at: values.sendAt?.toISOString() ?? dayjs().toISOString(),
    };
  };

  const handleCreateEmailReply = (
    values: EmailReplyInitialValue,
    cbFnc: () => void,
  ) => {
    createEmailReply(createApiData(values));
    cbFnc();
  };

  return { ...hook, handleCreateEmailReply };
};

export { useCreateEmailReply };
