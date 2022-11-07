import { AuthContext } from '@context/AppContext';
import useLocalStorage from '@hooks/useLocalStorage';
import React from 'react';

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage<string | null>('user', null);
  const [token, setToken] = useLocalStorage<string | undefined>('token', undefined);

  const signin = (
    newUser: string,
    token: string | undefined,
    callback: VoidFunction,
  ) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      setToken(token);
      callback?.();
    });
  };

  const signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      setToken(undefined);
      callback?.();
    });
  };

  const value = { user, signin, signout, token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
