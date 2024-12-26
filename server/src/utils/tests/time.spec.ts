import { describe, it, expect } from 'vitest';
import {
  addMinutes,
  isDateTodayOrLater,
  generateTimes,
  isValidDateFormat,
  isValidTimeFormat,
  isDateToday,
  getDayNameFromNumber,
  formatDate,
} from '../time';

describe('addMinutes', () => {
  it('should add 15 minutes to time', () => {
    expect(addMinutes('10:00:00', 15)).toBe('10:15:00');
  });

  it('should remove 15 minutes from time', () => {
    expect(addMinutes('10:00:00', -15)).toBe('09:45:00');
  });
});

describe('generateTimes', () => {
  it('should generate time from 10 to 18', () => {
    expect(generateTimes('10:00:00', '18:00:00').length).toBe(33);
  });
});

describe('isValidDateFormat', () => {
  it('should return true if date is in valid format', () => {
    expect(isValidDateFormat('2024-02-14')).toBe(true);
    expect(isValidDateFormat('2024-04-30')).toBe(true);
  });

  it('should return false if date is in invalid format', () => {
    expect(isValidDateFormat('14-02-2024')).toBe(false);
    expect(isValidDateFormat('2024-04-31')).toBe(false);
    expect(isValidDateFormat('31-04-2024')).toBe(false);
    expect(isValidDateFormat('123')).toBe(false);
  });
});

describe('isValidTimeFormat', () => {
  it('should return true if time is in valid format', () => {
    expect(isValidTimeFormat('14:00:00')).toBe(true);
    expect(isValidTimeFormat('00:00:00')).toBe(true);
    expect(isValidTimeFormat('23:59:59')).toBe(true);
  });

  it('should return false if time is in invalid format', () => {
    expect(isValidDateFormat('14:00')).toBe(false);
    expect(isValidDateFormat('123')).toBe(false);
    expect(isValidDateFormat('14:00:00:00')).toBe(false);
    expect(isValidDateFormat('25:00:00')).toBe(false);
  });
});

describe('isDateToday', () => {
  it('should return true if date is today', () => {
    const today = new Date();
    expect(isDateToday(today)).toBe(true);
  });

  it('should return false if date is not today', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    expect(isDateToday(yesterday)).toBe(false);
  });
});

describe('isDateTodayOrLater', () => {
  it('should return true when date is equal', () => {
    const date = new Date();
    expect(isDateTodayOrLater(date)).toBe(true);
  });

  it('should return false when date is less then todays date', () => {
    const date = new Date('1999-01-01');
    expect(isDateTodayOrLater(date)).toBe(false);
  });
});

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date(2024, 0, 5);
    const result = formatDate(date);
    expect(result).toBe('2024-01-05');
  });
});

describe('getDayNameFromNumber', () => {
  it('should return correct day name', () => {
    expect(getDayNameFromNumber(-1)).toBe('Saturday');
    expect(getDayNameFromNumber(0)).toBe('Sunday');
    expect(getDayNameFromNumber(1)).toBe('Monday');
    expect(getDayNameFromNumber(2)).toBe('Tuesday');
    expect(getDayNameFromNumber(3)).toBe('Wednesday');
    expect(getDayNameFromNumber(4)).toBe('Thursday');
    expect(getDayNameFromNumber(5)).toBe('Friday');
    expect(getDayNameFromNumber(6)).toBe('Saturday');
    expect(getDayNameFromNumber(7)).toBe('Sunday');
    expect(getDayNameFromNumber(8)).toBe('Monday');
  });
});
