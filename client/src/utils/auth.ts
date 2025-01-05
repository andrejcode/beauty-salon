import { type FormData } from '@/types';

export function getUserToken() {
  const token = localStorage.getItem('token');
  return token;
}

export function saveUserToken(token: string) {
  localStorage.setItem('token', token);
}

export function removeUserToken() {
  localStorage.removeItem('token');
}

export function getUserIdFromToken(token: string): number {
  const decodedToken = JSON.parse(atob(token.split('.')[1])) as { id: number };
  return decodedToken.id;
}

export function getUserRoleFromToken(token: string): string {
  const decodedToken = JSON.parse(atob(token.split('.')[1])) as {
    role: string;
  };
  return decodedToken.role;
}

export function validateAuthFormField(
  fieldName: string,
  value: string,
  formData: FormData,
  isLogin: boolean,
): string | null {
  switch (fieldName) {
    case 'firstName':
      if (!isLogin) {
        if (!value.trim()) return 'First name is required.';
        if (value.length > 30) return 'Name cannot be longer than 30 letters.';
      }
      break;

    case 'lastName':
      if (!isLogin) {
        if (!value.trim()) return 'Last name is required.';
        if (value.length > 30) return 'Name cannot be longer than 30 letters.';
      }
      break;

    case 'email':
      if (!value.trim()) return 'Email address is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return 'Please enter a valid email address.';
      break;

    case 'password':
      if (!value.trim()) return 'Password is required.';
      if (!isLogin) {
        if (value.length < 8)
          return 'Password must be at least 8 characters long.';
        if (!/[A-Z]/.test(value))
          return 'Password must contain an uppercase letter.';
        if (!/[a-z]/.test(value))
          return 'Password must contain a lowercase letter.';
        if (!/\d/.test(value)) return 'Password must contain a number.';
      }
      break;

    case 'confirmPassword':
      if (!isLogin) {
        if (!value.trim() || value !== formData.password)
          return 'Passwords do not match.';
      }
      break;

    default:
      return null;
  }

  return null;
}
