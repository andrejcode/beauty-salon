import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import useFetchBusinessTimes from '../hooks/useFetchBusinessTimes';
import LoadingSpinner from './LoadingSpinner';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

export default function DatePicker({
  selectedDate,
  onDateChange,
}: DatePickerProps) {
  const { times, isLoadingTimes } = useFetchBusinessTimes();

  function isOffDay(date: Date) {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return times?.offDays.includes(dayName);
  }

  function filterOffDays(date: Date) {
    return !isOffDay(date);
  }

  return isLoadingTimes ? (
    <LoadingSpinner />
  ) : (
    <Form.Group>
      <Row>
        <Form.Label>Select date:</Form.Label>
      </Row>
      <ReactDatePicker
        showIcon
        selected={selectedDate}
        onChange={onDateChange}
        minDate={new Date()}
        dateFormat="yyyy-MM-dd"
        placeholderText="yyyy-MM-dd"
        filterDate={filterOffDays}
      />
    </Form.Group>
  );
}
