import create from 'zustand';
import React from 'react';

interface EmailState {
  isCompose: boolean;
  negativeIsCompose: () => void;
}

const useEmail = create<EmailState>((set) => ({
  isCompose: false,
  negativeIsCompose: () => set((state) => ({ isCompose: !state.isCompose })),
}));

export default useEmail;
