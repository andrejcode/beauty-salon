import { ReactElement, useContext } from 'react';
import { UserContext } from '../store/UserContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactElement;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { userId } = useContext(UserContext);

  return userId ? children : <Navigate to="/login" replace />;
}
