import { EmailResponse } from '@api/email';
import { EmailList, StatusOptions } from '@components/molecules/ModalEmailList';
import { Email, UserInfo } from '@components/organisms/Email/Interface';
import { AttachFile, UserRead } from '@components/organisms/EmailMess';
import MinimizeEmail from '@components/organisms/MinimizeEmail';
import { MinimizeEmailColor } from '@components/organisms/MinimizeEmail/interface';
import { MinimizeEmailTypes } from '@components/templates/MinimizeEmailList';
import { emailData } from '@layouts/EmailStatusBar';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { clone } from 'lodash';
import { act } from 'react-dom/test-utils';
import { toast } from 'react-toastify';

export const LOCAL_STORAGE_MINIMIZE_EMAILS = 'minimize_emails';
export const LOCAL_STORAGE_PRIVATE_HASHTAG = 'private_hashtag';

export interface HashtagTabs {
  title: string;
  value: string;
  status: StatusOptions;
  notiNumber: number;
  color: string;
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
  showMinimizeEmailId?: string;
  minimizeEmailList: MinimizeEmailTypes[];
  workingEmail: MinimizeEmailTypes;
  EmailsList: EmailResponse[];
  currEmail?: EmailResponse;
  privateHashtags: HashtagTabs[];
  deletedEmailsList: EmailResponse[];
  spamEmailsList: EmailResponse[];
  unreadEmailsList: EmailResponse[];
  isLoading: boolean;
}

const initialState: EmailState = {
  workingEmail: {},
  minimizeEmailList: JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_MINIMIZE_EMAILS) ?? '[]',
  ).map((value) => ({
    ...value,
    to: value.to.map((to) => ({
      contact_name: to.contact_name,
      employeesList: to.employeesList.map(
        (value) => new UserInfo(value.avatar, value.name, value.mail),
      ),
    })),
    cc: value?.cc?.map(
      (value) => new UserInfo(value.avatar, value.name, value.mail),
    ),
    bcc: value?.bcc?.map(
      (value) => new UserInfo(value.avatar, value.name, value.mail),
    ),
    color: MinimizeEmailColor.getColor(),
  })),
  EmailsList: [],
  privateHashtags: JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_PRIVATE_HASHTAG) ?? '[]',
  ),
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
    deleteIndexEmail(state, action) {
      const cloneEmailsList = [...state.EmailsList];

      cloneEmailsList.splice(action.payload, 1);

      return { ...state, EmailsList: cloneEmailsList };
    },
    setEmailStatus(state, action) {
      const { index, status } = action.payload;

      state.EmailsList[index].status = status;

      return { ...state, EmailsList: [...state.EmailsList] };
    },
    clearEmailsList(state) {
      return { ...state, EmailsList: [] };
    },
    setEmailsList(state, action) {
      return { ...state, EmailsList: action.payload };
    },
    setCurrEmail(state, action: PayloadAction<EmailResponse | undefined>) {
      state.currEmail = action.payload;
      return state;
    },
    removeEmailsList(state, action) {
      return action.payload;
    },
    setHashtags(state, action: PayloadAction<HashtagTabs[]>) {
      state.privateHashtags = action.payload;
      return state;
    },
    // MINIMIZE EMAIL ACTIONS
    addMinimizeEmail(state, action: PayloadAction<MinimizeEmailTypes>) {
      const foundMinimizeEmailIndex = state.minimizeEmailList.findIndex(
        (value) =>
          (value.id === action.payload.id && value.id !== undefined) ||
          (value.cacheId === action.payload.cacheId && value.cacheId !== undefined),
      );
      if (foundMinimizeEmailIndex === -1) {
        // Add
        state.minimizeEmailList.push({
          ...action.payload,
          color: MinimizeEmailColor.getColor(),
        });
      } else {
        // Update
        state.minimizeEmailList[foundMinimizeEmailIndex] = {
          ...action.payload,
          color: state.minimizeEmailList[foundMinimizeEmailIndex].color,
        };
      }
      localStorage.setItem(
        LOCAL_STORAGE_MINIMIZE_EMAILS,
        JSON.stringify(state.minimizeEmailList),
      );
      return state;
    },
    updateMinimizeEmail(
      state,
      action: PayloadAction<{
        id?: number;
        cacheId?: number;
        value: MinimizeEmailTypes;
      }>,
    ) {
      const foundMinimizeEmailIndex = state.minimizeEmailList.findIndex(
        (value) =>
          (value.id === action.payload.id && value.id !== undefined) ||
          (value.cacheId === action.payload.cacheId && value.cacheId !== undefined),
      );
      if (foundMinimizeEmailIndex === -1) return state;
      state.minimizeEmailList[foundMinimizeEmailIndex] = {
        ...state.minimizeEmailList[foundMinimizeEmailIndex],
        ...action.payload.value,
        id: action.payload.id,
        cacheId: action.payload.cacheId,
      };
      localStorage.setItem(
        LOCAL_STORAGE_MINIMIZE_EMAILS,
        JSON.stringify(state.minimizeEmailList),
      );
      return state;
    },
    updateMinimizeEmailId(
      state,
      action: PayloadAction<{ id: number; cacheId: number }>,
    ) {
      const foundMinimizeEmailIndex = state.minimizeEmailList.findIndex(
        (value) => value.cacheId === action.payload.cacheId,
      );
      if (foundMinimizeEmailIndex === -1) return state;
      state.minimizeEmailList[foundMinimizeEmailIndex] = {
        ...state.minimizeEmailList[foundMinimizeEmailIndex],
        id: action.payload.id,
        cacheId: undefined,
      };
      return state;
    },
    deleteMinimizeEmail(
      state,
      action: PayloadAction<{ cacheId?: number; id?: number }>,
    ) {
      const foundMinimizeEmailIndex = state.minimizeEmailList.findIndex(
        (value) =>
          (value.id === action.payload.id && value.id !== undefined) ||
          (value.cacheId === action.payload.cacheId && value.cacheId !== undefined),
      );
      if (foundMinimizeEmailIndex === -1) return state;
      MinimizeEmailColor.provideColor(
        state.minimizeEmailList[foundMinimizeEmailIndex].color,
      );
      state.minimizeEmailList.splice(foundMinimizeEmailIndex, 1);
      localStorage.setItem(
        LOCAL_STORAGE_MINIMIZE_EMAILS,
        JSON.stringify(state.minimizeEmailList),
      );
      return state;
    },
  },
});

export const {
  clearEmailsList,
  setPrivateHashtag,
  setEmailStatus,
  setEmailsList,
  setCurrEmail,
  setDeletedEmails,
  addSpamEmail,
  addUnreadEmail,
  addDeletedEmail,
  setEmailIsLoading,
  setHashtags,
  deleteIndexEmail,
  addMinimizeEmail,
  updateMinimizeEmail,
  updateMinimizeEmailId,
  deleteMinimizeEmail,
} = EmailSlice.actions;

export default EmailSlice.reducer;
