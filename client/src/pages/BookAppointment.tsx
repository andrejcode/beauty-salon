import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from '../components/DatePicker';
import ServicesPicker from '../components/ServicesPicker';
import EmployeePicker from '../components/EmployeePicker';
import TimePicker from '../components/TimePicker';
import { formatDate } from '../utils/time';
import { getUserToken } from '../utils/auth';
import { type SalonServiceDto } from '@server/shared/dtos';
import Alert from '@/components/ui/Alert';
import useUserContext from '@/hooks/useUserContext';
import Button from '@/components/ui/Button';

export default function BookAppointment() {
  const { userId } = useUserContext();

  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [checkedServices, setCheckedServices] = useState<SalonServiceDto[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null,
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    service: SalonServiceDto,
  ) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedServices([...checkedServices, service]);
    } else {
      setCheckedServices(
        checkedServices.filter(
          checkedService => checkedService.id !== service.id,
        ),
      );
    }
  };

  const handleSelectTime = useCallback((time: string) => {
    setSelectedTime(time);
  }, []);

  const updateEmployeeId = useCallback((id: number) => {
    setSelectedEmployeeId(id);
  }, []);

  const updateErrorMessage = useCallback((errorMessage: string) => {
    setErrorMessage(errorMessage);
  }, []);

  const calculateAppointmentDuration = useCallback(() => {
    const appointmentDuration = checkedServices.reduce(
      (total, checkedService) => {
        return total + (checkedService ? checkedService.durationInMinutes : 0);
      },
      0,
    );

    return appointmentDuration;
  }, [checkedServices]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoadingSubmit(true);

      const appointmentServices = checkedServices
        .map(checkedService => {
          return checkedService ? checkedService.name : null;
        })
        .filter(name => name !== null);

      const appointmentDuration = calculateAppointmentDuration();

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserToken()}`,
        },
        body: JSON.stringify({
          date: formatDate(selectedDate),
          time: selectedTime,
          duration: appointmentDuration,
          services: appointmentServices,
          userId: userId,
          employeeId: selectedEmployeeId,
        }),
      });

      if (response.ok) {
        navigate('/appointments');
      } else {
        const text = await response.text();
        setErrorMessage(`Unable to book appointment. ${text}`);
      }
    } catch {
      setErrorMessage('An unknown error occurred.');
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <div className="p-6 md:px-16 lg:px-24">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <h1 className="mb-4 text-3xl">Book an appointment</h1>
      <form onSubmit={event => void handleSubmit(event)}>
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />

        <ServicesPicker
          checkedServices={checkedServices}
          onCheckboxChange={handleCheckboxChange}
          updateErrorMessage={updateErrorMessage}
        />

        <EmployeePicker
          selectedEmployeeId={selectedEmployeeId}
          updateEmployeeId={updateEmployeeId}
          updateErrorMessage={updateErrorMessage}
        />

        {checkedServices.length > 0 && selectedEmployeeId && (
          <TimePicker
            selectedTime={selectedTime}
            updateSelectedTime={handleSelectTime}
            calculateAppointmentDuration={calculateAppointmentDuration}
            selectedDate={selectedDate}
            selectedEmployeeId={selectedEmployeeId}
            updateErrorMessage={updateErrorMessage}
          />
        )}

        {checkedServices.length > 0 && selectedEmployeeId && selectedTime && (
          <Button type="submit" disabled={isLoadingSubmit}>
            Book Appointment
          </Button>
        )}
      </form>
    </div>
  );
}
