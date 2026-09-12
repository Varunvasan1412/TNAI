import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({ className, children, ...props }) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('flex justify-center', className)}
    {...props}
  >
    <ul className="flex flex-row items-center gap-1">
      {children}
    </ul>
  </nav>
);

const PaginationItem = ({ className, children, ...props }) => (
  <li className={cn('', className)} {...props}>
    {children}
  </li>
);

const PaginationLink = ({ 
  className, 
  isActive, 
  size = 'md', 
  children, 
  ...props 
}) => {
  const sizeStyles = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  return (
    <button
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex items-center justify-center rounded-lg transition-all duration-200',
        sizeStyles[size],
        isActive
          ? 'bg-primary text-white shadow-lg shadow-primary/25'
          : 'bg-white dark:bg-slate-800 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-100 dark:border-slate-700',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const PaginationPrevious = ({ className, label = 'Previous', ...props }) => (
  <button
    aria-label="Go to previous page"
    className={cn(
      'flex items-center gap-1 pl-2.5 pr-4 py-2 text-sm font-medium rounded-lg',
      'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700',
      'transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
      className
    )}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>{label}</span>
  </button>
);

const PaginationNext = ({ className, label = 'Next', ...props }) => (
  <button
    aria-label="Go to next page"
    className={cn(
      'flex items-center gap-1 pl-4 pr-2.5 py-2 text-sm font-medium rounded-lg',
      'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700',
      'transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
      className
    )}
    {...props}
  >
    <span>{label}</span>
    <ChevronRight className="h-4 w-4" />
  </button>
);

const PaginationEllipsis = ({ className, ...props }) => (
  <span
    aria-hidden
    className={cn('flex h-10 w-10 items-center justify-center text-gray-400', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
  </span>
);

export {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
