import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS class names intelligently.
 * Combines clsx (conditional classes) with tailwind-merge (deduplication).
 * 
 * Usage:
 *   cn('px-4 py-2', isActive && 'bg-primary text-white', className)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
