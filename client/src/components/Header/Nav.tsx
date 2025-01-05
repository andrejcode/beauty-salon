import { useNavigate } from 'react-router-dom';
import NavLink from './NavLink';
import { LogIn, LogOut } from 'lucide-react';
import { removeUserToken } from '@/utils/auth';
import useUserContext from '@/hooks/useUserContext';

export default function Nav() {
  const { userId, isAdmin, removeUser } = useUserContext();
  const navigate = useNavigate();

  return (
    <nav>
      <ul className="flex flex-col items-start px-4 md:flex-row md:px-0">
        {isAdmin && <NavLink link="/admin">Admin</NavLink>}

        <NavLink link="/">Home</NavLink>
        <NavLink link="/appointments">Appointments</NavLink>

        {userId ? (
          <NavLink
            onClick={() => {
              removeUserToken();
              removeUser();
              navigate('/');
            }}
          >
            <span className="mr-1">Logout</span>
            <LogOut size={20} />
          </NavLink>
        ) : (
          <NavLink link="/login">
            <span className="mr-1">Login</span>
            <LogIn size={20} />
          </NavLink>
        )}
      </ul>
    </nav>
  );
}
