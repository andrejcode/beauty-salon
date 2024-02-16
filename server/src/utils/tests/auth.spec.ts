import { describe, it, expect } from 'vitest';
import { isStrongPassword, isValidEmail } from '../auth';

describe('isValidEmail', () => {
  it('should return true when email is valid', () => {
    expect(isValidEmail('email@gmail.com')).toEqual(true);
  });

  it('should return false when email is invalid', () => {
    expect(isValidEmail('email@gmail')).toEqual(false);
    expect(isValidEmail('emailgmail.com')).toEqual(false);
    expect(isValidEmail('email@com')).toEqual(false);
  });
});

describe('isStrongPassword', () => {
  it('should return true when password is strong', () => {
    expect(isStrongPassword('Password123')).toEqual(true);
    expect(isStrongPassword('VeryStrongPassword#4931')).toEqual(true);
    expect(isStrongPassword('PaSsWoRd321')).toEqual(true);
  });

  it('should return false when password is weak', () => {
    expect(isStrongPassword('pass')).toEqual(false);
    expect(isStrongPassword('password')).toEqual(false);
    expect(isStrongPassword('PASSWORD')).toEqual(false);
    expect(isStrongPassword('123456789')).toEqual(false);
    expect(isStrongPassword('password123')).toEqual(false);
    expect(isStrongPassword('PASSWORD123')).toEqual(false);
  });
});
