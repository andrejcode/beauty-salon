import { useContext } from 'react';
import { UserContext } from '../store/UserContext';
import { removeUserToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function useTokenExpiration() {
  const { removeUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleTokenExpiration() {
    removeUser();
    removeUserToken();
  }

  async function handleFetchResponse(response: Response) {
    const responseText = await response.text();

    if (responseText === 'Token expired.' || response.status === 401) {
      handleTokenExpiration();
      navigate('/');
    }
  }

  return { handleFetchResponse };
}
