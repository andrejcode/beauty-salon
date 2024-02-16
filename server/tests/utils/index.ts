export function getCurrentDateAsString(): string {
  const currentDate: Date = new Date();
  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth() + 1;
  const day: number = currentDate.getDate();

  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;

  const formattedDate: string = `${year}-${formattedMonth}-${formattedDay}`;

  return formattedDate;
}
