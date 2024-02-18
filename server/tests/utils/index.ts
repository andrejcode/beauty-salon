// Return current date if day is not Saturday or Sunday
// If it is return closest working day
export function getWorkingDayDate(): string {
  const currentDate: Date = new Date();
  const dayOfWeek: number = currentDate.getDay();

  // If it's Saturday (6) or Sunday (0), find the next working day
  if (dayOfWeek === 6) {
    currentDate.setDate(currentDate.getDate() + 2);
  } else if (dayOfWeek === 0) {
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth() + 1;
  const day: number = currentDate.getDate();

  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;

  const formattedDate: string = `${year}-${formattedMonth}-${formattedDay}`;

  return formattedDate;
}
