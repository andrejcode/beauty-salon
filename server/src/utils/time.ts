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
  // Regular expression for YYYY-MM-DD format
  const dateFormatRegex: RegExp = /^\d{4}-\d{2}-\d{2}$/;
  return dateFormatRegex.test(dateString);
}

export function isValidTimeFormat(timeString: string): boolean {
  // Regular expression to match the time format HH:MM:SS
  const timeRegex: RegExp = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  return timeRegex.test(timeString);
}

export function isDateEqualOrGreater(dateToCheck: Date, today: Date): boolean {
  // Extract year, month, and day from the dates
  const yearToCheck = dateToCheck.getFullYear();
  const monthToCheck = dateToCheck.getMonth();
  const dayToCheck = dateToCheck.getDate();

  const yearToday = today.getFullYear();
  const monthToday = today.getMonth();
  const dayToday = today.getDate();

  // Compare year, month, and day
  if (yearToCheck > yearToday) {
    return true;
  }
  if (yearToCheck === yearToday && monthToCheck > monthToday) {
    return true;
  }
  if (
    yearToCheck === yearToday &&
    monthToCheck === monthToday &&
    dayToCheck >= dayToday
  ) {
    return true;
  }
  return false;
}

// Format date to 'yyyy-mm-dd' format
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDayNameFromNumber(dayNumber: number) {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return daysOfWeek[dayNumber];
}
