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

export interface EmailState {
  EmailsList: Email[];
  focusEmail: number;
}

const initialState: EmailState = {
  EmailsList: [
    {
      id: '1',
      attachFiles: files,
      date: new Date() + '',
      mailContent: '<p>asdasd</p>',
      sender: new UserInfo('', 'User', 'user@bemail.com'),
      sendTo: [new UserInfo('', 'ReceiverUser', 'receiver@bemail.com')],
      status: 'pending',
      title: 'Email',
      type: 'receive',
      cc: [new UserInfo('', 'ccUser', 'cc@bemail.com')],
      bcc: [new UserInfo('', 'bccUser', 'bcc@bemail.com')],
    },
    {
      id: '2',
      attachFiles: files,
      date: new Date() + '',
      mailContent: '<p>asdasd</p>',
      sender: new UserInfo('', 'User', 'user@bemail.com'),
      sendTo: [new UserInfo('', 'ReceiverUser', 'receiver@bemail.com')],
      status: 'pending',
      title: 'Email',
      type: 'send',
      cc: [],
      bcc: [],
    },
    {
      id: '3',
      attachFiles: files,
      date: new Date() + '',
      mailContent: '<p>asdasd</p>',
      sender: new UserInfo('', 'User', 'user@bemail.com'),
      sendTo: [new UserInfo('', 'ReceiverUser', 'receiver@bemail.com')],
      status: 'pending',
      title: 'Email',
      type: 'receive',
      cc: [],
      bcc: [],
    },
    {
      id: '4',
      attachFiles: files,
      date: new Date() + '',
      mailContent: '<p>asdasd</p>',
      sender: new UserInfo('', 'User', 'user@bemail.com'),
      sendTo: [new UserInfo('', 'ReceiverUser', 'receiver@bemail.com')],
      status: 'pending',
      title: 'Email',
      type: 'send',
      cc: [],
      bcc: [],
    },
    {
      id: '5',
      attachFiles: files,
      date: new Date() + '',
      mailContent: '<p>asdasd</p>',
      sender: new UserInfo('', 'User', 'user@bemail.com'),
      sendTo: [new UserInfo('', 'ReceiverUser', 'receiver@bemail.com')],
      status: 'pending',
      title: 'Email',
      type: 'receive',
      cc: [],
      bcc: [],
    },
    {
      id: '6',
      attachFiles: files,
      date: new Date() + '',
      mailContent: '<p>asdasd</p>',
      sender: new UserInfo('', 'User', 'user@bemail.com'),
      sendTo: [new UserInfo('', 'ReceiverUser', 'receiver@bemail.com')],
      status: 'pending',
      title: 'Email',
      type: 'send',
      cc: [],
      bcc: [],
    },
  ],
  focusEmail: 0,
};

const EmailSlice = createSlice({
  name: 'email ',
  initialState,
  reducers: {
    setEmailsList(state, action) {
      return action.payload;
    },
    removeEmailsList(state, action) {
      return action.payload;
    },
  },
});

export const { setEmailsList } = EmailSlice.actions;

export default EmailSlice.reducer;
