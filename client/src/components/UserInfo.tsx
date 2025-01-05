import { useEffect, useState } from 'react';
import Alert from './ui/Alert';
import LoadingSpinner from './ui/LoadingSpinner';
import useTokenExpiration from '../hooks/useTokenExpiration';
import { getUserToken } from '../utils/auth';
import { type UserDto } from '@server/shared/dtos';

export default function UserInfo() {
  const { handleFetchResponse } = useTokenExpiration();

  const [userInfo, setUserInfo] = useState<UserDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        setIsLoading(true);

        const response = await fetch('/api/users/profile', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getUserToken()}`,
          },
        });
        if (response.ok) {
          const userDto = (await response.json()) as UserDto;
          setUserInfo(userDto);
        } else {
          await handleFetchResponse(response);
          setErrorMessage('Unable to get user info.');
        }
      } catch (e) {
        setErrorMessage('An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    }

    void fetchUserInfo();
  }, [handleFetchResponse]);

  return (
    <>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {isLoading && (
        <div className="d-flex justify-content-start align-items-center my-3">
          <LoadingSpinner />
        </div>
      )}

      <h1 className="mb-4 text-2xl font-bold">
        {userInfo?.firstName ? `${userInfo.firstName}'s appointments` : 'My appointments'}
      </h1>
    </>
  );
}
