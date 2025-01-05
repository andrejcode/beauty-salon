import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function BookButton() {
  const navigate = useNavigate();

  return <Button onClick={() => navigate('/book-appointment')}>Book an Appointment</Button>;
}
