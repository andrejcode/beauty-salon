import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link
      to="/"
      className="font-sacramento text-4xl text-black no-underline md:text-5xl"
    >
      Beauty Salon
    </Link>
  );
}
