import { useEffect, useState, useContext } from 'react';
import {
  Alert,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import { EmployeeDto, SalonServiceDto } from '@server/shared/dtos';
import { getUserToken } from '../utils/auth';
import { UserContext } from '../store/UserContext';
import useFetchBusinessTimes from '../hooks/useFetchBusinessTimes';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useTokenExpiration from '../hooks/useTokenExpiration';
import { formatDate } from '../utils/time';
import { useNavigate } from 'react-router-dom';

export default function BookAppointment() {
  const { userId } = useContext(UserContext);

  const { times, isLoadingTimes } = useFetchBusinessTimes();
  const { handleFetchResponse } = useTokenExpiration();

  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [services, setServices] = useState<SalonServiceDto[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [checkedServices, setCheckedServices] = useState<number[]>([]);
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);
  const [chosenEmployee, setChosenEmployee] = useState<number>();
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [chosenTime, setChosenTime] = useState<string>();
  const [isLoadingServices, setIsLoadingServices] = useState<boolean>(false);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState<boolean>(false);
  const [isLoadingAvailableTimes, setIsLoadingAvailableTimes] = useState<boolean>(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

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

    async function fetchEmployees() {
      try {
        setIsLoadingEmployees(true);

        const response = await fetch('/api/employees');

        if (response.ok) {
          const employeesDto = (await response.json()) as EmployeeDto[];
          setEmployees(employeesDto);
        } else {
          setErrorMessage('Unable to get employees.');
        }
      } catch (e) {
        setErrorMessage('An unknown error occurred.');
      } finally {
        setIsLoadingEmployees(false);
      }
    }

    void fetchEmployees();
  }, []);

  useEffect(() => {
    const uniqueSet = new Set(services.map((service) => service.category));

    const uniqueCategoriesArray = Array.from(uniqueSet);

    setCategories(uniqueCategoriesArray);
  }, [services]);

  useEffect(() => {
    async function fetchAvailableTimes() {
      try {
        setIsLoadingAvailableTimes(true);

        const appointmentDuration = calculateAppointmentDuration();

        const formattedDate = formatDate(selectedDate!);

        const response = await fetch(
          `/api/appointments/available?employeeId=${1}&date=${formattedDate}&duration=${appointmentDuration}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getUserToken()}`,
            },
          }
        );

        if (response.ok) {
          const times = (await response.json()) as string[];
          setAvailableTimes(times);
          setChosenTime(undefined);
        } else {
          await handleFetchResponse(response);
          setErrorMessage('Unable to get available times.');
        }
      } catch (e) {
        setErrorMessage('An unknown error occurred.');
      } finally {
        setIsLoadingAvailableTimes(false);
      }
    }

    if (selectedDate && checkedServices.length > 0 && chosenEmployee) {
      void fetchAvailableTimes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenEmployee, selectedDate, checkedServices]);

  function calculateAppointmentDuration() {
    const appointmentDuration = checkedServices.reduce((total, id) => {
      const service = services.find((s) => s.id === id);
      return total + (service ? service.durationInMinutes : 0);
    }, 0);

    return appointmentDuration;
  }

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>, serviceId: number) {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedServices([...checkedServices, serviceId]);
    } else {
      setCheckedServices(checkedServices.filter((id) => id !== serviceId));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsLoadingSubmit(true);

      const appointmentDuration = calculateAppointmentDuration();

      const appointmentServices = checkedServices
        .map((id) => {
          const service = services.find((s) => s.id === id);
          return service ? service.name : null;
        })
        .filter((name) => name !== null);

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
          employeeId: chosenEmployee,
        }),
      });

      if (response.ok) {
        setSuccessMessage('Appointment booked successfully.');

        setSelectedDate(null);
        setCheckedServices([]);
        setChosenEmployee(undefined);
        setChosenTime(undefined);
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

  function handleCardClick(id: number) {
    setChosenEmployee(id);
  }

  function handleSelectTime(time: string) {
    setChosenTime(time);
  }

  function isOffDay(date: Date) {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return times?.offDays.includes(dayName);
  }

  function filterOffDays(date: Date) {
    return !isOffDay(date);
  }

  return (
    <Container className="mt-3 initial-height">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <h1>Book an appointment</h1>
      <Form onSubmit={(event) => void handleSubmit(event)}>
        {isLoadingTimes ? (
          <LoadingSpinner />
        ) : (
          <Form.Group>
            <Row>
              <Form.Label>Select date:</Form.Label>
            </Row>
            <DatePicker
              showIcon
              selected={selectedDate}
              onChange={(date: Date) => {
                setSelectedDate(date);
              }}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              placeholderText="yyyy-MM-dd"
              filterDate={filterOffDays}
            />
          </Form.Group>
        )}

        {selectedDate && isLoadingServices ? (
          <LoadingSpinner />
        ) : (
          selectedDate &&
          categories &&
          categories.length > 0 && (
            <Tabs className="my-4 fade-in" defaultActiveKey={categories[0]} id="services-tabs">
              {categories.map((category) => {
                return (
                  <Tab
                    key={category}
                    eventKey={category}
                    title={category.charAt(0).toUpperCase() + category.slice(1)}
                    className="fade-in"
                  >
                    {services
                      .filter((service) => service.category === category)
                      .map((service) => (
                        <Form.Check
                          key={service.id}
                          type="checkbox"
                          id={`checkbox-${service.id}`}
                          className="mb-4"
                        >
                          <Form.Check.Input
                            type="checkbox"
                            onChange={(event) => handleCheckboxChange(event, service.id)}
                            checked={checkedServices.includes(service.id)}
                            className="clickable"
                          />
                          <Form.Check.Label style={{ fontSize: '1.2em' }}>
                            {service.name}
                          </Form.Check.Label>
                          <br />
                          <Form.Check.Label>{service.description}</Form.Check.Label>
                          <br />
                          <Form.Check.Label>{service.durationInMinutes} minutes</Form.Check.Label>
                          <br />
                          <Form.Check.Label>
                            {(service.costInCents / 100).toFixed(2)}&euro;
                          </Form.Check.Label>
                        </Form.Check>
                      ))}
                  </Tab>
                );
              })}
            </Tabs>
          )
        )}

        {selectedDate && checkedServices.length > 0 && isLoadingEmployees ? (
          <LoadingSpinner />
        ) : (
          selectedDate &&
          checkedServices.length > 0 && (
            <>
              <Form.Label className="mt-3 fade-in">Select employee:</Form.Label>
              <Row xs={1} md={2} lg={4} className="g-4 fade-in">
                {employees.map((employee) => (
                  <Col key={employee.id}>
                    <Card
                      onClick={() => handleCardClick(employee.id)}
                      className="clickable"
                      style={{
                        width: '100%',
                        backgroundColor:
                          chosenEmployee === employee.id ? 'var(--main-color)' : 'white',
                      }}
                    >
                      <Card.Body>
                        <Card.Title>{employee.fullName}</Card.Title>
                        <Card.Text>{employee.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )
        )}

        {selectedDate && checkedServices.length > 0 && chosenEmployee && isLoadingAvailableTimes ? (
          <LoadingSpinner />
        ) : (
          selectedDate &&
          checkedServices.length > 0 &&
          chosenEmployee && (
            <>
              <Form.Label className="fade-in mt-2">Select time:</Form.Label>
              {availableTimes.length > 0 ? (
                <Row className="fade-in">
                  <Col xs={12} sm={6} md={4}>
                    <DropdownButton
                      id="times-dropdown"
                      title={chosenTime || 'Select Time'}
                      drop="up"
                    >
                      {availableTimes.map((time, index) => (
                        <Dropdown.Item key={index} onClick={() => handleSelectTime(time)}>
                          {time}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </Col>
                </Row>
              ) : (
                <p className="fade-in">There are no available times. Please choose another date.</p>
              )}
            </>
          )
        )}

        {selectedDate &&
          checkedServices.length > 0 &&
          chosenEmployee &&
          availableTimes.length > 0 &&
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
