import { auth } from './firebase';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const user = auth.currentUser;
  
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    ...(user && { 'x-user-id': user.uid }),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
}

