export function addMinutes(time: string, minutes: number): string {
  const [hours, mins, secs] = time.split(':').map(Number);
  const totalSeconds = hours * 3600 + mins * 60 + secs + minutes * 60;
  const newHours = Math.floor(totalSeconds / 3600);
  const remainingSeconds = totalSeconds % 3600;
  const newMins = Math.floor(remainingSeconds / 60);
  const newSecs = remainingSeconds % 60;
  return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}:${String(newSecs).padStart(2, '0')}`;
}

export function generateTimes() {
  const times: string[] = [];
  const startTime = '10:00:00';
  const endTime = '18:00:00';

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
