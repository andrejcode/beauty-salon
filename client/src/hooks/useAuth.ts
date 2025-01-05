import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserIdFromToken, saveUserToken } from '@/utils/auth';
import type { LoginFormData, SignupFormData } from '@/types';
import useUserContext from './useUserContext';

export default function useAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { saveUser } = useUserContext();

  const navigate = useNavigate();
  const location = useLocation();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const from = location?.state?.from?.pathname || '/';

  const authenticate = async (url: string, formData: LoginFormData | SignupFormData) => {
    try {
      setIsLoading(true);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setErrorMessage('');

        const { token } = (await response.json()) as { token: string };

        saveUserToken(token);

        const userId = getUserIdFromToken(token);
        saveUser(userId);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        navigate(from, { replace: true });
      } else {
        const errorMessage = await response.text();
        setErrorMessage(errorMessage);
      }
    } catch {
      setErrorMessage('An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, errorMessage, authenticate };
}
