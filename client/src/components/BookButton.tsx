import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function BookButton() {
  const navigate = useNavigate();
  return (
    <Button
      type="button"
      title="Book an appointment"
      onClick={() => navigate('/book-appointment')}
    />
  );
}
