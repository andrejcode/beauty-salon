import HeroSection from '@/components/HeroSection';
import BeautyExperienceSection from '@/components/BeautyExperienceSection';
import ServicesSection from '@/components/ServicesSection';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import BookingSection from '@/components/BookingSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <BeautyExperienceSection />
      <ServicesSection />
      <ReviewsCarousel />
      <BookingSection />
    </>
  );
}
