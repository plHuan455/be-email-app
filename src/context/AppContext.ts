import { createContext, useContext } from 'react';

export interface AuthContextType {
  user: unknown;
  signin: (user: any, token: string | undefined, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  token: string | undefined;
}

const AuthContext = createContext<AuthContextType>(null!);

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthContext };