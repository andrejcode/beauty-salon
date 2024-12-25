import { useState, useContext, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from '../components/Button';
import DatePicker from '../components/DatePicker';
import ServicesPicker from '../components/ServicesPicker';
import EmployeePicker from '../components/EmployeePicker';
import TimePicker from '../components/TimePicker';
import { UserContext } from '../store/UserContext';
import { formatDate } from '../utils/time';
import { getUserToken } from '../utils/auth';
import { type SalonServiceDto } from '@server/shared/dtos';
import LoadingSpinner from '../components/LoadingSpinner';

export default function BookAppointment() {
  const { userId } = useContext(UserContext);

  const navigate = useNavigate();

  const [services, setServices] = useState<SalonServiceDto[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [checkedServices, setCheckedServices] = useState<SalonServiceDto[]>([]);
  const [chosenEmployeeId, setChosenEmployeeId] = useState<number | null>(null);
  const [chosenTime, setChosenTime] = useState<string | null>(null);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  useEffect(() => {
    const uniqueCategoriesSet = new Set(
      services.map(service => service.category),
    );
    const uniqueCategoriesArray = Array.from(uniqueCategoriesSet);
    setCategories(uniqueCategoriesArray);
  }, [services]);

  useEffect(() => {
    async function fetchServices() {
      try {
        setIsLoadingServices(true);
        const response = await fetch('/api/services');

        if (response.ok) {
          const servicesDto = (await response.json()) as SalonServiceDto[];
          setServices(servicesDto);
        } else {
          setErrorMessage('Unable to get services.');
        }
      } catch (e) {
        setErrorMessage('An unknown error occurred.');
      } finally {
        setIsLoadingServices(false);
      }
    }

    void fetchServices();
  }, []);

  function handleDateChange(date: Date | null) {
    setSelectedDate(date);
  }

  function handleCheckboxChange(
    event: React.ChangeEvent<HTMLInputElement>,
    service: SalonServiceDto,
  ) {
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
  }

  function handleCardClick(id: number) {
    setChosenEmployeeId(id);
  }

  function handleSelectTime(time: string) {
    setChosenTime(time);
  }

  const updateErrorMessage = useCallback((errorMessage: string) => {
    setErrorMessage(errorMessage);
  }, []);

  const resetChosenTime = useCallback(() => {
    setChosenTime(null);
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsLoadingSubmit(true);

      const appointmentDuration = calculateAppointmentDuration();

      const appointmentServices = checkedServices
        .map(checkedService => {
          return checkedService ? checkedService.name : null;
        })
        .filter(name => name !== null);

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserToken()}`,
        },
        body: JSON.stringify({
          date: formatDate(selectedDate!),
          time: chosenTime,
          duration: appointmentDuration,
          services: appointmentServices,
          userId: userId,
          employeeId: chosenEmployeeId,
        }),
      });

      if (response.ok) {
        setSuccessMessage('Appointment booked successfully.');

        setSelectedDate(null);
        setCheckedServices([]);
        setChosenEmployeeId(null);
        setChosenTime(null);
        setErrorMessage('');

        navigate('/appointments');
      } else {
        const text = await response.text();
        setErrorMessage(`Unable to book appointment. ${text}`);
      }
    } catch (e) {
      setErrorMessage('An unknown error occurred.');
    } finally {
      setIsLoadingSubmit(false);
    }
  }

  return (
    <Container className="mt-3 initial-height">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <h1>Book an appointment</h1>
      <Form onSubmit={event => void handleSubmit(event)}>
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />

        {selectedDate &&
          categories.length > 0 &&
          (isLoadingServices ? (
            <LoadingSpinner />
          ) : (
            <ServicesPicker
              services={services}
              categories={categories}
              checkedServices={checkedServices}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}

        {selectedDate && checkedServices.length > 0 && (
          <EmployeePicker
            chosenEmployeeId={chosenEmployeeId}
            onCardClick={handleCardClick}
            updateErrorMessage={updateErrorMessage}
          />
        )}

        {selectedDate && checkedServices.length > 0 && chosenEmployeeId && (
          <TimePicker
            chosenTime={chosenTime}
            onSelectTime={handleSelectTime}
            calculateAppointmentDuration={calculateAppointmentDuration}
            selectedDate={selectedDate}
            chosenEmployeeId={chosenEmployeeId}
            updateErrorMessage={updateErrorMessage}
            resetChosenTime={resetChosenTime}
          />
        )}

        {selectedDate &&
          checkedServices.length > 0 &&
          chosenEmployeeId &&
          chosenTime && (
            <Button
              type="submit"
              title={isLoadingSubmit ? 'Loading' : 'Book Appointment'}
              className="mt-4"
              disabled={isLoadingSubmit}
            />
          )}
      </Form>
    </Container>
  );
}
