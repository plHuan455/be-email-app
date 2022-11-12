import React, { createContext, useState } from 'react';

type Props = {
  children: any;
};

interface StateProvider {
  currentUser: number;
  setCurrentUser: React.Dispatch<React.SetStateAction<number>>;
}

const initialStateProvider = {
  currentUser: 0,
  setCurrentUser: () => null,
};

export const GlobalStateContext = createContext<StateProvider>(initialStateProvider);

const GlobalStateProvider: React.FC<any> = (children: any) => {
  const [currentUser, setCurrentUser] = useState<number>(0);
  return (
    <GlobalStateContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
