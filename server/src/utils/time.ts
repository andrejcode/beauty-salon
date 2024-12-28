export function addMinutes(time: string, minutes: number): string {
  const [hours, mins, secs] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(mins);
  date.setSeconds(secs);
  date.setMinutes(date.getMinutes() + minutes);

  const newHours = String(date.getHours()).padStart(2, '0');
  const newMins = String(date.getMinutes()).padStart(2, '0');
  const newSecs = String(date.getSeconds()).padStart(2, '0');

  return `${newHours}:${newMins}:${newSecs}`;
}

export function getCurrentTimeAsString(): string {
  const currentTime = new Date();

  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

export function generateTimes(startTime: string, endTime: string) {
  const times: string[] = [];

  let currentTime = startTime;
  while (currentTime <= endTime) {
    times.push(currentTime);
    currentTime = addMinutes(currentTime, 15);
  }

  return times;
}

export function isValidDateFormat(dateString: string): boolean {
  // Regular expression for yyyy-mm-dd format
  const dateFormatRegex: RegExp = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateFormatRegex.test(dateString)) return false;

  const date = new Date(dateString);
  return !Number.isNaN(date.getTime()) && dateString === formatDate(date);
}

export function isValidTimeFormat(timeString: string): boolean {
  // Regular expression to match the time format HH:MM:SS
  const timeRegex: RegExp = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  return timeRegex.test(timeString);
}

export function isDateToday(dateToCheck: Date): boolean {
  const today = new Date();
  return dateToCheck.toDateString() === today.toDateString();
}

export function isDateTodayOrLater(dateToCheck: Date): boolean {
  const today = new Date();

  // Set the time of both dates to midnight (00:00:00) to compare only the dates
  today.setHours(0, 0, 0, 0);
  dateToCheck.setHours(0, 0, 0, 0);

  return dateToCheck.getTime() >= today.getTime();
}

export function isDateLessThanOneYearFromNow(date: Date): boolean {
  const currentDate = new Date();

  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(currentDate.getFullYear() + 1);

  return date <= oneYearFromNow;
}

// Format date to 'yyyy-mm-dd' format
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDayNameFromNumber(dayNumber: number) {
  const date = new Date();
  date.setDate(date.getDate() - date.getDay() + dayNumber);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}
