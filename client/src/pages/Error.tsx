import Container from 'react-bootstrap/Container';
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from 'react-router-dom';
import Button from '../components/Button';

export default function Error() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 flex-column">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="mb-4">
        <i>
          {isRouteErrorResponse(error) ? error.statusText : 'Unknown error'}
        </i>
      </p>
      <Button
        type="button"
        title="Go to homepage"
        onClick={() => navigate('/')}
      />
    </Container>
  );
}
