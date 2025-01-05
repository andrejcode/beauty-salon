import { Link } from 'react-router-dom';

interface NavLinkProps {
  children: React.ReactNode;
  link?: string;
  onClick?: () => void;
}

export default function NavLink({ children, link, onClick }: NavLinkProps) {
  const classes =
    'hover:text-black text-lg text-gray-600 mb-4 md:mb-0 md:mr-4 flex flex-row items-center justify-center cursor-pointer';

  return (
    <li onClick={!link && onClick ? onClick : undefined}>
      {link ? (
        <Link to={link} className={classes}>
          {children}
        </Link>
      ) : (
        <span className={classes}>{children}</span>
      )}
    </li>
  );
}
