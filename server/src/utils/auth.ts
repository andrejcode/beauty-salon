import jwt from 'jsonwebtoken';
import { User } from '../entities';
import config from '../config';

export function jwtSign(id: User['id']) {
  return jwt.sign({ id }, config.tokenKey, {
    expiresIn: '7d',
  });
}

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isStrongPassword(password: string) {
  // Password must be at least 8 chars long
  // And have lower and upper cased letter and a digit
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);

  return (
    password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit
  );
}
