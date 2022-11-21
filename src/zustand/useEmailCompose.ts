import { Content } from './../containers/LoginContainer/index';
import create from 'zustand';
import React from 'react';
import useEmail, { EmailState } from './useEmail';
import { UserInfo } from '@components/organisms/Email/Interface';
import { isEmpty } from 'lodash';
import { useTranslation } from '@@packages/localization/src';
import { toast } from 'react-toastify';

interface EmailFormData {
  writer: string;
  cc: string[];
  bcc: string[];
  receivers: string[];
  subject: string;
  content: string;
}
export interface EmailComposeState extends EmailState {
  isCompose: boolean;
  isZoom: boolean;

  negativeIsZoom: () => void;
  negativeIsCompose: () => void;
  getAll: any;
}

const useEmailCompose = create<EmailComposeState>((set, get) => ({
  isCompose: false,
  isZoom: false,

  writer: new UserInfo('', 'Giang', 'giang@mail.com'),
  cc: [],
  bcc: [],
  receivers: [],
  subject: '',
  content: '',

  negativeIsZoom() {
    return set((state) => ({ isZoom: !state.isZoom }));
  },

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
  check: async () => {
    const checkValidate = !isEmpty(get().receivers);

    return checkValidate;
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

  getAll() {
    return {
      writer: get().writer,
      cc: get().cc,
      bcc: get().bcc,
      receivers: get().receivers,
      subject: get().subject,
      content: get().content,
    };
  },

  negativeIsCompose: () => set((state) => ({ isCompose: !state.isCompose })),
}));

export default useEmailCompose;
