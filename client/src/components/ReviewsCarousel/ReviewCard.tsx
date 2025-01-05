import { User } from 'lucide-react';
import Card from '../ui/Card';

interface ReviewsCardProps {
  review: { name: string; review: string };
  index: number;
  currentSlide: number;
}

export default function ReviewCard({
  review,
  index,
  currentSlide,
}: ReviewsCardProps) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
        index === currentSlide ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}
      style={{
        transform: `translateX(${(index - currentSlide) * 100}%)`,
        transition: 'opacity 0.7s ease-in-out, transform 0.7s ease-in-out',
      }}
    >
      <Card>
        <div className="mb-6 flex items-center">
          <User size={56} className="mr-6 text-gray-800" />
          <div>
            <h4 className="text-xl font-semibold text-gray-800">
              {review.name}
            </h4>
            <p className="text-gray-500">Customer</p>
          </div>
        </div>
        <p className="text-gray-700">{review.review}</p>
      </Card>
    </div>
  );
}
