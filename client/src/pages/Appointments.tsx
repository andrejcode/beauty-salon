import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import AppointmentList from '../components/AppointmentList';
import BookButton from '../components/BookButton';
import LoadingSpinner from '../components/LoadingSpinner';
import ModalComponent from '../components/ModalComponent';
import useTokenExpiration from '../hooks/useTokenExpiration';
import { getUserToken } from '../utils/auth';
import { AppointmentDto } from '@server/shared/dtos';

export default function Appointments() {
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    AppointmentDto[]
  >([]);
  const [pastAppointments, setPastAppointments] = useState<AppointmentDto[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    number | null
  >(null);

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

          appointmentsDto.forEach(appointment => {
            const appointmentDate = new Date(
              `${appointment.date}T${appointment.time}`,
            );

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
  }, [handleFetchResponse]);

  async function handleDelete() {
    if (!selectedAppointmentId) {
      setErrorMessage('Appointment id not selected.');
      return;
    }

    try {
      const response = await fetch(
        `/api/appointments${'/' + selectedAppointmentId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getUserToken()}`,
          },
        },
      );

      if (response.ok) {
        // Remove the deleted appointment from the state
        setUpcomingAppointments(prevAppointments =>
          prevAppointments.filter(
            appointment => appointment.id !== selectedAppointmentId,
          ),
        );
        setPastAppointments(prevAppointments =>
          prevAppointments.filter(
            appointment => appointment.id !== selectedAppointmentId,
          ),
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

  function handleDeleteClick(appointmentId: number) {
    setSelectedAppointmentId(appointmentId);
    setShowModal(true);
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
            <AppointmentList
              title="Upcoming appointments"
              appointments={upcomingAppointments}
              handleDeleteClick={handleDeleteClick}
            />
            {upcomingAppointments.length <= 0 && (
              <p className="my-3">There are no upcoming appointments.</p>
            )}

            {pastAppointments.length > 0 && (
              <AppointmentList
                title="Past appointments"
                appointments={pastAppointments}
                handleDeleteClick={handleDeleteClick}
              />
            )}
          </>
        )}

        <BookButton />
      </Container>
    </>
  );
}
