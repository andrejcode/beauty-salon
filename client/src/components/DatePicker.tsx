import ReactDatePicker from 'react-datepicker';
import LoadingSpinner from './ui/LoadingSpinner';
import useFetchBusinessTimes from '@/hooks/useFetchBusinessTimes';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  const { times, isLoadingTimes } = useFetchBusinessTimes();

  const isOffDay = (date: Date) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return times?.offDays.includes(dayName);
  };

  const filterOffDays = (date: Date) => {
    return !isOffDay(date);
  };

  const calculateOneYearFromNow = () => {
    const currentDate = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(currentDate.getFullYear() + 1);
    return oneYearFromNow;
  };

  return isLoadingTimes ? (
    <div className="flex px-6 py-12 md:px-16 lg:px-24">
      <LoadingSpinner /> <p className="ml-2">Loading available dates...</p>
    </div>
  ) : (
    <div className="date-picker-container my-4">
      <label htmlFor="date" className="block text-gray-700">
        Select a date:
      </label>
      <ReactDatePicker
        id="date"
        selected={selectedDate}
        onChange={onDateChange}
        minDate={new Date()}
        maxDate={calculateOneYearFromNow()}
        dateFormat="yyyy-MM-dd"
        filterDate={filterOffDays}
        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-100 focus:outline-none focus:ring-pink-100"
        placeholderText="YYYY-MM-DD"
        aria-required="true"
      />
    </div>
  );
}
