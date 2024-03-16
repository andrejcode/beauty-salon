import { useEffect, useState } from 'react';
import { BusinessTimeDto } from '@server/shared/dtos';

export default function useFetchBusinessTimes() {
  const [times, setTimes] = useState<BusinessTimeDto | null>(null);
  const [isLoadingTimes, setIsLoadingTimes] = useState<boolean>(false);

  useEffect(() => {
    async function fetchTimes() {
      try {
        setIsLoadingTimes(true);

        const resposne = await fetch('/api/business-times');

        if (resposne.status === 200) {
          const businessTimesDto = (await resposne.json()) as BusinessTimeDto;
          setTimes(businessTimesDto);
        } else {
          setTimes(null);
        }
      } catch (e) {
        setTimes(null);
      } finally {
        setIsLoadingTimes(false);
      }
    }

    void fetchTimes();
  }, []);

  return { times, isLoadingTimes };
}
