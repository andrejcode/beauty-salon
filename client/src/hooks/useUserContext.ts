import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';

export default function useUserContext() {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
}
