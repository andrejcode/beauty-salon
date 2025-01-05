import Button from '@/components/ui/Button';
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';

export default function Error() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center leading-8">
      <h1 className="mb-1 text-4xl">Oops!</h1>
      <p className="text-lg">Sorry, an unexpected error has occurred.</p>
      <p className="mb-4">
        <i>{isRouteErrorResponse(error) ? error.statusText : 'Unknown error'}</i>
      </p>
      <Button onClick={() => navigate('/')}>Go to homepage</Button>
    </div>
  );
}
