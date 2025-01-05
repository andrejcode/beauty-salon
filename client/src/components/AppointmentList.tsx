import AppointmentCard from './AppointmentCard';
import { formatDateGerman } from '../utils/time';
import { type AppointmentDto } from '@server/shared/dtos';

interface AppointmentListProps {
  title: string;
  appointments: AppointmentDto[];
  handleCancelClick?: (appointmentId: number) => void;
  canCancelAppointment: boolean;
}

export default function AppointmentList({
  title,
  appointments,
  handleCancelClick,
  canCancelAppointment,
}: AppointmentListProps) {
  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      {appointments.length > 0 && (
        <div className="-mx-2 flex flex-wrap">
          {appointments.map(appointment => (
            <div key={appointment.id} className="mb-4 w-full px-2 sm:w-1/2 md:w-1/3 lg:w-1/4">
              <AppointmentCard
                date={formatDateGerman(`${appointment.date}T${appointment.time}`)}
                durationInMinutes={appointment.durationInMinutes}
                price={(appointment.priceInCents / 100).toFixed(2)}
                showCancelIcon={canCancelAppointment ? true : false}
                handleCancelClick={
                  canCancelAppointment && handleCancelClick
                    ? () => handleCancelClick(appointment.id)
                    : undefined
                }
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
