// Function that returns first working day date
export function getWorkingDayDate(offDays: string[]): string {
  const currentDate: Date = new Date();
  const nextDay: Date = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  let dayOfWeek: number = currentDate.getDay();

  function isOffDay(day: number): boolean {
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return offDays.includes(dayNames[day]);
  }

  while (isOffDay(dayOfWeek)) {
    nextDay.setDate(nextDay.getDate() + 1);
    dayOfWeek = nextDay.getDay();
  }

  const year: number = nextDay.getFullYear();
  const month: number = nextDay.getMonth() + 1;
  const day: number = nextDay.getDate();

  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;

  const formattedDate: string = `${year}-${formattedMonth}-${formattedDay}`;

  return formattedDate;
}
