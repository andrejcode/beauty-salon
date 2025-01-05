import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './ui/LoadingSpinner';
import useUserContext from '@/hooks/useUserContext';

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const location = useLocation();
  const { userId, loading } = useUserContext();

  if (loading) {
    return (
      <div className="flex px-6 py-12 md:px-16 lg:px-24">
        <LoadingSpinner /> <p className="ml-2">Authenticating user, please wait...</p>
      </div>
    );
  }

  return userId ? children : <Navigate to="/login" state={{ from: location }} replace />;
}
