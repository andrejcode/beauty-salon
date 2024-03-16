import { describe, it, expect } from 'vitest';
import {
  addMinutes,
  isDateTodayOrLater,
  generateTimes,
  isValidDateFormat,
  isValidTimeFormat,
  isDateToday,
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
    expect(isValidDateFormat('2024-02-14')).toEqual(true);
  });

  it('should return false if date is in invalid format', () => {
    expect(isValidDateFormat('14-02-2024')).toEqual(false);
    expect(isValidDateFormat('123')).toEqual(false);
  });
});

describe('isValidTimeFormat', () => {
  it('should return true if time is in valid format', () => {
    expect(isValidTimeFormat('14:00:00')).toEqual(true);
  });

  it('should return false if time is in invalid format', () => {
    expect(isValidDateFormat('14:00')).toEqual(false);
    expect(isValidDateFormat('123')).toEqual(false);
  });
});

describe('isDateTodayOrLater', () => {
  it('should return true when date is equal', () => {
    const date = new Date();
    expect(isDateTodayOrLater(date)).toEqual(true);
  });

  it('should return false when date is less then todays date', () => {
    const date = new Date('1999-01-01');
    expect(isDateTodayOrLater(date)).toEqual(false);
  });

  describe('isDateToday', () => {
    it('should return true if date is today', () => {
      const date = new Date();
      expect(isDateToday(date)).toEqual(true);
    });
  });
});
