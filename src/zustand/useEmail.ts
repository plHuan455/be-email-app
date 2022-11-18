import create from 'zustand';
import React from 'react';
import { UserInfo } from '@components/organisms/Email/Interface';
import { CreateCssVarsProviderResult } from '@mui/system';

export interface EmailState {
  writer: UserInfo | null;
  cc: UserInfo[];
  bcc: UserInfo[];
  subject?: string;
  content?: string;

  receivers: UserInfo[];

  clearReceivers: () => void;
  pushReceivers: (receiver: UserInfo) => void;
  deleteReceivers: (index: number) => void;
  setNewReceivers: (receivers: UserInfo[]) => void;
  setSubject: (newValue: string) => void;
  setCc: (newValue: UserInfo[]) => void;
  setBcc: (newValue: UserInfo[]) => void;
  setContent: (newValue: string) => void;
  check: () => Promise<boolean>;
  reset: () => void;
}

const useEmail = create<EmailState>((set) => ({
  writer: new UserInfo('', 'Giang', 'giang@mail.com'),
  cc: [],
  bcc: [],

  subject: '',
  content: '',
  receivers: [],

  clearReceivers() {
    return set((state) => ({ receivers: [] }));
  },
  pushReceivers(receiver) {
    return set((state) => ({
      receivers: [...state.receivers, receiver],
    }));
  },
  deleteReceivers(index) {
    return set((state) => ({
      receivers: state.receivers.splice(index, 1),
    }));
  },
  setNewReceivers(receivers) {
    return set((state) => ({
      receivers: receivers,
    }));
  },
  setSubject(newValue) {
    return set((state) => ({
      subject: newValue,
    }));
  },
  setCc(newValue) {
    return set((state) => ({
      cc: newValue,
    }));
  },
  setBcc(newValue) {
    return set((state) => ({
      bcc: newValue,
    }));
  },
  setContent(newValue) {
    return set((state) => ({
      content: newValue,
    }));
  },
  check: async () => {
    console.log(useEmail());
    return true;
  },
  reset() {
    return set((state) => ({
      writer: new UserInfo('', 'Giang', 'giang@mail.com'),
      cc: [],
      bcc: [],

      subject: '',
      content: '',
      receivers: [],
    }));
  },
}));

export default useEmail;
