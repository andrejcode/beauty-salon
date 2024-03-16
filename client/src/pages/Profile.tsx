import { useEffect, useState } from 'react';
import { getUserToken } from '../utils/auth';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { formatDateGerman } from '../utils/time';
import { CgProfile } from 'react-icons/cg';
import LoadingSpinner from '../components/LoadingSpinner';
import UserReview from '../components/UserReview';
import { UserDto } from '@server/shared/dtos';
import useTokenExpiration from '../hooks/useTokenExpiration';

export default function Profile() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="initial-height my-4">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {isLoading && (
        <div className="d-flex justify-content-start align-items-center my-3">
          <LoadingSpinner />
        </div>
      )}
      {userInfo && (
        <>
          <h2>My Profile</h2>
          <Row className="my-3">
            <Col>
              <CgProfile size={'10em'} />
            </Col>
            <Col xs={10} style={{ lineHeight: '1.1' }} className="mt-3">
              <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{userInfo.fullName}</p>
              <p>{userInfo.email}</p>
              <p>Account created on {formatDateGerman(userInfo.memberSince.toString())}</p>
            </Col>
          </Row>
          <UserReview />
        </>
      )}
    </Container>
  );
}
