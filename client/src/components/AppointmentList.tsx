import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AppointmentCard from './AppointmentCard';
import { formatDateGerman } from '../utils/time';
import { type AppointmentDto } from '@server/shared/dtos';

interface AppointmentListProps {
  title: string;
  appointments: AppointmentDto[];
  handleDeleteClick: (appointmentId: number) => void;
}

export default function AppointmentList({
  title,
  appointments,
  handleDeleteClick,
}: AppointmentListProps) {
  return (
    <>
      <h2>{title}</h2>
      {appointments.length > 0 && (
        <Row className="my-3">
          {appointments.map((appointment) => (
            <Col key={appointment.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <AppointmentCard
                date={formatDateGerman(`${appointment.date}T${appointment.time}`)}
                durationInMinutes={appointment.durationInMinutes}
                price={(appointment.priceInCents / 100).toFixed(2)}
                handleDeleteClick={() => handleDeleteClick(appointment.id)}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
