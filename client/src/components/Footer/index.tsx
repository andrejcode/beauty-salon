import Contact from './Contact';
import OpeningHours from './OpeningHours';
import Social from './Social';

export default function Footer() {
  return (
    <footer className="flex flex-col items-start justify-between bg-pink-100 px-6 py-12 md:flex-row md:space-x-8 md:px-16 lg:px-24">
      <Social />
      <Contact />
      <OpeningHours />
    </footer>
  );
}
