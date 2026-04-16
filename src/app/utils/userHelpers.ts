import type { User } from '../context/AuthContext';

/**
 * Safely get username from user object
 */
export function getSafeUsername(user: User | null | undefined): string {
  return user?.username || 'User';
}

/**
 * Safely get email from user object  
 */
export function getSafeEmail(user: User | null | undefined): string {
  return user?.email || 'user@example.com';
}

/**
 * Safely get user ID from user object
 */
export function getSafeUserId(user: User | null | undefined): string {
  return user?.id || '';
}

/**
 * Check if user object is valid
 */
export function isValidUser(user: any): user is User {
  return (
    user &&
    typeof user === 'object' &&
    typeof user.id === 'string' &&
    typeof user.username === 'string' &&
    typeof user.email === 'string'
  );
}
