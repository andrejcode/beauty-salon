import Col from 'react-bootstrap/Col';
import useFetchBusinessTimes from '../hooks/useFetchBusinessTimes';
import LoadingSpinner from './LoadingSpinner';

export default function OpeningHours() {
  const { times, isLoadingTimes } = useFetchBusinessTimes();

  function removeSeconds(time: string): string {
    const parts: string[] = time.split(':');
    return parts.slice(0, 2).join(':');
  }

  return (
    times && (
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
    )
  );
}
