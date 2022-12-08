import { EmailResponse } from '@api/email';
import { EmailList, StatusOptions } from '@components/molecules/ModalEmailList';
import { Email, UserInfo } from '@components/organisms/Email/Interface';
import { AttachFile, UserRead } from '@components/organisms/EmailMess';
import { emailData } from '@layouts/EmailStatusBar';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const LOCAL_STORAGE_MINIMIZE_EMAILS = 'minimize_emails';

export interface HashtagTabs {
  title: string;
  value: string;
  status: StatusOptions;
}

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
  showMinimizeEmail?: Partial<Email>;
  minimizeMailList: Partial<Email>[];
  EmailsList: EmailResponse[];
  privateHashtag: HashtagTabs[];
  deletedEmailsList: EmailResponse[];
  spamEmailsList: EmailResponse[];
  unreadEmailsList: EmailResponse[];
  isLoading: boolean;
}

const initialState: EmailState = {
  minimizeMailList: JSON.parse(localStorage.getItem(LOCAL_STORAGE_MINIMIZE_EMAILS) ?? '[]').map(value => ({
    ...value, sendTo: value?.sendTo?.map(value => new UserInfo(value.avatar, value.name, value.mail))
  })),
  EmailsList: [],
  privateHashtag: [
    {
      title: '#metanode',
      value: 'metanode',
      status: 'hashtag',
    },
    {
      title: '#sales',
      value: 'sales',
      status: 'hashtag',
    },
    {
      title: '#tesla',
      value: 'tesla',
      status: 'hashtag',
    },
    {
      title: '#yellow paper',
      value: 'yellowpaper',
      status: 'hashtag',
    },
  ],
  deletedEmailsList: [],
  spamEmailsList: [],
  unreadEmailsList: [],
  isLoading: false,
};

const EmailSlice = createSlice({
  name: 'email ',
  initialState,
  reducers: {
    setPrivateHashtag(state, action) {
      return { ...state, privateHashtag: action.payload };
    },
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
    setMinimizeList(state, action: PayloadAction<Partial<Email>>) {
      const foundMinimizeEmailIndex = state.minimizeMailList.findIndex(value => value.id === action.payload.id);
      // if (state.minimizeMailList.length >= 2 && foundMinimizeEmailIndex === -1) {
      //   toast.error('Maximum minimized emails is 2');
      //   return state;
      // }
      if(action.payload.id === state.showMinimizeEmail?.id) {
        state.showMinimizeEmail = undefined;
      }
      if (foundMinimizeEmailIndex === -1) {
        state.minimizeMailList.push({ ...action.payload, id: action.payload.id ?? String(Date.now()) });
      } 
      else {
        state.minimizeMailList[foundMinimizeEmailIndex] = action.payload;
      }
      localStorage.setItem(LOCAL_STORAGE_MINIMIZE_EMAILS, JSON.stringify(state.minimizeMailList));
      return state;
    },
    setShowMinimizeEmail(state, action: PayloadAction<Partial<Email> | undefined>) {
      const currShowMinimizeEmail = state.showMinimizeEmail;
      state.showMinimizeEmail = action.payload;
      state.minimizeMailList = state.minimizeMailList.filter(value => value.id !== action.payload?.id);
      if(currShowMinimizeEmail && action.payload?.id !== currShowMinimizeEmail.id)
        state.minimizeMailList.push(currShowMinimizeEmail);
      localStorage.setItem(LOCAL_STORAGE_MINIMIZE_EMAILS, JSON.stringify(state.minimizeMailList));
      return state;
    },
    removeMinimizeEmail(state, action: PayloadAction<string | undefined>) {
      if(action.payload){
        state.minimizeMailList = state.minimizeMailList.filter(value => value.id !== action.payload);
        localStorage.setItem(LOCAL_STORAGE_MINIMIZE_EMAILS, JSON.stringify(state.minimizeMailList));
      }

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
  setMinimizeList,
  setShowMinimizeEmail,
  removeMinimizeEmail,
} = EmailSlice.actions;

export default EmailSlice.reducer;
