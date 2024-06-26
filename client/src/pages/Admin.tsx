import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import LoadingSpinner from '../components/LoadingSpinner';
import AppointmentCard from '../components/AppointmentCard';
import useTokenExpiration from '../hooks/useTokenExpiration';
import { formatDateGerman } from '../utils/time';
import { getUserToken } from '../utils/auth';
import { type AppointmentDto } from '@server/shared/dtos';

export default function Admin() {
  const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentDto[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleFetchResponse } = useTokenExpiration();

  useEffect(() => {
    async function fetchUpcomingAppointments() {
      try {
        setIsLoading(true);

        const response = await fetch('/api/appointments/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getUserToken()}`,
          },
        });

        if (response.ok) {
          const appointmentsDto = (await response.json()) as AppointmentDto[];
          setUpcomingAppointments(appointmentsDto);
        } else {
          await handleFetchResponse(response);
          setErrorMessage('Unable to get appointments.');
        }
      } catch (e) {
        setErrorMessage('An unknown error occured.');
      } finally {
        setIsLoading(false);
      }
    }

    void fetchUpcomingAppointments();
  }, [handleFetchResponse]);

  return (
    <Container className="mt-3 initial-height">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <h1>Upcoming Appointments</h1>
      {isLoading ? (
        <div className="d-flex justify-content-start align-items-center my-4">
          <LoadingSpinner />
        </div>
      ) : upcomingAppointments.length > 0 ? (
        <Row className="my-3">
          {upcomingAppointments.map((appointment) => (
            <Col key={appointment.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <AppointmentCard
                date={formatDateGerman(`${appointment.date}T${appointment.time}`)}
                durationInMinutes={appointment.durationInMinutes}
                price={(appointment.priceInCents / 100).toFixed(2)}
                showIcon={false}
                user={appointment.user?.fullName}
                employee={appointment.employee?.fullName}
                services={appointment.services.join(', ')}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <p className="my-3">There are no upcoming appointments.</p>
      )}
    </Container>
  );
}
