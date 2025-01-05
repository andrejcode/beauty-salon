import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button.tsx';
import Card from '../ui/Card';
import { type Service } from './index';
import { CATEGORY_QUERY_PARAM } from '@/utils/constants.ts';

export default function ServiceCard({ service }: { service: Service }) {
  const navigate = useNavigate();

  const handleClick = (serviceTitle: string) => {
    navigate(`/book-appointment?${CATEGORY_QUERY_PARAM}=${serviceTitle.toLowerCase()}`);
  };

  return (
    <Card className="flex flex-col">
      <img
        src={service.image}
        alt={service.alt}
        className="mb-4 w-full rounded-md object-contain"
      />
      <h3 className="mb-2 text-xl font-semibold text-gray-800">{service.title}</h3>
      <p className="mb-4 flex-grow text-gray-600">{service.description}</p>
      <div className="mt-auto">
        <Button onClick={() => handleClick(service.title)}>Book Now</Button>
      </div>
    </Card>
  );
}
