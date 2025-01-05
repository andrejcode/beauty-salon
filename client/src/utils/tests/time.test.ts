import { formatDateGerman, formatDate, removeSeconds } from '../time';
import { describe, it, expect } from 'vitest';

describe('formatDateGerman', () => {
  it('should format date string to German locale', () => {
    const dateString = '2023-10-01T14:48:00.000Z';
    const formattedDate = formatDateGerman(dateString);
    expect(formattedDate).toBe('01.10.2023, 16:48');
  });
});

describe('formatDate', () => {
  it('should format Date object to YYYY-MM-DD', () => {
    const date = new Date('2023-10-01T14:48:00.000Z');
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('2023-10-01');
  });
});

describe('removeSeconds', () => {
  it('should remove seconds from time string', () => {
    const time = '14:48:30';
    const timeWithoutSeconds = removeSeconds(time);
    expect(timeWithoutSeconds).toBe('14:48');
  });

  it('should handle time string without seconds', () => {
    const time = '14:48';
    const timeWithoutSeconds = removeSeconds(time);
    expect(timeWithoutSeconds).toBe('14:48');
  });
});
