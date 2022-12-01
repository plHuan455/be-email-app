import { EmailResponse } from '@api/email';
import { Email, UserInfo } from '@components/organisms/Email/Interface';
import { AttachFile, UserRead } from '@components/organisms/EmailMess';
import { createSlice } from '@reduxjs/toolkit';

const userReadList: UserRead[] = [
  {
    name: 'Elon Musk',
    time: '3 hours ago',
  },
  {
    name: 'Bill Gates MicroHusf',
    time: '8 hours ago',
  },
];

const files: AttachFile[] = [
  {
    name: 'Metanode - White Paper v.1.5.2',
    type: 'pdf',
    url: 'meta.node/9YQC7us',
    userRead: userReadList,
  },
  {
    name: 'Metanode - SDK Bundle',
    type: 'zip',
    url: 'meta.node/34ED7uc',
  },
];

const emailsList: Email[] = [
  {
    id: '1',
    attachFiles: files,
    date: new Date() + '',
    mailContent: '<p>asdasd</p>',
    sender: new UserInfo('', 'User', 'user@bemail.com'),
    sendTo: [
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
    ],
    status: 'pending',
    title: 'Email',
    type: 'receive',
    cc: [
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
    ],
    bcc: [
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
    ],
  },
  {
    id: '2',
    attachFiles: files,
    date: new Date() + '',
    mailContent: '<p>asdasd</p>',
    sender: new UserInfo('', 'User', 'user@bemail.com'),
    sendTo: [
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
    ],
    status: 'pending',
    title: 'Email',
    type: 'send',
    cc: [
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
    ],
    bcc: [
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
    ],
  },
  {
    id: '3',
    attachFiles: files,
    date: new Date() + '',
    mailContent: '<p>asdasd</p>',
    sender: new UserInfo('', 'User', 'user@bemail.com'),
    sendTo: [
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
    ],
    status: 'pending',
    title: 'Email',
    type: 'receive',
    cc: [
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
    ],
    bcc: [
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
    ],
  },
  {
    id: '4',
    attachFiles: files,
    date: new Date() + '',
    mailContent: '<p>asdasd</p>',
    sender: new UserInfo('', 'User', 'user@bemail.com'),
    sendTo: [
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
    ],
    status: 'pending',
    title: 'Email',
    type: 'send',
    cc: [
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
    ],
    bcc: [
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
    ],
  },
  {
    id: '5',
    attachFiles: files,
    date: new Date() + '',
    mailContent: '<p>asdasd</p>',
    sender: new UserInfo('', 'User', 'user@bemail.com'),
    sendTo: [
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
    ],
    status: 'pending',
    title: 'Email',
    type: 'receive',
    cc: [
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
    ],
    bcc: [
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
    ],
  },
  {
    id: '6',
    attachFiles: files,
    date: new Date() + '',
    mailContent: '<p>asdasd</p>',
    sender: new UserInfo('', 'User', 'user@bemail.com'),
    sendTo: [
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
      new UserInfo('', 'ReceiverUser', 'receiver@bemail.com'),
    ],
    status: 'pending',
    title: 'Email',
    type: 'send',
    cc: [
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
      new UserInfo('', 'ccUser', 'cc@bemail.com'),
    ],
    bcc: [
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
      new UserInfo('', 'bccUser', 'bcc@bemail.com'),
    ],
  },
];

export interface EmailState {
  EmailsList: EmailResponse[];
  deletedEmailsList: EmailResponse[];
  spamEmailsList: EmailResponse[];
  unreadEmailsList: EmailResponse[];
  isLoading: boolean;
}

const initialState: EmailState = {
  EmailsList: [],
  deletedEmailsList: [],
  spamEmailsList: [],
  unreadEmailsList: [],
  isLoading: false,
};

const EmailSlice = createSlice({
  name: 'email ',
  initialState,
  reducers: {
    setEmailIsLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
    addUnreadEmail(state, action) {
      const cloneUnreadEmailsList = [...state.unreadEmailsList];

      cloneUnreadEmailsList.push(...action.payload);

      return {
        ...state,
        unreadEmailsList: cloneUnreadEmailsList,
      };
    },
    addSpamEmail(state, action) {
      const cloneSpamEmailsList = [...state.spamEmailsList];

      cloneSpamEmailsList.push(...action.payload);

      return {
        ...state,
        spamEmailsList: cloneSpamEmailsList,
      };
    },
    addDeletedEmail(state, action) {
      const cloneDeletedEmailsList = [...state.deletedEmailsList];

      cloneDeletedEmailsList.push(...action.payload);

      return {
        ...state,
        deletedEmailsList: cloneDeletedEmailsList,
      };
    },
    setDeletedEmails(state, action) {
      return { ...state, deletedEmailsList: action.payload };
    },
    setEmailStatus(state, action) {
      const { index, status } = action.payload;

      state.EmailsList[index].status = status;

      return { ...state, EmailsList: [...state.EmailsList] };
    },
    setEmailsList(state, action) {
      return { ...state, EmailsList: action.payload };
    },
    removeEmailsList(state, action) {
      return action.payload;
    },
  },
});

export const {
  setEmailStatus,
  setEmailsList,
  setDeletedEmails,
  addSpamEmail,
  addUnreadEmail,
  addDeletedEmail,
  setEmailIsLoading,
} = EmailSlice.actions;

export default EmailSlice.reducer;
