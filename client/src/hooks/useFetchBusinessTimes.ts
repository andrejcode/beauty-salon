import { useEffect, useState } from 'react';
import { BusinessTimeDto } from '@server/shared/dtos';

export default function useFetchBusinessTimes() {
  const [times, setTimes] = useState<BusinessTimeDto | null>(null);
  const [isLoadingTimes, setIsLoadingTimes] = useState<boolean>(false);

  useEffect(() => {
    async function fetchTimes() {
      try {
        setIsLoadingTimes(true);

        const resposne = await fetch('http://localhost:3000/business-times');

        if (resposne.ok) {
          const businessTimesDto = (await resposne.json()) as BusinessTimeDto;
          setTimes(businessTimesDto);
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
