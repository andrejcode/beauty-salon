import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeUserToken } from '@/utils/auth';
import useUserContext from './useUserContext';

export default function useTokenExpiration() {
  const { removeUser } = useUserContext();
  const navigate = useNavigate();

  const handleTokenExpiration = useCallback(() => {
    removeUser();
    removeUserToken();
  }, [removeUser]);

  const handleFetchResponse = useCallback(
    async (response: Response) => {
      const responseText = await response.text();

      if (responseText === 'Token expired.' || response.status === 401) {
        handleTokenExpiration();
        navigate('/');
      }
    },
    [handleTokenExpiration, navigate],
  );

  return { handleFetchResponse };
}
