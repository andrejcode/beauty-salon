import { useEffect, useState } from 'react';
import Alert from '../components/ui/Alert';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AppointmentList from '@/components/AppointmentList';
import useTokenExpiration from '../hooks/useTokenExpiration';
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
    <div className="min-h-screen px-6 py-4 md:px-16 lg:px-24">
      {errorMessage && (
        <div className="mb-4">
          <Alert variant="danger">{errorMessage}</Alert>
        </div>
      )}

      {isLoading ? (
        <div className="my-4 flex items-center justify-start">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <AppointmentList
            title="Upcoming appointments"
            appointments={upcomingAppointments}
            canCancelAppointment={false}
          />
          {upcomingAppointments.length <= 0 && (
            <p className="my-3 text-gray-600">There are no upcoming appointments.</p>
          )}
        </>
      )}
    </div>
  );
}
