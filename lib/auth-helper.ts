import { NextRequest } from 'next/server';

export function getUserIdFromRequest(request: NextRequest): string | null {
  // Get userId from Authorization header
  const authHeader = request.headers.get('authorization');
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const userId = authHeader.substring(7);
    return userId;
  }
  
  // Fallback: Get from custom header
  const userId = request.headers.get('x-user-id');
  return userId;
}

export function requireAuth(userId: string | null): string {
  if (!userId) {
    throw new Error('Unauthorized: User ID required');
  }
  return userId;
}

