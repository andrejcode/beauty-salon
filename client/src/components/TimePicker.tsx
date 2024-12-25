import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import LoadingSpinner from './LoadingSpinner';
import { formatDate } from '../utils/time';
import { getUserToken } from '../utils/auth';
import useTokenExpiration from '../hooks/useTokenExpiration';

interface TimePickerProps {
  chosenTime: string | null;
  onSelectTime: (time: string) => void;
  calculateAppointmentDuration: () => number;
  selectedDate: Date | null;
  chosenEmployeeId: number;
  updateErrorMessage: (errorMessage: string) => void;
  resetChosenTime: () => void;
}

export default function TimePicker({
  chosenTime,
  onSelectTime,
  calculateAppointmentDuration,
  selectedDate,
  chosenEmployeeId,
  updateErrorMessage,
  resetChosenTime,
}: TimePickerProps) {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isLoadingAvailableTimes, setIsLoadingAvailableTimes] =
    useState<boolean>(false);

  const { handleFetchResponse } = useTokenExpiration();

  useEffect(() => {
    async function fetchAvailableTimes() {
      try {
        setIsLoadingAvailableTimes(true);

        const appointmentDuration = calculateAppointmentDuration();

        const formattedDate = formatDate(selectedDate!);

        const response = await fetch(
          `/api/appointments/available?employeeId=${chosenEmployeeId}&date=${formattedDate}&duration=${appointmentDuration}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getUserToken()}`,
            },
          },
        );

        if (response.ok) {
          const times = (await response.json()) as string[];
          setAvailableTimes(times);
          resetChosenTime();
        } else {
          await handleFetchResponse(response);
          updateErrorMessage('Unable to get available times.');
        }
      } catch (e) {
        updateErrorMessage('An unknown error occurred.');
      } finally {
        setIsLoadingAvailableTimes(false);
      }
    }

    void fetchAvailableTimes();
  }, [
    calculateAppointmentDuration,
    chosenEmployeeId,
    handleFetchResponse,
    resetChosenTime,
    selectedDate,
    updateErrorMessage,
  ]);

  return isLoadingAvailableTimes ? (
    <div className="mt-3">
      <LoadingSpinner />
    </div>
  ) : (
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
                <Dropdown.Item key={index} onClick={() => onSelectTime(time)}>
                  {time}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        </Row>
      ) : (
        <p className="fade-in">
          There are no available times. Please choose another date.
        </p>
      )}
    </>
  );
}
