import { EmailResponse } from '@api/email';
import { EmailList, StatusOptions } from '@components/molecules/ModalEmailList';
import { Email, UserInfo } from '@components/organisms/Email/Interface';
import { AttachFile, UserRead } from '@components/organisms/EmailMess';
import { MinimizeEmailColor } from '@components/organisms/MinimizeEmail/interface';
import { MinimizeEmailTypes } from '@components/templates/MinimizeEmailList';
import { emailData } from '@layouts/EmailStatusBar';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clone } from 'lodash';
import { toast } from 'react-toastify';

export const LOCAL_STORAGE_MINIMIZE_EMAILS = 'minimize_emails';

export interface HashtagTabs {
  title: string;
  value: string;
  status: StatusOptions;
  notiNumber: number;
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
  minimizeMailList: MinimizeEmailTypes[];
  EmailsList: EmailResponse[];
  privateHashtags: HashtagTabs[];
  deletedEmailsList: EmailResponse[];
  spamEmailsList: EmailResponse[];
  unreadEmailsList: EmailResponse[];
  isLoading: boolean;
}

export const LOCAL_STORAGE_PRIVATE_HASHTAG = 'private_hashtag';

const initialState: EmailState = {
  minimizeMailList: JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_MINIMIZE_EMAILS) ?? '[]',
  ).map((value) => ({
    ...value,
    to: value?.to?.map(
      (value) => new UserInfo(value.avatar, value.name, value.mail),
    ),
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
    setEmailsList(state, action) {
      return { ...state, EmailsList: action.payload };
    },
    removeEmailsList(state, action) {
      return action.payload;
    },
    addMinimizeAndSetShowMinimizeEmail(
      state,
      action: PayloadAction<MinimizeEmailTypes>,
    ) {
      state.minimizeMailList.push(action.payload);
      state.showMinimizeEmailId = action.payload.id;
      return state;
    },
    addMinimizeEmail(state, action: PayloadAction<MinimizeEmailTypes>) {
      if (!action.payload.id) {
        if (state.minimizeMailList.length >= 2) {
          toast.error('The minimized email limit is two');
          return state;
        }
        state.minimizeMailList.push({
          ...action.payload,
          id: action.payload.id ?? String(Date.now()),
        });
        localStorage.setItem(
          LOCAL_STORAGE_MINIMIZE_EMAILS,
          JSON.stringify(state.minimizeMailList),
        );
      } else {
        const foundMinimizeEmailIndex = state.minimizeMailList.findIndex(
          (value) => value.id === action.payload.id,
        );
        if (foundMinimizeEmailIndex !== -1) {
          state.minimizeMailList[foundMinimizeEmailIndex] = action.payload;
        }

        state.showMinimizeEmailId = undefined;
      }
      return state;
    },
    setShowMinimizeEmail(state, action: PayloadAction<string | undefined>) {
      state.showMinimizeEmailId = action.payload;
      return state;
    },
    removeMinimizeEmail(state, action: PayloadAction<string>) {
      state.minimizeMailList = state.minimizeMailList.filter((value) => {
        if(value.id !== action.payload) return true;
        MinimizeEmailColor.provideColor(value.color);
      });
      localStorage.setItem(
        LOCAL_STORAGE_MINIMIZE_EMAILS,
        JSON.stringify(state.minimizeMailList),
      );
      return state;
    },
    resetEmailState(state) {
      localStorage.removeItem(LOCAL_STORAGE_MINIMIZE_EMAILS);
      MinimizeEmailColor.reset();
      state = initialState;
    }
  },
});

export const {
  setPrivateHashtag,
  setEmailStatus,
  setEmailsList,
  setDeletedEmails,
  addSpamEmail,
  addUnreadEmail,
  addDeletedEmail,
  setEmailIsLoading,
  setShowMinimizeEmail,
  addMinimizeEmail,
  removeMinimizeEmail,
  addMinimizeAndSetShowMinimizeEmail,
  deleteIndexEmail,
  resetEmailState,
} = EmailSlice.actions;

export default EmailSlice.reducer;
