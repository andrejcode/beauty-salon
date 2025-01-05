import { createContext, useEffect, useState } from 'react';
import {
  getUserIdFromToken,
  getUserRoleFromToken,
  getUserToken,
  removeUserToken,
} from '@/utils/auth';

export interface UserContextType {
  userId: number | null;
  isAdmin: boolean;
  loading: boolean;
  saveUser: (userId: number) => void;
  removeUser: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

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

    setLoading(false);
  }, [userId]);

  function saveUser(userId: number) {
    setUserId(userId);
  }

  function removeUser() {
    setUserId(null);
  }

  return (
    <UserContext.Provider value={{ userId, isAdmin, loading, saveUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
}
