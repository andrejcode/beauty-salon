import LoadingSpinner from '../ui/LoadingSpinner';
import useFetchBusinessTimes from '@/hooks/useFetchBusinessTimes';
import { removeSeconds } from '@/utils/time';

export default function OpeningHours() {
  const { times, isLoadingTimes } = useFetchBusinessTimes();

  return (
    <div className="mt-6 flex-grow md:mt-0">
      <h3 className="text-lg font-bold">Opening Hours</h3>
      {isLoadingTimes ? (
        <LoadingSpinner />
      ) : times ? (
        <>
          <p className="mt-1 text-gray-600">
            {removeSeconds(times.startTime)} - {removeSeconds(times.endTime)}
          </p>
          <p className="text-gray-600">Closed on: {times.offDays.join(', ')}</p>
        </>
      ) : (
        <p className="text-gray-600">
          Opening hours are not available at the moment.
        </p>
      )}
    </div>
  );
}
