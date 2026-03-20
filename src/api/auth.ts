const BASE = 'https://functions.poehali.dev/0674b01c-3489-4292-955a-d82b02e9a027';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: string;
}

async function call(path: string, method: string, body?: object, token?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['X-Auth-Token'] = token;
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

export async function register(name: string, email: string, password: string) {
  return call('/register', 'POST', { name, email, password });
}

export async function login(email: string, password: string) {
  return call('/login', 'POST', { email, password });
}

export async function logout(token: string) {
  return call('/logout', 'POST', {}, token);
}

export async function getMe(token: string) {
  return call('/me', 'GET', undefined, token);
}
