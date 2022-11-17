import create from 'zustand';
import React from 'react';
import { EmailState } from './useEmail';
import { UserInfo } from '@components/organisms/Email/Interface';

export interface EmailComposeState extends EmailState {
  isCompose: boolean;

  negativeIsCompose: () => void;
}

const useEmailCompose = create<EmailComposeState>((set) => ({
  isCompose: false,
  sender: new UserInfo('', 'Giang', 'giang@mail.com'),
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
  negativeIsCompose: () => set((state) => ({ isCompose: !state.isCompose })),
}));

export default useEmailCompose;
