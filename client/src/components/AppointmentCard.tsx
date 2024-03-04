import { Card, CardBody, CardText, CardTitle } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';

interface AppointmentCardProps {
  date: string;
  durationInMinutes: number;
  price: string;
  handleClick?: () => void;
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
  handleClick,
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
        <div className="appointment-delete-button" onClick={handleClick}>
          <MdDelete size="2em" />
        </div>
      )}
    </Card>
  );
}
