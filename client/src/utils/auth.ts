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
  const decodedToken = JSON.parse(atob(token.split('.')[1])) as { role: string };
  return decodedToken.role;
}
