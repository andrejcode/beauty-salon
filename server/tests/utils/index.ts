import { formatDate } from '@/utils/time';

// Function that returns the first working day date
export function getWorkingDayDate(offDays: string[]): string {
  const currentDate: Date = new Date();
  const nextDay: Date = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

  function isOffDay(date: Date): boolean {
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return offDays.includes(dayNames[date.getDay()]);
  }

  while (isOffDay(nextDay)) {
    nextDay.setDate(nextDay.getDate() + 1);
  }

  return formatDate(nextDay);
}
