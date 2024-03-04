import { ReactNode, createContext, useEffect, useState } from 'react';
import {
  getUserIdFromToken,
  getUserRoleFromToken,
  getUserToken,
  removeUserToken,
} from '../utils/auth';

export interface UserContextType {
  userId: number | null;
  saveUser: (userId: number) => void;
  removeUser: () => void;
  isAdmin: boolean;
}

export const UserContext = createContext<UserContextType>({
  userId: null,
  saveUser: () => {},
  removeUser: () => {},
  isAdmin: false,
});

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [userId, setUserId] = useState<UserContextType['userId']>(null);
  const [isAdmin, setIsAdmin] = useState<UserContextType['isAdmin']>(false);

  useEffect(() => {
    const token = getUserToken();

    if (token) {
      const id = getUserIdFromToken(token);
      setUserId(id);

      const role = getUserRoleFromToken(token);
      if (role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setUserId(null);
      removeUserToken();
      setIsAdmin(false);
    }
  }, [userId]);

  function saveUser(userId: number) {
    setUserId(userId);
  }

  function removeUser() {
    setUserId(null);
  }

  return (
    <UserContext.Provider value={{ userId, isAdmin, saveUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
}
