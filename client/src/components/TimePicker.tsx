import { useEffect, useState } from 'react';
import LoadingSpinner from './ui/LoadingSpinner';
import useTokenExpiration from '@/hooks/useTokenExpiration';
import { formatDate } from '@/utils/time';
import { getUserToken } from '@/utils/auth';

interface TimePickerProps {
  selectedTime: string | null;
  updateSelectedTime: (time: string) => void;
  calculateAppointmentDuration: () => number;
  selectedDate: Date | null;
  selectedEmployeeId: number | null;
  updateErrorMessage: (errorMessage: string) => void;
}

export default function TimePicker({
  selectedTime,
  updateSelectedTime,
  calculateAppointmentDuration,
  selectedDate,
  selectedEmployeeId,
  updateErrorMessage,
}: TimePickerProps) {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isLoadingAvailableTimes, setIsLoadingAvailableTimes] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const { handleFetchResponse } = useTokenExpiration();

  useEffect(() => {
    async function fetchAvailableTimes() {
      try {
        setIsLoadingAvailableTimes(true);

        const appointmentDuration = calculateAppointmentDuration();

        const formattedDate = formatDate(selectedDate!);

        const response = await fetch(
          `/api/appointments/available?employeeId=${selectedEmployeeId}&date=${formattedDate}&duration=${appointmentDuration}`,
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
          updateSelectedTime(times[0]);
        } else {
          await handleFetchResponse(response);
          updateErrorMessage('Unable to get available times.');
        }
      } catch {
        updateErrorMessage('An unknown error occurred.');
      } finally {
        setIsLoadingAvailableTimes(false);
      }
    }

    void fetchAvailableTimes();
  }, [
    updateErrorMessage,
    selectedDate,
    selectedEmployeeId,
    calculateAppointmentDuration,
    updateSelectedTime,
    handleFetchResponse,
  ]);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const selectTime = (time: string) => {
    updateSelectedTime(time);
    setIsDropdownOpen(false);
  };

  return isLoadingAvailableTimes ? (
    <div className="flex px-6 py-12 md:px-16 lg:px-24">
      <LoadingSpinner /> <p className="ml-2">Looking for available times...</p>
    </div>
  ) : (
    <div className="my-4">
      <label htmlFor="time-picker-button" className="mb-1 block cursor-pointer text-gray-700">
        Select time:
      </label>
      {availableTimes.length > 0 ? (
        <div className="relative inline-block w-full">
          <button
            id="time-picker-button"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-100"
            type="button"
            onClick={toggleDropdown}
          >
            {selectedTime || 'Select time'}
          </button>
          {isDropdownOpen && (
            <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg">
              {availableTimes.map((time, index) => (
                <li
                  key={index}
                  onClick={() => selectTime(time)}
                  className="cursor-pointer px-4 py-2 hover:bg-pink-100"
                >
                  {time}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p className="mt-1 text-gray-600">There are no available times.</p>
      )}
    </div>
  );
}
