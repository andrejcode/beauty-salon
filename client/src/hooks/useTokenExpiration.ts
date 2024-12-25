import { useCallback, useContext } from 'react';
import { UserContext } from '../store/UserContext';
import { removeUserToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function useTokenExpiration() {
  const { removeUser } = useContext(UserContext);
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
