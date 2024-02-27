// Function that returns first working day date
export function getWorkingDayDate(offDays: string[]): string {
  const currentDate: Date = new Date();
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
    currentDate.setDate(currentDate.getDate() + 1);
    dayOfWeek = currentDate.getDay();
  }

  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth() + 1;
  const day: number = currentDate.getDate();

  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;

  const formattedDate: string = `${year}-${formattedMonth}-${formattedDay}`;

  return formattedDate;
}
