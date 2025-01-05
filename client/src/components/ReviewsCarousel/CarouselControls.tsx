import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type Review } from '.';

interface CarouselControlsProps {
  reviews: Review[];
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}

export default function CarouselControls({
  reviews,
  currentSlide,
  setCurrentSlide,
}: CarouselControlsProps) {
  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <button aria-label="Previous review" onClick={prevSlide}>
        <ChevronLeft size={28} />
      </button>
      <div className="flex space-x-2">
        {reviews.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 cursor-pointer rounded-full transition-colors ${
              index === currentSlide ? 'bg-gray-800' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      <button aria-label="Next review" onClick={nextSlide}>
        <ChevronRight size={28} />
      </button>
    </div>
  );
}
