import { describe, it, expect } from 'vitest';
import { isStrongPassword, isValidEmail } from '../auth';

describe('isValidEmail', () => {
  it('should return true when email is valid', () => {
    expect(isValidEmail('email@gmail.com')).toBe(true);
  });

  it('should return false when email is invalid', () => {
    expect(isValidEmail('email@gmail')).toBe(false);
    expect(isValidEmail('emailgmail.com')).toBe(false);
    expect(isValidEmail('email@com')).toBe(false);
  });
});

describe('isStrongPassword', () => {
  it('should return true when password is strong', () => {
    expect(isStrongPassword('Password123')).toBe(true);
    expect(isStrongPassword('VeryStrongPassword#4931')).toBe(true);
    expect(isStrongPassword('PaSsWoRd321')).toBe(true);
  });

  it('should return false when password is weak', () => {
    expect(isStrongPassword('pass')).toBe(false);
    expect(isStrongPassword('password')).toBe(false);
    expect(isStrongPassword('PASSWORD')).toBe(false);
    expect(isStrongPassword('123456789')).toBe(false);
    expect(isStrongPassword('password123')).toBe(false);
    expect(isStrongPassword('PASSWORD123')).toBe(false);
  });
});
