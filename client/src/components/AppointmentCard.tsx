import Card from '../components/ui/Card';
import { X } from 'lucide-react';

interface AppointmentCardProps {
  date: string;
  durationInMinutes: number;
  price: string;
  handleCancelClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  showCancelIcon: boolean;
  user?: string;
  employee?: string;
  services?: string;
}

export default function AppointmentCard({
  date,
  durationInMinutes,
  price,
  showCancelIcon,
  handleCancelClick,
  user,
  employee,
  services,
}: AppointmentCardProps) {
  return (
    <Card className="space-y-4 rounded-lg bg-white p-4 shadow-md">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">
            <span>Appointment on</span>
            <span className="block text-gray-600">{date}</span>
          </h2>
          {showCancelIcon && (
            <button onClick={handleCancelClick}>
              <X size={24} />
            </button>
          )}
        </div>
        <p className="text-gray-800">{durationInMinutes} minutes</p>
        <p className="text-lg font-semibold text-gray-800">{price}&euro;</p>
        {user && <p className="text-gray-700">User: {user}</p>}
        {employee && <p className="text-gray-700">Employee: {employee}</p>}
        {services && <p className="text-gray-700">Services: {services}</p>}
      </div>
    </Card>
  );
}
