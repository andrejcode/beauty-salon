import { Col, Container, Row } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

import useFetchBusinessTimes from '../hooks/useFetchBusinessTimes';

export default function Footer() {
  const { times, isLoadingTimes } = useFetchBusinessTimes();

  function removeSeconds(time: string): string {
    const parts: string[] = time.split(':');
    return parts.slice(0, 2).join(':');
  }

  return (
    <footer className="main-color mt-5">
      <Container>
        <Row>
          <Col xs={12} md={6} className="mt-3">
            <h3>Contact</h3>
            <p className="mb-0">Beauty Salon</p>
            <p className="mb-0">Beautystraße 123</p>
            <p className="mb-0">12345 Duisburg</p>
            <p>+49 12 3456789</p>
          </Col>
          {times && (
            <Col xs={12} md={6} className="mt-3">
              <>
                <h3>Opening Hours</h3>
                {isLoadingTimes ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <p className="mb-0">
                      {removeSeconds(times.startTime)}-{removeSeconds(times.endTime)}
                    </p>
                    <p>Closed on: {times.offDays.join(', ')}</p>
                  </>
                )}
              </>
            </Col>
          )}
          <p className="text-center mt-2">
            Copyright &copy; {new Date().getFullYear()} Beauty Salon
          </p>
        </Row>
      </Container>
    </footer>
  );
}
