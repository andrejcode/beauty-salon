import beautyFace from '@/assets/images/beauty-face.jpeg';
import BookButton from './ui/BookButton';

export default function HeroSection() {
  return (
    <div className="bg-pink-100">
      <div
        className="flex h-[90vh] flex-col items-start justify-center bg-cover bg-center px-6 text-white md:px-16 lg:px-24"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 0% 100%)',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${beautyFace})`,
        }}
      >
        <h1 className="mt-44 text-3xl md:text-5xl">
          Welcome to the Beauty Salon
        </h1>
        <p className="mb-4 mt-2 text-lg">
          Since 1999 in the heart of Duisburg, we have been offering our
          customers first-class treatments in various areas.
        </p>
        <BookButton />
      </div>
    </div>
  );
}
