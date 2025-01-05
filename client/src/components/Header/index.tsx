import { useState } from 'react';
import Logo from '../Logo';
import Nav from './Nav';
import { Menu } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="flex h-20 items-center justify-between bg-pink-100 px-6 md:h-24 md:px-16 lg:px-24">
        <Logo />

        <div className="hidden md:block">
          <Nav />
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Menu"
        >
          <Menu size={32} />
        </button>
      </header>
      <div
        className={`overflow-hidden bg-pink-100 transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? 'h-40 py-4' : 'h-0 p-0'
        }`}
      >
        <Nav />
      </div>
    </>
  );
}
