import { useEffect, useState } from 'react';
import { getUserToken } from '../utils/auth';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { AppointmentDto } from '@server/shared/dtos';
import useTokenExpiration from '../hooks/useTokenExpiration';
import BookButton from '../components/BookButton';
import { formatDateGerman } from '../utils/time';
import AppointmentCard from '../components/AppointmentCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ModalComponent from '../components/ModalComponent';

export default function Appointments() {
  const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentDto[]>([]);
  const [pastAppointments, setPastAppointments] = useState<AppointmentDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);

  const { handleFetchResponse } = useTokenExpiration();

  useEffect(() => {
    async function fetchAppointments() {
      try {
        setIsLoading(true);

        const response = await fetch('/api/appointments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getUserToken()}`,
          },
        });

        if (response.ok) {
          const appointmentsDto = (await response.json()) as AppointmentDto[];

          const today = new Date();

          const upcoming: AppointmentDto[] = [];
          const past: AppointmentDto[] = [];

          appointmentsDto.forEach((appointment) => {
            const appointmentDate = new Date(appointment.date);

            if (appointmentDate >= today) {
              upcoming.push(appointment);
            } else {
              past.push(appointment);
            }
          });

          setUpcomingAppointments(upcoming);
          setPastAppointments(past);
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

    void fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete() {
    if (!selectedAppointmentId) {
      setErrorMessage('Appointment id not selected.');
      return;
    }

    try {
      const response = await fetch(`/api/appointments${'/' + selectedAppointmentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserToken()}`,
        },
      });

      if (response.ok) {
        // Remove the deleted appointment from the state
        setUpcomingAppointments(
          upcomingAppointments.filter((appointment) => appointment.id !== selectedAppointmentId)
        );
        setPastAppointments(
          pastAppointments.filter((appointment) => appointment.id !== selectedAppointmentId)
        );

        setSuccessMessage('Appointment successfully deleted.');
        setSelectedAppointmentId(null);
      } else {
        await handleFetchResponse(response);
        setErrorMessage('Unable to delete the appointment.');
      }
    } catch (e) {
      setErrorMessage('An unknown error occured.');
    }
  }

  return (
    <>
      <ModalComponent
        show={showModal}
        onHide={() => {
          setSelectedAppointmentId(null);
          setShowModal(false);
        }}
        actionButtonTitle="Yes"
        modalTitle="Delete appointment"
        modalBody="Are you sure you want to delete the appointment?"
        onAction={() => void handleDelete()}
      />

      <Container className="initial-height my-4">
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <h1>My appointments</h1>

        {isLoading ? (
          <div className="d-flex justify-content-start align-items-center my-4">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <h2>Upcoming appointments</h2>
            {upcomingAppointments.length > 0 ? (
              <Row className="my-3">
                {upcomingAppointments.map((appointment) => (
                  <Col key={appointment.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
                    <AppointmentCard
                      date={formatDateGerman(`${appointment.date}T${appointment.time}`)}
                      durationInMinutes={appointment.durationInMinutes}
                      price={(appointment.priceInCents / 100).toFixed(2)}
                      handleClick={() => {
                        setSelectedAppointmentId(appointment.id);
                        setShowModal(true);
                      }}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <p className="my-3">There are no upcoming appointments.</p>
            )}

            {pastAppointments.length > 0 && (
              <div className="mb-3">
                <h2>Past appointments</h2>
                <Row className="my-3">
                  {pastAppointments.map((appointment) => (
                    <Col key={appointment.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
                      <AppointmentCard
                        date={formatDateGerman(`${appointment.date}T${appointment.time}`)}
                        durationInMinutes={appointment.durationInMinutes}
                        price={(appointment.priceInCents / 100).toFixed(2)}
                        handleClick={() => {
                          setSelectedAppointmentId(appointment.id);
                          setShowModal(true);
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </>
        )}

        <BookButton />
      </Container>
    </>
  );
}
