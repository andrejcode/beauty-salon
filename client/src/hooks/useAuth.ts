import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../store/UserContext';
import { getUserIdFromToken, saveUserToken } from '../utils/auth';
import { LoginFormData, SignupFormData } from '../types';

export default function useAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { saveUser } = useContext(UserContext);

  const navigate = useNavigate();

  async function authenticate(url: string, formData: LoginFormData | SignupFormData) {
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

        navigate('/');
      } else {
        const errorMessage = await response.text();
        setErrorMessage(errorMessage);
      }
    } catch (e) {
      setErrorMessage('An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, errorMessage, authenticate };
}
