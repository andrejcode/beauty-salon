import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import CardText from 'react-bootstrap/CardText';
import CardTitle from 'react-bootstrap/CardTitle';
import { FaTrash } from 'react-icons/fa';

interface AppointmentCardProps {
  date: string;
  durationInMinutes: number;
  price: string;
  handleDeleteClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  showIcon?: boolean;
  user?: string;
  employee?: string;
  services?: string;
}

export default function AppointmentCard({
  date,
  durationInMinutes,
  price,
  showIcon = true,
  handleDeleteClick,
  user,
  employee,
  services,
}: AppointmentCardProps) {
  return (
    <Card className="appointment-card">
      <CardBody>
        <CardTitle>
          Appointment on <br />
          {date}
        </CardTitle>
        <CardText>{durationInMinutes} minutes</CardText>
        <CardText style={{ fontSize: '1.1em' }}>{price}&euro;</CardText>
        {user && <CardText>User: {user}</CardText>}
        {employee && <CardText>Employee: {employee}</CardText>}
        {services && <CardText>Services: {services}</CardText>}
      </CardBody>
      {showIcon && (
        <button
          className="appointment-delete-button clickable"
          onClick={handleDeleteClick}
        >
          <FaTrash size="2em" />
        </button>
      )}
    </Card>
  );
}
