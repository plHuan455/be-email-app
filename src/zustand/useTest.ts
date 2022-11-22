import create from 'zustand';
import React from 'react';

interface TestState {
  name: string;
  setName: (name: string) => void;
}

const useTest = create<TestState>((set) => ({
  name: '',
  setName: (name: string) => set({ name }),
  age: 0,
  setAge: (name: string) => set({ name }),
}));

export default useTest;
