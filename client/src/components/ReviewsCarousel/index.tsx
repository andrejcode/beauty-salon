import { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import CarouselControls from './CarouselControls';

export interface Review {
  name: string;
  review: string;
}

const reviews: Review[] = [
  {
    name: 'Emily R.',
    review:
      'The facial treatment was amazing! My skin feels so fresh and rejuvenated. Highly recommend!',
  },
  {
    name: 'Sophia M.',
    review:
      'I love the atmosphere here. The staff is so friendly, and my nails have never looked better!',
  },
  {
    name: 'Isabella D.',
    review:
      'I had a great experience with their massage services. It was exactly what I needed after a long week.',
  },
];

export default function ReviewsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="px-6 py-12 md:px-16 lg:px-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold">What Our Customers Say</h2>
        <p className="mt-2 text-gray-600">
          Real reviews from our satisfied clients
        </p>
      </div>

      <div className="relative mx-auto h-64 max-w-3xl overflow-hidden">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            review={review}
            index={index}
            currentSlide={currentSlide}
          />
        ))}
      </div>

      <CarouselControls
        reviews={reviews}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
    </section>
  );
}
